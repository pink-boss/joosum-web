import type { Meta, StoryObj } from "@storybook/react";
import { http, HttpResponse } from "msw";

import LinkCard from "@/app/link-book/[title]/link-list/LinkCard";
import { mockLink } from "../../mocks/link.mocks";

const meta = {
  title: "Page/FolderList/LinkCard",
  component: LinkCard,
  parameters: {
    msw: {
      handlers: [
        http.put("/api/links/:linkId/read-count", () => {
          return new HttpResponse("ok", { status: 204 });
        }),
      ],
    },
  },
  args: { link: mockLink },
} satisfies Meta<typeof LinkCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
