import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, waitFor, within } from "@storybook/test";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { UserDrawer } from "@/components/drawer/dynamic";
import OpenUserDrawerButton from "@/components/drawer/user/OpenDrawerButton";
import { useOpenDrawerStore } from "@/store/useDrawerStore";

const queryClient = new QueryClient();

const meta = {
  title: "Component/Drawer/User",
  component: UserDrawer,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  decorators: (Story) => {
    return (
      <QueryClientProvider client={queryClient}>
        <div id="drawer-root" />
        <div id="modal-root" />
        <Story />
      </QueryClientProvider>
    );
  },
} satisfies Meta<typeof UserDrawer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Open: Story = {
  decorators: (Story) => {
    useOpenDrawerStore.setState({ isUserDrawerOpen: true });
    return <Story />;
  },
};

export const OpenCloseDrawer: Story = {
  decorators: (Story) => {
    useOpenDrawerStore.setState({ isUserDrawerOpen: false });
    return (
      <>
        <OpenUserDrawerButton />
        <Story />
      </>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button"));

    await waitFor(() => {
      expect(canvas.queryByRole("dialog")).toBeInTheDocument();
    });

    await userEvent.click(canvas.getByAltText("close"));

    expect(canvas.queryByRole("dialog")).toBeNull();
  },
};
