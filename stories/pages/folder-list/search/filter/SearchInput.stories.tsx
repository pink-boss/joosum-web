import type { Meta, StoryObj } from "@storybook/react";
import SearchInput from "@/components/layout/SearchInput";
import { useEffect, useRef } from "react";
import { useSearchBarStore } from "@/store/useSearchBarStore";

const meta = {
  title: "Page/FolderList/Search/SearchInput",
  component: SearchInput,
  beforeEach: () => {
    useSearchBarStore.getState().setTitle("");
  },
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
  beforeEach: () => {
    useSearchBarStore.getState().setTitle("피그마");
  },
};
