import type { Meta, StoryObj } from "@storybook/react";

import { SaveLinkDrawer } from "@/components/drawer/dynamic";
import meta from "../Save.stories";

const testMeta = {
  ...meta,
  title: "Component/Drawer/Link/Save",
} satisfies Meta<typeof SaveLinkDrawer>;

export default testMeta;
type Story = StoryObj<typeof testMeta>;

export const Test: Story = {};

// TODO: open and close

// TODO: url로 서버에서 데이터 불러올 수 있는지

// TODO: 링크 선택을 못 건너 뛰도록
// TODO: 링크 수정시 제목 삭제

// TODO: submit 제대로 되는지
