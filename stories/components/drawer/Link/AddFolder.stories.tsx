import FakeTimers from "@sinonjs/fake-timers";
import { jest } from "@storybook/jest";
import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, waitFor, within } from "@storybook/test";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { http, HttpResponse } from "msw";

import DrawerButton from "@/app/link-book/[title]/DrawerButton";
import { ShareLinkDialog } from "@/app/link-book/dialog/dynamic";

import {
  DeleteDrawerLinkDialog,
  MutateLinkBookDialog,
} from "@/components/dialog/dynamic";
import { useOpenDialogStore } from "@/store/useDialogStore";
import { useOpenDrawerStore } from "@/store/useDrawerStore";
import { Link } from "@/types/link.types";
import { CreateFormState } from "@/types/linkBook.types";
import { getLinkListQueryKey } from "@/utils/queryKey";

import { mockLink, mockLinks } from "../../../mocks/link.mocks";
import { mockLinkBooks, mockRespone } from "../../../mocks/linkBook.mocks";
import { mockTags } from "../../../mocks/tag.mocks";
import { MutateLinkDrawer } from "@/components/drawer/dynamic";
import Folder from "@/components/drawer/link/Folder";
import { useState } from "react";

const queryClient = new QueryClient();

function Wrapper() {
  const [linkBookId, setLinkBookId] = useState<string | undefined>();
  return (
    <Folder
      linkBookId={linkBookId}
      setLinkBookId={(name: string, id: string) => setLinkBookId(id)}
    />
  );
}

const meta = {
  title: "Component/Drawer/Link/Add Folder",
  component: Wrapper,
  tags: ["autodocs"],
  decorators: (Story) => {
    const { isMutateLinkBookOpen } = useOpenDialogStore();

    return (
      <QueryClientProvider client={queryClient}>
        <div id="modal-root" />
        {isMutateLinkBookOpen && <MutateLinkBookDialog />}
        <Story />
      </QueryClientProvider>
    );
  },

  parameters: {
    msw: {
      handlers: [
        http.get("/api/link-books?sort=created_at", () => {
          return HttpResponse.json(mockRespone);
        }),
      ],
    },
  },
} satisfies Meta<typeof Wrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Open: Story = {};

export const TestSelectFolder: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByTestId("open-button"));
    await waitFor(async () => {
      await userEvent.click(
        canvas.getByRole("button", { name: "디자인 영감" }),
      );
    });

    expect(canvas.getByTestId("selected")).toHaveTextContent("디자인 영감");
  },
};

export const TestAddFolder: Story = {
  play: async ({ canvasElement }) => {
    useOpenDrawerStore.setState({ link: mockLink, isLinkDrawerOpen: true });

    const canvas = within(canvasElement);

    await waitFor(async () => {
      await userEvent.click(canvas.getByTestId("create-folder-dialog-button"));
    });

    await waitFor(async () => {
      const titleInput = canvas.getByTestId("link-book-title");
      await userEvent.type(titleInput, "새로 만든 폴더");
    });

    await waitFor(async () => {
      expect(canvas.getByText("생성")).not.toBeDisabled();
    });

    await userEvent.click(canvas.getByText("생성"));

    await waitFor(async () => {
      expect(
        within(canvas.getByTestId("link-book-selector")).getByText(
          "새로 만든 폴더",
        ),
      ).toBeInTheDocument();
    });
  },
};
