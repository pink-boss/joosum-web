import type { Meta, StoryObj } from "@storybook/react";
import { http, HttpResponse } from "msw";

import { ShareLinkDialog } from "@/app/link-book/dialog/dynamic";

import {
  DeleteDrawerLinkDialog,
  MutateLinkBookDialog,
} from "@/components/dialog/dynamic";
import { useOpenDialogStore } from "@/store/useDialogStore";
import { useOpenDrawerStore } from "@/store/useDrawerStore";

import { mockLink } from "../../../mocks/link.mocks";
import { mockRespone } from "../../../mocks/linkBook.mocks";
import { mockTags } from "../../../mocks/tag.mocks";
import { MutateLinkDrawer } from "@/components/drawer/dynamic";
import { queryClient } from "@/stories/mocks/store.mocks";
import { ToastProvider } from "@/components/notification/ToastProvider";

const meta = {
  title: "Component/Drawer/Link/Mutate",
  component: MutateLinkDrawer,
  decorators: (Story) => {
    const { isMutateLinkBookOpen, isDeleteDrawerLinkOpen, isShareLinkOpen } =
      useOpenDialogStore();
    return (
      <ToastProvider>
        {isMutateLinkBookOpen && <MutateLinkBookDialog />}
        {isDeleteDrawerLinkOpen && <DeleteDrawerLinkDialog />}
        {isShareLinkOpen && <ShareLinkDialog />}
        <Story />
      </ToastProvider>
    );
  },
  parameters: {
    msw: {
      handlers: [
        http.get("/api/link-books?sort=created_at", () => {
          return HttpResponse.json(mockRespone);
        }),
        http.get("/api/settings/tags", () => {
          return HttpResponse.json(mockTags);
        }),
      ],
    },
  },
  beforeEach: () => {
    queryClient.clear();
  },
} satisfies Meta<typeof MutateLinkDrawer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Open: Story = {
  decorators: (Story) => {
    useOpenDrawerStore.setState({ link: mockLink, isLinkDrawerOpen: true });
    return <Story />;
  },
};
