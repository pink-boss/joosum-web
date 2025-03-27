import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, waitFor, within } from "@storybook/test";
import { http, HttpResponse } from "msw";
import { useOpenDrawerStore } from "@/store/useDrawerStore";

import { CreateFormState } from "@/types/linkBook.types";

import { MutateLinkDrawer } from "@/components/drawer/dynamic";
import meta, { Wrapper } from "../AddFolder.stories";
import { mockLink } from "@/stories/mocks/link.mocks";

const testMeta = {
  ...meta,
  title: "Component/Drawer/Link/Add Folder",
} satisfies Meta<typeof Wrapper>;

export default testMeta;
type Story = StoryObj<typeof testMeta>;

export const TestSelectFolder: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(await canvas.findByTestId("open-button"));
    await waitFor(async () => {
      await userEvent.click(
        canvas.getByRole("button", { name: "디자인 영감" }),
      );
    });

    expect(canvas.getByTestId("selected")).toHaveTextContent("디자인 영감");
  },
};

export const TestAddFolder: Story = {
  parameters: {
    msw: {
      handlers: [
        ...meta.parameters.msw.handlers,
        http.post("/api/link-books", async ({ request }) => {
          const data = (await request.json()) as CreateFormState;
          return HttpResponse.json({ ...data, linkBookId: "lb_999" });
        }),
      ],
    },
  },
  render: () => <MutateLinkDrawer />,
  play: async ({ canvasElement }) => {
    useOpenDrawerStore.setState({ link: mockLink, isLinkDrawerOpen: true });

    const canvas = within(canvasElement);

    await waitFor(async () => {
      await userEvent.click(canvas.getByTestId("create-folder-dialog-button"));
    });

    await waitFor(async () => {
      const titleInput = canvas.queryByTestId("link-book-title");
      expect(titleInput).toBeInTheDocument();
      await userEvent.type(titleInput!, "새로 만든 폴더");
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
