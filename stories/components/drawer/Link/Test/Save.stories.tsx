import type { Meta, StoryObj } from "@storybook/react";

import { SaveLinkDrawer } from "@/components/drawer/dynamic";
import meta from "../Save.stories";

const testMeta = {
  ...meta,
  title: "Component/Drawer/Link/Save",
} satisfies Meta<typeof SaveLinkDrawer>;

export default testMeta;
type Story = StoryObj<typeof testMeta>;
