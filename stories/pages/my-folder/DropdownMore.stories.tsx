import type { Meta, StoryObj } from "@storybook/react";
import DropdownMore from "@/app/my-folder/dropdown/more";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { expect, userEvent, within } from "@storybook/test";
import MutateDialog from "@/app/my-folder/mutate/dialog";
import { mockLinkBooks } from "./mock-up";
import DeleteDialog from "@/app/my-folder/delete-dialog";
import { useOpenDialogStore } from "@/store/useDialog";

const queryClient = new QueryClient();

function ComposeComponent() {
  return (
    <QueryClientProvider client={queryClient}>
      <DropdownMore linkBook={mockLinkBooks[0]} />
      <div id="modal-root" />
      <MutateDialog />
      <DeleteDialog />
    </QueryClientProvider>
  );
}

const meta = {
  title: "Page/My-Folder/Dropdown/More",
  component: ComposeComponent,
  tags: ["autodocs"],
  beforeEach: () => {
    // zustand 상태 초기화
    useOpenDialogStore.getState().openMutateFolder(false);
    useOpenDialogStore.getState().openDeleteFolder(false);
  },
} satisfies Meta<typeof ComposeComponent>;

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

    await userEvent.click(linkBookMore.getByAltText("more"));
    await userEvent.click(linkBookMore.getByText("폴더 수정"));

    const dialog = canvas.getByRole("dialog");
    await expect(dialog).toBeInTheDocument();
    await expect(within(dialog).getByText("폴더 수정")).toBeInTheDocument();
  },
};

export const OpenDeleteDialog: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const linkBookMore = within(canvas.getByTestId("link-book-more"));

    await userEvent.click(linkBookMore.getByAltText("more"));
    await userEvent.click(linkBookMore.getByText("폴더 삭제"));

    const dialog = canvas.getByRole("dialog");
    await expect(dialog).toBeInTheDocument();
    await expect(
      within(dialog).getByRole("button", { name: "삭제" }),
    ).toBeInTheDocument();
  },
};
