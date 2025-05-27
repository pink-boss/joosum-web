import type { Meta, StoryObj } from "@storybook/react";

import { SaveLinkDrawer } from "@/components/drawer/dynamic";
import meta from "../Save.stories";
import { queryClient } from "@/stories/mocks/store.mocks";
import { http, HttpResponse } from "msw";
import { CreateFormState } from "@/types/link.types";
import { useOpenDrawerStore } from "@/store/useDrawerStore";
import { expect, screen, userEvent, waitFor, within } from "@storybook/test";
import OpenLinkSaveDrawerButton from "@/components/drawer/link/OpenSaveDrawerButton";

// TODO: 링크북 변경해도 기본으로 계속 저장됨.
// TODO: drawer 스크롤 가능하게
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
          const { url } = (await request.json()) as { url: string };
          return HttpResponse.json({
            thumbnailURL: "https://nextjs.org/static/twitter-cards/home.jpg",
            title: "Next JS",
            url,
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

export const TestClearTitleOnLinkUpdate: Story = {
  args: {
    _defaultValues: {
      url: "https://nextjs.org",
      title: "Next JS",
      linkBookId: "",
      tags: [],
      thumbnailURL: "",
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const titleInput = await canvas.findByTestId("title");
    expect(titleInput).toHaveValue("Next JS");

    const linkInput = canvas.getByTestId("url");
    await userEvent.click(linkInput);
    await userEvent.keyboard("{Backspace}");

    await waitFor(() => {
      expect(titleInput).toHaveValue("");
    });
  },
};

export const TestSubmit: Story = {
  args: {
    _defaultValues: {
      url: "",
      title: "",
      linkBookId: "",
      tags: [],
      thumbnailURL: "",
    },
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("url", async () => {
      const linkInput = await canvas.findByTestId("url");
      await userEvent.type(linkInput, "https://nextjs.org{Enter}");
    });

    await step("title", async () => {
      await waitFor(async () => {
        expect(canvas.getByTestId("title")).toHaveValue("Next JS");
      });
    });

    await step("linkBook", async () => {
      await waitFor(async () => {
        const linkBookSelector = canvas.queryByTestId("link-book-selector");
        expect(linkBookSelector).not.toBeNull();
        await userEvent.click(
          linkBookSelector!.firstElementChild as HTMLElement,
        );
        const linkBookList = within(
          linkBookSelector!.lastElementChild as HTMLElement,
        ).queryByRole("list");
        expect(linkBookList).not.toBeNull();
        const linkBook = await within(linkBookList!).findByText(
          "주간 독서 목록",
        );
        await userEvent.click(linkBook);
      });
    });

    await step("tags", async () => {
      await step("tags", async () => {
        const tagInput = await canvas.findByTestId("tag-input"); // 🔥 findBy는 기다려줌
        await userEvent.type(tagInput, "frontend framework{Enter}");
      });
    });

    await step("submit", async () => {
      await expect(canvas.queryByRole("dialog")).toBeInTheDocument();
      await userEvent.click(canvas.getByRole("button", { name: "저장" }));
    });

    await step("feedback", async () => {
      await waitFor(async function OpenToast() {
        const toastPopup = screen.queryByRole("alertdialog");
        expect(toastPopup).toBeInTheDocument();
        expect(
          within(toastPopup!).getByText("링크가 저장되었습니다."),
        ).toBeInTheDocument();
      });
    });
  },
};
