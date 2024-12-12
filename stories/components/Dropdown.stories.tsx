import Dropdown from "@/components/Dropdown";
import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";
import { useState } from "react";

const options = [
  { label: "생성순", value: "created_at" },
  { label: "제목순", value: "title" },
  { label: "업데이트순", value: "last_saved_at" },
];

const DropdownWrapper = () => {
  const [selected, setSelected] = useState<Value>("created_at");

  return (
    <Dropdown
      selected={selected}
      setSelected={(value) => {
        setSelected(value);
      }}
      options={options}
    />
  );
};

const meta = {
  title: "Component/Dropdown",
  component: DropdownWrapper,
  parameters: {},
  tags: ["autodocs"],
  args: {
    options,
  },
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
