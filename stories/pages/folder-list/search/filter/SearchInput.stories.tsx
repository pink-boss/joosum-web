import type { Meta, StoryObj } from "@storybook/react";
import SearchInput from "@/components/layout/SearchInput";
import { useEffect, useRef } from "react";

const meta = {
  title: "Page/FolderList/Search/SearchInput",
  component: SearchInput,
} satisfies Meta<typeof SearchInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const FocusInput: Story = {
  decorators: (Story) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (ref.current) {
        ref.current.querySelector("input")?.focus();
      }
    }, []);
    return (
      <div ref={ref}>
        <Story />
      </div>
    );
  },
};

export const RenderClearButton: Story = {
  args: { _defaulValue: "피그마" },
};
