import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";
import React from "react";

import { options } from "../../mocks/filter.mocks";
import meta from "../Dropdown.stories";

const testMeta = {
  ...meta,
  title: "Component/Dropdown",
} satisfies Meta<typeof React.Component>;

export default testMeta;
type Story = StoryObj<typeof testMeta>;

export const TestAllOptions: Story = {
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
