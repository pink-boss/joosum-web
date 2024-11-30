import type { Meta, StoryObj } from "@storybook/react";

import Page from "@/app/my-folder/page";

const meta = {
  title: "Page/My-Folder",
  component: Page,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    // layout: 'fullscreen',
  },
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
