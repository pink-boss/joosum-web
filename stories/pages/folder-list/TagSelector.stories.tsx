import * as test from "@storybook/test";
import type { Meta, StoryObj } from "@storybook/react";
import { http, HttpResponse } from "msw";

import {
  defaultValues,
  useFolderLinkFilterStore,
} from "@/store/link-filter/useFolderStore";

import { mockTags } from "../../mocks/tag.mocks";
import TagSelector from "@/components/link/tag-selector";

// TODO: 태그 비었을 때 # 나옴
const meta = {
  title: "Page/FolderList/TagSelector",
  component: TagSelector,
  parameters: {
    msw: {
      handlers: [
        http.get("/api/settings/tags", () => HttpResponse.json(mockTags)),
      ],
    },
  },
  args: { tags: defaultValues.tags, setTags: test.fn() },
  beforeEach: () => {
    useFolderLinkFilterStore.setState({ tags: defaultValues.tags });
  },
} satisfies Meta<typeof TagSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
