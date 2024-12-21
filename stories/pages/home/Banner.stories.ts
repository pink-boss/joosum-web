import type { Meta, StoryObj } from "@storybook/react";

import BannerCard from "@/app/home/Banner";

import { mockBanners } from "../mocks/banner.mocks";

const meta = {
  title: "Page/Home/Banner",
  component: BannerCard,
  tags: ["autodocs"],
  args: { data: mockBanners },
} satisfies Meta<typeof BannerCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
