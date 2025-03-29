import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import Dropdown from "@/components/Dropdown";

import { options } from "../mocks/filter.mocks";

const DropdownWrapper = () => {
  const [selected, setSelected] = useState<Value>("created_at");

  return (
    <Dropdown selected={selected} setSelected={setSelected} options={options} />
  );
};

const meta = {
  title: "Component/Dropdown",
  component: DropdownWrapper,
} satisfies Meta<typeof DropdownWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
