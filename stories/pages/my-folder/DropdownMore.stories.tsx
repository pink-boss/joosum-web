import type { Meta, StoryObj } from "@storybook/react";
import DropdownMore from "@/app/my-folder/DropdownMore";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { expect, userEvent, waitFor, within } from "@storybook/test";
import MutateDialog from "@/app/my-folder/mutate/MutateDialog";
import { mockLinkBooks } from "../mocks/linkBook.mocks";
import DeleteDialog from "@/app/my-folder/DeleteDialog";
import { useOpenDialogStore } from "@/store/useDialogStore";
import { http, HttpResponse } from "msw";
import useQueryLinkBooks from "@/hooks/my-folder/useQueryLinkBooks";
import { TQueryLinkBooks } from "@/types/linkBook.types";

const mockRespone: TQueryLinkBooks = {
  linkBooks: mockLinkBooks,
  totalLinkCount: mockLinkBooks.length,
};

const queryClient = new QueryClient();

const CallLinkBookList = () => {
  useQueryLinkBooks("created_at");
  return <DropdownMore linkBook={mockLinkBooks[1]} />;
};

const meta = {
  title: "Page/MyFolder/Dropdown/More",
  component: CallLinkBookList,
  tags: ["autodocs"],
  beforeEach: () => {
    useOpenDialogStore.getState().openMutateLinkBook(false);
    useOpenDialogStore.getState().openDeleteLinkBook(false);
  },
  parameters: {
    msw: {
      handlers: [
        http.get("/api/my-folder?sort=created_at", () => {
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
} satisfies Meta<typeof CallLinkBookList>;

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
