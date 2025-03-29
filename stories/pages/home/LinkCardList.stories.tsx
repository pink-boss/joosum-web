import type { Meta, StoryObj } from "@storybook/react";

import LinkCardList from "@/app/home/LinkCardList";
import { getLinkListQueryKey } from "@/utils/queryKey";

import { mockLinks } from "../../mocks/link.mocks";
import { queryClient } from "@/stories/mocks/store.mocks";

const meta = {
  title: "Page/Home/LinkCardList",
  component: LinkCardList,
} satisfies Meta<typeof LinkCardList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  beforeEach: () => {
    queryClient.setQueryData(getLinkListQueryKey(), mockLinks);
  },
};

export const Empty: Story = {
  beforeEach: () => {
    queryClient.setQueryData(getLinkListQueryKey(), []);
  },
};
