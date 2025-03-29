import type { Meta, StoryObj } from "@storybook/react";
import { http, HttpResponse } from "msw";

import Folder from "@/app/my-folder/folder";
import {
  longTitleLinkBook,
  mockRespone,
  shortTitleLinkBook,
} from "../../mocks/linkBook.mocks";

const meta = {
  title: "Page/MyFolder/Folder",
  component: Folder,
  parameters: {
    msw: {
      handlers: [
        http.get("/api/link-books", () => {
          return HttpResponse.json(mockRespone);
        }),
      ],
    },
  },
} satisfies Meta<typeof Folder>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ShortTitle: Story = {
  args: { linkBook: shortTitleLinkBook },
};

export const LongTitle: Story = {
  args: { linkBook: longTitleLinkBook },
};
