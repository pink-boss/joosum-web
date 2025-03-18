import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, waitFor, within } from "@storybook/test";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { http, HttpResponse } from "msw";

import DeleteDialog from "@/app/my-folder/DeleteDialog";
import DropdownMore from "@/app/my-folder/DropdownMore";
import MutateDialog from "@/app/my-folder/mutate/MutateDialog";
import useQueryLinkBooks from "@/hooks/my-folder/useQueryLinkBooks";
import { useOpenDialogStore } from "@/store/useDialogStore";

import { mockLinkBooks, mockRespone } from "../../mocks/linkBook.mocks";

const queryClient = new QueryClient();

const QueryLinkBookList = () => {
  useQueryLinkBooks("created_at");
  return <DropdownMore linkBook={mockLinkBooks[1]} />;
};

const meta = {
  title: "Page/MyFolder/DropdownMore",
  component: QueryLinkBookList,
  tags: ["autodocs"],
  beforeEach: () => {
    useOpenDialogStore.getState().openMutateLinkBook(false);
    useOpenDialogStore.getState().openDeleteLinkBook(false);
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
  decorators: (Story) => (
    <QueryClientProvider client={queryClient}>
      <Story />
      <div id="modal-root" />
      <MutateDialog />
      <DeleteDialog />
    </QueryClientProvider>
  ),
} satisfies Meta<typeof QueryLinkBookList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const linkBookMore = within(canvas.getByTestId("link-book-more"));

    await userEvent.click(linkBookMore.getByAltText("more"));

    await expect(linkBookMore.getByText("폴더 수정")).toBeInTheDocument();
    await expect(linkBookMore.getByText("폴더 삭제")).toBeInTheDocument();
  },
};

export const OpenEditDialog: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const linkBookMore = within(canvas.getByTestId("link-book-more"));

    await waitFor(async () => {
      await userEvent.click(linkBookMore.getByAltText("more"));
      await userEvent.click(linkBookMore.getByText("폴더 수정"));
    });

    await waitFor(async () => {
      const dialog = canvas.getByRole("dialog");
      await expect(dialog).toBeInTheDocument();
      await expect(within(dialog).getByText("폴더 수정")).toBeInTheDocument();
    });
  },
};

export const OpenDeleteDialog: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const linkBookMore = within(canvas.getByTestId("link-book-more"));

    await userEvent.click(linkBookMore.getByAltText("more"));
    await userEvent.click(linkBookMore.getByText("폴더 삭제"));

    waitFor(async () => {
      const dialog = canvas.getByRole("dialog");
      await expect(dialog).toBeInTheDocument();
      await expect(
        within(dialog).getByRole("button", { name: "삭제" }),
      ).toBeInTheDocument();
    });
  },
};
