import type { Meta, StoryObj } from "@storybook/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { http, HttpResponse } from "msw";

import DeleteFolderDialog from "@/app/my-folder/DeleteDialog";
import MutateDialog from "@/app/my-folder/mutate/MutateDialog";
import Page from "@/app/my-folder/page";

import { mockRespone } from "../mocks/linkBook.mocks";

const queryClient = new QueryClient();

const meta = {
  title: "Page/MyFolder/Page",
  component: Page,
  parameters: {
    msw: {
      handlers: [
        http.get("/api/link-books", () => HttpResponse.json(mockRespone)),
      ],
    },
  },
  decorators: (Story) => (
    <QueryClientProvider client={queryClient}>
      <Story />
      <div id="modal-root" />
      <MutateDialog />
      <DeleteFolderDialog />
    </QueryClientProvider>
  ),
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
