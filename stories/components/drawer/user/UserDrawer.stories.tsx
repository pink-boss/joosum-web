import type { Meta, StoryObj } from "@storybook/react";
import { http, HttpResponse } from "msw";

import { AccountDialog } from "@/components/dialog/dynamic";
import { UserDrawer } from "@/components/drawer/dynamic";
import { useOpenDialogStore } from "@/store/useDialogStore";
import { useOpenDrawerStore } from "@/store/useDrawerStore";
import { mockTQueryAccount } from "@/stories/mocks/account.mocks";
import React from "react";

const meta = {
  title: "Component/Drawer/User",
  component: UserDrawer,
  parameters: {
    msw: {
      handlers: [
        http.get("/api/auth/me", async () => {
          return HttpResponse.json(mockTQueryAccount);
        }),
      ],
    },
  },
  decorators: (Story) => {
    React.useEffect(() => {
      useOpenDrawerStore.setState({ isUserDrawerOpen: true });
    }, []);
    return <Story />;
  },
} satisfies Meta<typeof UserDrawer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const OpenDrawer: Story = {};

export const OpenAccountDialog: Story = {
  render: () => {
    React.useEffect(() => {
      useOpenDialogStore.setState({ isAccountOpen: true });
    }, []);
    return (
      <>
        <AccountDialog />
      </>
    );
  },
};
