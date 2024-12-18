import type { Meta, StoryObj } from "@storybook/react";
import { http, HttpResponse } from "msw";

import Page from "@/app/link-book/[title]/page";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as navigationHooks from "next/navigation";
import { mockTags } from "../mocks/tag.mocks";
import { mockLinks } from "../mocks/link.mocks";
import { expect, waitFor, within } from "@storybook/test";
import { jest } from "@storybook/jest";
import { defaultValues, useLinkFilterStore } from "@/store/useLinkFilterStore";

const queryClient = new QueryClient();
let capturedRequest: Request | null = null;

const meta = {
  title: "Page/FolderList",
  component: Page,
  tags: ["autodocs"],
  parameters: {
    nextjs: {
      appDirectory: true,
    },
    backgrounds: {
      default: "light",
    },
    msw: {
      handlers: [
        http.get("/api/links/:linkBookId", ({ request }) => {
          capturedRequest = request;
          return HttpResponse.json(mockLinks);
        }),
        http.get("/api/tags", () => HttpResponse.json(mockTags)),
      ],
    },
  },
  decorators: (Story) => {
    jest.spyOn(navigationHooks, "useParams").mockReturnValue({
      title: "",
    });
    return (
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    );
  },
  beforeEach: () => {
    useLinkFilterStore.setState(defaultValues);
  },
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultPage: Story = {};

export const EmptyData: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get("/api/links/:linkBookId", ({ request }) => {
          capturedRequest = request;
          return HttpResponse.json([]);
        }),
        http.get("/api/tags", () => HttpResponse.json([])),
      ],
    },
  },
};

// TODO: data fetch loading test

// TODO: data fetch error test

export const TestFilterStatement_Unread: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    useLinkFilterStore.setState({ unread: true });
    waitFor(() => {
      expect(canvas.queryAllByRole("listitem").length).toBe(1);
      expect(canvas.getByRole("radio")).toBeChecked();
    });
  },
};

export const TestFilterStatement_DatePicker: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    useLinkFilterStore.setState({
      dateRange: [new Date("2024.03.22"), new Date("2024.03.24")],
    });
    waitFor(() => {
      expect(canvas.queryAllByRole("listitem").length).toBe(2);
      const datePicker = within(canvas.getByTestId("date-picker"));
      expect(datePicker.getByTestId("open-button")).toHaveTextContent(
        `2024. 03. 22 ~ 2024. 03. 24`,
      );
    });
  },
};

export const TestFilterStatement_TagSelector: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    useLinkFilterStore.setState({
      tags: ["여행", "쇼핑"],
    });
    waitFor(() => {
      expect(canvas.queryAllByRole("listitem").length).toBe(21);
      const tagSelector = within(canvas.getByTestId("tag-selector"));
      expect(tagSelector.getByText("#여행")).toBeInTheDocument();
      expect(tagSelector.getByText("#쇼핑")).toBeInTheDocument();
    });
  },
};

// TODO: 링크 더보기 버튼 - 우측에 링크 상세 오픈
