import type { Meta, StoryObj } from "@storybook/react";
import { http, HttpResponse } from "msw";

import { mockRespone } from "../../../mocks/linkBook.mocks";
import { mockTags } from "../../../mocks/tag.mocks";

import { useEffect, useState } from "react";
import Tag from "@/components/drawer/link/Tag";
import { queryClient } from "@/stories/mocks/store.mocks";

function Wrapper({ defaultTags }: { defaultTags: string[] }) {
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    setTags(defaultTags);
  }, [defaultTags]);

  return <Tag tags={tags} setTags={(tags: string[]) => setTags(tags)} />;
}

const meta = {
  title: "Component/Drawer/Link/Add Tags",
  component: Wrapper,
  parameters: {
    msw: {
      handlers: [
        http.get("/api/link-books?sort=created_at", () => {
          return HttpResponse.json(mockRespone);
        }),
        http.get("/api/settings/tags", () => {
          return HttpResponse.json(mockTags);
        }),
      ],
    },
  },
  args: { defaultTags: mockTags },
  beforeEach: () => {
    queryClient.clear();
  },
} satisfies Meta<typeof Wrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const EmptyTags: Story = {
  tags: [],
};
