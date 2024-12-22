import { jest } from "@storybook/jest";
import type { Meta, StoryObj } from "@storybook/react";
import { expect, waitFor, within } from "@storybook/test";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { http, HttpResponse } from "msw";
import * as navigationHooks from "next/navigation";

import Page from "@/app/link-book/[title]/page";
import { defaultValues, useLinkFilterStore } from "@/store/useLinkFilterStore";

import { mockLinks } from "../../mocks/link.mocks";
import { mockLinkBooks } from "../../mocks/linkBook.mocks";
import { mockTags } from "../../mocks/tag.mocks";

const queryClient = new QueryClient();
let capturedRequest: Request | null = null;

const meta = {
  title: "Page/FolderList/Page",
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
        http.get("/api/links", ({ request }) => {
          capturedRequest = request;
          return HttpResponse.json(mockLinks);
        }),
        http.get("/api/tags", () => HttpResponse.json(mockTags)),
        http.get("/api/link-books", () => {
          return HttpResponse.json(mockLinkBooks);
        }),
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
        http.get("/api/links", ({ request }) => {
          capturedRequest = request;
          return HttpResponse.json([]);
        }),
        http.get("/api/tags", () => HttpResponse.json([])),
        http.get("/api/link-books", () => {
          return HttpResponse.json(mockLinkBooks);
        }),
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
