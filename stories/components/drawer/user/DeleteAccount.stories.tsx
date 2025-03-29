import type { Meta, StoryObj } from "@storybook/react";
import { http, HttpResponse } from "msw";

import {
  AccountDialog,
  DeleteAccountDialog,
} from "@/components/dialog/dynamic";

import { useOpenDialogStore } from "@/store/useDialogStore";
import { mockTQueryAccount } from "@/stories/mocks/account.mocks";
import React from "react";

const meta = {
  title: "Component/Drawer/User/Account",
  component: AccountDialog,
  parameters: {
    msw: {
      handlers: [
        http.get("/api/auth/me", async () => {
          return HttpResponse.json(mockTQueryAccount);
        }),
      ],
    },
  },
} satisfies Meta<typeof AccountDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const OpenDeleteAccountDialog: Story = {
  decorators: (Story) => {
    React.useEffect(() => {
      useOpenDialogStore.setState({ isDeleteAccountOpen: true });
    }, []);
    return (
      <>
        <DeleteAccountDialog />
        <Story />
      </>
    );
  },
};
