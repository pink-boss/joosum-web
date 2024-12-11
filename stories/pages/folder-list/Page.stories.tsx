import type { Meta, StoryObj } from "@storybook/react";
import { http, HttpResponse } from "msw";

import Page from "@/app/my-folder/[linkBookId]/page";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as navigationHooks from "next/navigation";
import { totalTags } from "./mock-up";
import { mockLinks } from "../mock-up";
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
        http.get("/api/tags", () => HttpResponse.json(totalTags)),
      ],
    },
  },
  decorators: (Story) => {
    jest.spyOn(navigationHooks, "useParams").mockReturnValue({
      linkBookId: "testLinkBookId",
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

// TODO: data fetch empty data test

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
      expect(canvas.queryAllByRole("listitem").length).toBe(20);
      const tagSelector = within(canvas.getByTestId("tag-selector"));
      expect(tagSelector.getByText("#여행")).toBeInTheDocument();
      expect(tagSelector.getByText("#쇼핑")).toBeInTheDocument();
    });
  },
};
