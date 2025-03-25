import type { Meta, StoryObj } from "@storybook/react";

import { SaveLinkDrawer } from "@/components/drawer/dynamic";
import meta from "../Save.stories";
import { queryClient } from "@/stories/mocks/store.mocks";
import { http, HttpResponse } from "msw";
import { CreateFormState } from "@/types/link.types";
import { useOpenDrawerStore } from "@/store/useDrawerStore";
import { expect, userEvent, waitFor, within } from "@storybook/test";
import OpenLinkSaveDrawerButton from "@/components/drawer/link/OpenSaveDrawerButton";

let capturedRequest: {
  getThumbnail?: Request;
  saveLink?: Request;
  updateLinkBook?: Request;
} = {};

const testMeta = {
  ...meta,
  title: "Component/Drawer/Link/Save",
  parameters: {
    msw: {
      handlers: [
        ...meta.parameters.msw.handlers,
        http.post("/api/links/thumbnail", async ({ request }) => {
          capturedRequest.getThumbnail = request.clone();
          return HttpResponse.json({
            thumbnailURL: "https://nextjs.org/static/twitter-cards/home.jpg",
            title: "Next JS",
            url: "https://nextjs.org",
          });
        }),
        http.post("/api/links", async ({ request }) => {
          capturedRequest.saveLink = request.clone();
          const data = (await request.json()) as CreateFormState;
          return HttpResponse.json({ ...data, linkBookId: "lb_999" }); // 나머지 데이터 생략
        }),
        http.put(
          "/api/links/:linkId/link-book-id/:linkBookId",
          ({ request }) => {
            capturedRequest.updateLinkBook = request.clone();
            return HttpResponse.json({ status: 204 });
          },
        ),
      ],
    },
  },
  beforeEach: () => {
    queryClient.clear();
  },
} satisfies Meta<typeof SaveLinkDrawer>;

export default testMeta;
type Story = StoryObj<typeof testMeta>;

export const Test: Story = {};

export const TestOpenCloseDrawer: Story = {
  decorators: (Story) => {
    useOpenDrawerStore.setState({
      isLinkSaveDrawerOpen: false,
    });
    return (
      <>
        <OpenLinkSaveDrawerButton />
        <Story />
      </>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button"));

    await waitFor(() => {
      expect(canvas.queryByRole("dialog")).toBeInTheDocument();
    });

    await userEvent.click(canvas.getByAltText("close"));

    expect(canvas.queryByRole("dialog")).toBeNull();
  },
};

// TODO: url로 서버에서 데이터 불러올 수 있는지

// TODO: 링크 선택을 못 건너 뛰도록
// TODO: 링크 수정시 제목 삭제

// TODO: submit 제대로 되는지
