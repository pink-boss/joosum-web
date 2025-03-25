import type { Meta, StoryObj } from "@storybook/react";

import { useOpenDrawerStore } from "@/store/useDrawerStore";

import React from "react";
import { SaveLinkDrawer } from "@/components/drawer/dynamic";
import { queryClient } from "@/stories/mocks/store.mocks";
import { useOpenDialogStore } from "@/store/useDialogStore";
import { MutateLinkBookDialog } from "@/components/dialog/dynamic";
import { http, HttpResponse } from "msw";
import { mockRespone } from "@/stories/mocks/linkBook.mocks";

const meta = {
  title: "Component/Drawer/Link/Save",
  component: SaveLinkDrawer,
  decorators: (Story) => {
    const { isMutateLinkBookOpen } = useOpenDialogStore();
    React.useEffect(() => {
      useOpenDrawerStore.setState({ isLinkSaveDrawerOpen: true });
    }, []);
    return (
      <>
        {isMutateLinkBookOpen && <MutateLinkBookDialog />}
        <Story />
      </>
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
  beforeEach: () => {
    queryClient.clear();
    useOpenDialogStore.setState({ isMutateLinkBookOpen: false });
  },
} satisfies Meta<typeof SaveLinkDrawer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {};

export const WithData: Story = {
  args: {
    _defaultValues: {
      url: "https://nextjs.org",
      title: "Next JS",
      linkBookId: "lb_001",
      tags: ["개발", "web"],
      thumbnailURL: "https://nextjs.org/static/twitter-cards/home.jpg",
    },
  },
};
