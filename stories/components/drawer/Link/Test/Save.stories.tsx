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

    if (capturedRequest.getThumbnail) {
      const url = new URL(capturedRequest.getThumbnail.url);
      expect(url.pathname).toBe(`/api/links/thumbnail`);
    } else expect(null).toBe("썸네일 가져오기 에러");

    await waitFor(function setFormData() {
      expect(canvas.queryByTestId("title")).toHaveValue("Next JS");
      expect(canvas.queryByTestId("thumbnailURL")).toHaveValue(
        "https://nextjs.org/static/twitter-cards/home.jpg",
      );
    });
  },
};

export const TestRequiredURL: Story = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    const linkInput = await canvas.findByTestId("url");

    const form = canvasElement.querySelector("form");
    expect(form?.checkValidity()).toBe(false);

    await step("Invalid: 제목, 폴더, 태그 선택 불가", async () => {
      await userEvent.type(linkInput, "invalid.org{enter}");

      expect(form?.checkValidity()).toBe(false);

      expect(canvas.getByTestId("title")).toHaveProperty("disabled", true);
      const folder = within(
        canvas.getByTestId("link-book-selector").parentElement as HTMLElement,
      );
      expect(folder.getByTestId("create-folder-dialog-button")).toHaveProperty(
        "disabled",
        true,
      );
      expect(folder.getByTestId("open-button")).toHaveProperty(
        "disabled",
        true,
      );
      expect(canvas.getByTestId("tag-input")).toHaveProperty("disabled", true);
    });

    await step("Valid: 제목, 폴더, 태그 선택 가능", async () => {
      await userEvent.clear(linkInput);
      await userEvent.type(linkInput, "https://nextjs.org{Enter}");

      expect(form?.checkValidity()).toBe(true);

      expect(canvas.getByTestId("title")).toHaveProperty("disabled", false);
      const folder = within(
        canvas.getByTestId("link-book-selector").parentElement as HTMLElement,
      );
      expect(folder.getByTestId("create-folder-dialog-button")).toHaveProperty(
        "disabled",
        false,
      );
      expect(folder.getByTestId("open-button")).toHaveProperty(
        "disabled",
        false,
      );
      expect(canvas.getByTestId("tag-input")).toHaveProperty("disabled", false);
    });
  },
};

// TODO: 링크 수정시 제목 삭제

// TODO: submit 제대로 되는지
