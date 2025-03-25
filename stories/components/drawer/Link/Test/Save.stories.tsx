import type { Meta, StoryObj } from "@storybook/react";

import { SaveLinkDrawer } from "@/components/drawer/dynamic";
import meta from "../Save.stories";
import { queryClient } from "@/stories/mocks/store.mocks";
import { http, HttpResponse } from "msw";
import { CreateFormState } from "@/types/link.types";
import { useOpenDrawerStore } from "@/store/useDrawerStore";
import { expect, userEvent, waitFor, within } from "@storybook/test";
import OpenLinkSaveDrawerButton from "@/components/drawer/link/OpenSaveDrawerButton";
import { findByRole } from "@testing-library/dom";

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
} satisfies Meta<typeof SaveLinkDrawer>;

export default testMeta;
type Story = StoryObj<typeof testMeta>;

export const Test: Story = {};

export const TestOpenCloseDrawer: Story = {
  beforeEach: () => {
    useOpenDrawerStore.setState({
      isLinkSaveDrawerOpen: false,
    });
    queryClient.clear();
  },
  decorators: (Story) => {
    return (
      <>
        <OpenLinkSaveDrawerButton />
        <Story />
      </>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "링크 저장" }));

    await waitFor(() => {
      expect(canvas.queryByRole("dialog")).toBeInTheDocument();
    });

    await userEvent.click(canvas.getByAltText("close"));

    expect(canvas.queryByRole("dialog")).toBeNull();
  },
};

export const TestGetThumbnail: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await waitFor(async function TypeURL() {
      const inputElement = canvas.queryByTestId("url");
      expect(inputElement).toBeInTheDocument();
      await userEvent.type(inputElement!, "https://nextjs.org{enter}");
    });

    // request 확인
    if (capturedRequest.getThumbnail) {
      const url = new URL(capturedRequest.getThumbnail.url);
      expect(url.pathname).toBe(`/api/links/thumbnail`);
    } else expect(null).toBe("썸네일 가져오기 에러");

    await waitFor(() => {
      expect(canvas.queryByTestId("title")).toHaveValue("Next JS");
      expect(canvas.queryByTestId("thumbnailURL")).toHaveValue(
        "https://nextjs.org/static/twitter-cards/home.jpg",
      );
    });
  },
};

// TODO: 링크 선택을 못 건너 뛰도록
// TODO: 링크 수정시 제목 삭제

// TODO: submit 제대로 되는지
