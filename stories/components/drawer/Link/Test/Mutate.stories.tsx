import type { Meta, StoryObj } from "@storybook/react";
import {
  expect,
  fn,
  screen,
  spyOn,
  userEvent,
  waitFor,
  within,
} from "@storybook/test";
import { http, HttpResponse } from "msw";

import { useOpenDrawerStore } from "@/store/useDrawerStore";
import { Link } from "@/types/link.types";
import { CreateFormState } from "@/types/linkBook.types";
import { getLinkListQueryKey } from "@/utils/queryKey";

import { MutateLinkDrawer } from "@/components/drawer/dynamic";
import meta from "../Mutate.stories";
import { mockLink, mockLinks } from "@/stories/mocks/link.mocks";
import { mockLinkBooks } from "@/stories/mocks/linkBook.mocks";
import { queryClient } from "@/stories/mocks/store.mocks";
import DrawerButton from "@/components/link/DrawerButton";

let capturedRequest: {
  updateLink?: Request;
  updateLinkBook?: Request;
  deleteLink?: Request;
  updateTags?: Request;
} = {};
let invalidateQuerySpy: any;

const testMeta = {
  ...meta,
  title: "Component/Drawer/Link/Mutate",
  component: MutateLinkDrawer,
  parameters: {
    msw: {
      handlers: [
        ...meta.parameters.msw.handlers,
        http.post("/api/link-books", async ({ request }) => {
          const data = (await request.json()) as CreateFormState;
          return HttpResponse.json({ ...data, linkBookId: "lb_999" });
        }),
        http.put("/api/links/:linkId", async ({ request }) => {
          capturedRequest.updateLink = request.clone();
          const data = (await request.json()) as CreateFormState;
          return HttpResponse.json({ ...mockLink, ...data });
        }),
        http.put(
          "/api/links/:linkId/link-book-id/:linkBookId",
          ({ request }) => {
            capturedRequest.updateLinkBook = request.clone();
            return HttpResponse.json({ status: 204 });
          },
        ),
        http.delete("/api/links/:linkId", async ({ request }) => {
          capturedRequest.deleteLink = request.clone();
          return HttpResponse.json({ status: 204 });
        }),
        http.post("/api/settings/tags", ({ request }) => {
          capturedRequest.updateTags = request.clone();
          return HttpResponse.json({ status: 200 });
        }),
      ],
    },
  },
  beforeEach: () => {
    capturedRequest = {};
    queryClient.clear();
    useOpenDrawerStore.setState({
      link: mockLink,
      isLinkDrawerOpen: true,
      mode: "mutate",
    });
    if (!window.Kakao) window.Kakao = {};
    window.Kakao.cleanup = () => {};
    window.Kakao.init = () => {};
    window.Kakao.Share = {
      sendDefault: () => {},
    };
  },
} satisfies Meta<typeof MutateLinkDrawer>;

export default testMeta;
type Story = StoryObj<typeof testMeta>;

export const TestOpenCloseDrawer: Story = {
  beforeEach: () => {
    useOpenDrawerStore.setState({
      link: undefined,
      isLinkDrawerOpen: false,
      mode: undefined,
    });
  },
  decorators: (Story) => {
    return (
      <>
        <DrawerButton link={mockLink} />
        <Story />
      </>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByTestId("drawer-button"));

    await waitFor(() => {
      expect(canvas.queryByRole("dialog")).toBeInTheDocument();
    });

    await userEvent.click(canvas.getByAltText("close"));

    expect(canvas.queryByRole("dialog")).toBeNull();
  },
};

export const TestRenderFormData: Story = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await waitFor(async () => {
      await step("thumbnail", () => {
        expect(
          canvas
            .queryByAltText("thumbnail")
            ?.getAttribute("src")
            ?.startsWith(mockLink.thumbnailURL),
        ).toBeTruthy();
      });

      await step("url", () => {
        const linkInput = canvas.getByDisplayValue(mockLink.url);
        expect(linkInput).toBeInTheDocument();
        expect(linkInput).toHaveProperty("disabled", true);
      });

      await step("title", () => {
        expect(canvas.getByDisplayValue(mockLink.title)).toBeInTheDocument();
      });

      await step("folder", () => {
        expect(
          within(canvas.getByTestId("open-button")).getByText(
            mockLink.linkBookName,
          ),
        ).toBeInTheDocument();
      });

      await step("tags", () => {
        const tagInput = within(canvas.getByTestId("tags-input"));
        expect(tagInput.getAllByRole("listitem").length).toBe(3);
        for (const tag of mockLink.tags) {
          expect(canvas.getByText(tag)).toBeInTheDocument();
        }
      });
    });
  },
};

