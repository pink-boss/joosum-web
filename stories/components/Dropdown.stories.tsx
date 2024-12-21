import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";
import { useState } from "react";

import Dropdown from "@/components/Dropdown";

import { options } from "../pages/mocks/filter";

const DropdownWrapper = () => {
  const [selected, setSelected] = useState<Value>("created_at");

  return (
    <Dropdown selected={selected} setSelected={setSelected} options={options} />
  );
};

const meta = {
  title: "Component/Dropdown",
  component: DropdownWrapper,
  parameters: {},
  tags: ["autodocs"],
} satisfies Meta<typeof DropdownWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AllOptionsTest: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    for (const option of options) {
      const openButton = canvas.getByTestId("open-button");

      await userEvent.click(openButton);

      const optionButton = canvas.getByTestId(`dropdown-${option.label}`);
      await userEvent.click(optionButton);

      await expect(openButton).toHaveTextContent(option.label);

      const dropdown = canvas.queryByTestId(`dropdown-${option.label}`);
      expect(dropdown).not.toBeInTheDocument();
    }
  },
};
