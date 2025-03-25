import type { Meta } from "@storybook/react";

import { http, HttpResponse } from "msw";

import DeleteDialog from "@/app/my-folder/DeleteDialog";
import DropdownMore from "@/app/my-folder/DropdownMore";
import MutateDialog from "@/app/my-folder/mutate/MutateDialog";
import useQueryLinkBooks from "@/hooks/my-folder/useQueryLinkBooks";
import { useOpenDialogStore } from "@/store/useDialogStore";

import { mockLinkBooks, mockRespone } from "../../mocks/linkBook.mocks";

export const QueryLinkBookList = () => {
  useQueryLinkBooks("created_at");
  return <DropdownMore linkBook={mockLinkBooks[1]} />;
};

const meta = {
  title: "Page/MyFolder/DropdownMore",
  component: QueryLinkBookList,
  beforeEach: () => {
    useOpenDialogStore.getState().openMutateLinkBook(false);
    useOpenDialogStore.getState().openDeleteLinkBook(false);
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
  decorators: (Story) => (
    <>
      <Story />
      <MutateDialog />
      <DeleteDialog />
    </>
  ),
} satisfies Meta<typeof QueryLinkBookList>;

export default meta;
