import type { Meta, StoryObj } from "@storybook/react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { useOpenDrawerStore } from "@/store/useDrawerStore";

import React from "react";
import { SaveLinkDrawer } from "@/components/drawer/dynamic";

const queryClient = new QueryClient();
let capturedRequest: Request | null;

const meta = {
  title: "Component/Drawer/Link/Save",
  component: SaveLinkDrawer,
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
} satisfies Meta<typeof SaveLinkDrawer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const OpenDrawer: Story = {};
