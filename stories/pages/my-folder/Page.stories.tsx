import type { Meta, StoryObj } from "@storybook/react";

import Page from "@/app/my-folder/page";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MutateDialog from "@/app/my-folder/mutate/dialog";
import DeleteFolderDialog from "@/app/my-folder/delete-dialog";

const queryClient = new QueryClient();

function ComposeComponent() {
  return (
    <QueryClientProvider client={queryClient}>
      <Page />
      <div id="modal-root" />
      <MutateDialog />
      <DeleteFolderDialog />
    </QueryClientProvider>
  );
}

const meta = {
  title: "Page/My-Folder",
  component: ComposeComponent,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    // layout: 'fullscreen',
  },
} satisfies Meta<typeof ComposeComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
