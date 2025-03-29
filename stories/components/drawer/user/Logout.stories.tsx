import type { Meta, StoryObj } from "@storybook/react";

import { AccountDialog, LogoutDialog } from "@/components/dialog/dynamic";

import { useOpenDialogStore } from "@/store/useDialogStore";
import React from "react";

const meta = {
  title: "Component/Drawer/User/Account",
  component: AccountDialog,
} satisfies Meta<typeof AccountDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const OpenLogoutDialog: Story = {
  render: () => {
    React.useEffect(() => {
      useOpenDialogStore.setState({ isLogoutOpen: true });
    }, []);
    return (
      <>
        <LogoutDialog />
      </>
    );
  },
};
