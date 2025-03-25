import type { Meta, StoryObj } from "@storybook/react";

import { useOpenDrawerStore } from "@/store/useDrawerStore";

import React from "react";
import { SaveLinkDrawer } from "@/components/drawer/dynamic";
import { queryClient } from "@/stories/mocks/store.mocks";

const meta = {
  title: "Component/Drawer/Link/Save",
  component: SaveLinkDrawer,
  decorators: (Story) => {
    React.useEffect(() => {
      useOpenDrawerStore.setState({ isLinkSaveDrawerOpen: true });
    }, []);
    return (
      <>
        <Story />
      </>
    );
  },
  beforeEach: () => {
    queryClient.clear();
  },
} satisfies Meta<typeof SaveLinkDrawer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const OpenDrawer: Story = {};
