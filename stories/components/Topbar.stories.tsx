import Topbar from "@/components/layout/Topbar";
import SearchResult from "@/components/search-link/SearchResult";
import { useSearchBarStore } from "@/store/useSearchBarStore";
import type { Meta, StoryObj } from "@storybook/react";
import { within } from "@storybook/test";

const meta = {
  title: "Component/Layout/Topbar",
  component: Topbar,
  tags: ["autodocs"],
  decorators: (Story) => {
    return (
      <div className="h-screen w-full">
        <Story />
      </div>
    );
  },
} satisfies Meta<typeof Topbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const OpenSearchDropdownWithResult: Story = {
  render: () => <SearchResult />,
  // decorators: (Story) => {
  //   useSearchBarStore.setState({ isDropdownOpen: true, keyword: "다" });
  //   return <Story />;
  // },
};

export const OpenSearchDropdownWithEmptyResult: Story = {
  decorators: (Story) => {
    useSearchBarStore.setState({ isDropdownOpen: true });
    return <Story />;
  },
};

// 전체 검색
export const TestSearchLinks: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    //
  },
};

// 폴더 내 검색

// 실시간 반영?
