import type { Meta, StoryObj } from "@storybook/react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { LinkSaveDrawer } from "@/components/drawer/dynamic";

import { useOpenDrawerStore } from "@/store/useDrawerStore";

import React from "react";

const queryClient = new QueryClient();
let capturedRequest: Request | null;

const meta = {
  title: "Component/Drawer/Link/Save",
  component: LinkSaveDrawer,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  decorators: (Story) => {
    React.useEffect(() => {
      useOpenDrawerStore.setState({ isLinkSaveDrawerOpen: true });
    }, []);
    return (
      <QueryClientProvider client={queryClient}>
        <div id="drawer-root" />
        <div id="modal-root" />
        <Story />
      </QueryClientProvider>
    );
  },
} satisfies Meta<typeof LinkSaveDrawer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const OpenDrawer: Story = {};