export const TestUpdateLink: Story = {
  decorators: (Story) => {
    invalidateQuerySpy = spyOn(queryClient, "invalidateQueries");
    return <Story />;
  },
  play: async ({ canvasElement, step }) => {
    const NEW_TITLE = "뉴 타이틀";
    const NEW_FOLDER_ID = mockLinkBooks[1].linkBookId;
    const NEW_FOLDER_NAME = mockLinkBooks[1].title;
    const NEW_TAG = "생산성";

    const canvas = within(canvasElement);

    await step("title 수정", async () => {
      const inputElement = await canvas.findByTestId("title");
      await userEvent.click(inputElement);
      await waitFor(async () => {
        for (let i = 0; i < 5; i++) {
          await userEvent.keyboard("{Backspace}");
        }
      });
      await userEvent.type(inputElement, NEW_TITLE);
    });

    await step("folder 수정", async () => {
      const folderSelector = canvas.getByTestId("link-book-selector");
      await userEvent.click(folderSelector.firstElementChild as HTMLElement);
      await userEvent.click(within(folderSelector).getByText(NEW_FOLDER_NAME));
    });

    await step("tag 수정", async () => {
      const tagsInput = within(canvas.getByTestId("tags-input"));
      await userEvent.type(tagsInput.getByRole("textbox"), `${NEW_TAG}{Enter}`);
      expect(
        within(tagsInput.getByRole("list")).getByText(NEW_TAG),
      ).toBeInTheDocument();
    });

    await userEvent.click(canvas.getByText("수정"));

    await step("request 확인", async () => {
      await waitFor(() => {
        expect(capturedRequest.updateLink).not.toBeNull();
        expect(capturedRequest.updateTags).not.toBeNull();
      });

      if (!capturedRequest.updateLink) {
        throw new Error("updateLink request is null");
      }
      if (!capturedRequest.updateTags) {
        throw new Error("updateTags request is null");
      }

      const linkUrl = new URL(capturedRequest.updateLink.url);
      expect(linkUrl.pathname).toBe(`/api/links/${mockLink.linkId}`);

      // Request body를 안전하게 읽기 위해 새로운 clone 생성
      const requestClone = capturedRequest.updateLink.clone();
      const body = await requestClone.json();
      expect(body.thumbnailURL).toBe(mockLink.thumbnailURL);
      expect(body.title).toBe(NEW_TITLE);
      expect(body.linkBookId).toBe(NEW_FOLDER_ID);
      expect(body.tags).toEqual([...mockLink.tags, NEW_TAG]);

      await waitFor(() => {
        expect(capturedRequest.updateLinkBook).not.toBeNull();
      });

      if (!capturedRequest.updateLinkBook) {
        throw new Error("updateLinkBook request is null");
      }

      const linkBookUrl = new URL(capturedRequest.updateLinkBook.url);
      expect(linkBookUrl.pathname).toBe(
        `/api/links/${mockLink.linkId}/link-book-id/${NEW_FOLDER_ID}`,
      );
    });

    await step("feedback", async () => {
      await waitFor(async () => {
        const toastPopup = screen.queryByRole("alertdialog");
        expect(toastPopup).toBeInTheDocument();
        expect(
          within(toastPopup!).getByText("링크가 저장되었습니다."),
        ).toBeInTheDocument();
      });
    });

    expect(invalidateQuerySpy).toHaveBeenCalled();
  },
};

export const TestDeleteLink: Story = {
  beforeEach: () => {
    queryClient.setQueryData(getLinkListQueryKey(mockLink.linkBookId), () =>
      mockLinks.filter((link) => link.linkBookId === mockLink.linkBookId),
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await userEvent.click(await canvas.findByRole("button", { name: "삭제" }));

    const dialog = await canvas.findByTestId("delete-dialog");
    await userEvent.click(within(dialog).getByText("삭제"));

    await step("request 확인", () => {
      if (capturedRequest.deleteLink) {
        const url = new URL(capturedRequest.deleteLink.url);
        expect(url.pathname).toBe(`/api/links/${mockLink.linkId}`);
        expect(capturedRequest.deleteLink.method).toBe("DELETE");
      }
    });

    await step("cache 업데이트 확인", () => {
      const links = queryClient.getQueryData(
        getLinkListQueryKey(mockLink.linkBookId),
      ) as Link[];
      const deleteLink = links.find((link) => link.linkId === mockLink.linkId);
      expect(deleteLink).toBeUndefined();
    });

    await waitFor(() => {
      expect(dialog).not.toBeInTheDocument();
    });
  },
};

const mockClipboard = {
  writeText: fn().mockImplementation(() => Promise.resolve()),
};

export const TestShareLink: Story = {
  beforeEach: () => {
    Object.defineProperty(window.navigator, "clipboard", {
      value: mockClipboard,
      writable: true,
    });
    useOpenDrawerStore.setState({
      link: mockLinks[0],
      isLinkDrawerOpen: true,
      mode: "mutate",
    });
    if (!window.Kakao) window.Kakao = {};
    if (!window.navigator.clipboard)
      (window.navigator as any).clipboard = {
        writeText: () => Promise.resolve(),
      };
  },
  decorators: (Story) => {
    queryClient.setQueryData(getLinkListQueryKey(), () => mockLinks);
    return <Story />;
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await userEvent.click(await canvas.findByAltText("share"));

    await step("링크 복사", async () => {
      await waitFor(async () => {
        await userEvent.click(canvas.getByAltText("copy-link"));
        expect(mockClipboard.writeText).toHaveBeenCalledWith(mockLinks[0].url);
      });
    });

    // TODO: 카카오톡

    await userEvent.click(canvas.getByRole("button", { name: "취소" }));
  },
};
