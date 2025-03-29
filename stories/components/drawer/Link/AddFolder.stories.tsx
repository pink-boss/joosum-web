import type { Meta, StoryObj } from "@storybook/react";
import { http, HttpResponse } from "msw";

import { MutateLinkBookDialog } from "@/components/dialog/dynamic";
import { useOpenDialogStore } from "@/store/useDialogStore";
import { mockRespone } from "../../../mocks/linkBook.mocks";

import Folder from "@/components/drawer/link/Folder";
import { useState } from "react";
import { queryClient } from "@/stories/mocks/store.mocks";

export function Wrapper() {
  const [linkBookId, setLinkBookId] = useState<string | undefined>();
  return (
    <Folder
      linkBookId={linkBookId}
      setLinkBookId={(name: string, id: string) => setLinkBookId(id)}
    />
  );
}

const meta = {
  title: "Component/Drawer/Link/Add Folder",
  component: Wrapper,
  decorators: (Story) => {
    const { isMutateLinkBookOpen } = useOpenDialogStore();

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
  },
} satisfies Meta<typeof Wrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Open: Story = {};
