import * as test from "@storybook/test";
import type { Meta, StoryObj } from "@storybook/react";
import { http, HttpResponse } from "msw";

import TagSelector from "@/app/link-book/[title]/tag-selector";
import { defaultValues, useLinkFilterStore } from "@/store/useLinkFilterStore";

import { mockTags } from "../../mocks/tag.mocks";

const meta = {
  title: "Page/FolderList/TagSelector",
  component: TagSelector,
  parameters: {
    msw: {
      handlers: [http.get("/api/tags", () => HttpResponse.json(mockTags))],
    },
  },
  args: { tags: defaultValues.tags, setTags: test.fn() },
  beforeEach: () => {
    useLinkFilterStore.setState({ tags: defaultValues.tags });
  },
} satisfies Meta<typeof TagSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
