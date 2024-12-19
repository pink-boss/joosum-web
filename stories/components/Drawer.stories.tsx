import {
  DeleteDrawerLinkDialog,
  MutateLinkDrawer,
} from "@/app/link-book/drawer/dynamic";
import { useOpenDrawerStore } from "@/store/useDrawerStore";
import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, waitFor, within } from "@storybook/test";
import { mockLink, mockLinks } from "../pages/mocks/link.mocks";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { http, HttpResponse } from "msw";
import { mockLinkBooks, mockRespone } from "../pages/mocks/linkBook.mocks";
import DrawerButton from "@/app/link-book/[title]/DrawerButton";
import { useOpenDialogStore } from "@/store/useDialogStore";
import { MutateLinkBookDialog } from "@/components/dialog/dynamic";
import { CreateFormState } from "@/types/linkBook.types";
import { mockTags } from "../pages/mocks/tag.mocks";
import FakeTimers from "@sinonjs/fake-timers";
import { jest } from "@storybook/jest";
import { Link } from "@/types/link.types";
import { ShareLinkDialog } from "@/app/link-book/dialog/dynamic";
import { getLinkListQueryKey } from "@/utils/queryKey";

const queryClient = new QueryClient();
let capturedRequest: {
  updateLink?: Request;
  updateLinkBook?: Request;
  deleteLink?: Request;
} = {};
let invalidateQuerySpy: any;

const meta = {
  title: "Component/Drawer",
  component: MutateLinkDrawer,
  tags: ["autodocs"],
  decorators: (Story) => {
    const { isMutateLinkBookOpen, isDeleteDrawerLinkOpen, isShareLinkOpen } =
      useOpenDialogStore();
    return (
      <QueryClientProvider client={queryClient}>
        <div id="drawer-root" />
        <div id="modal-root" />
        {isMutateLinkBookOpen && <MutateLinkBookDialog />}
        {isDeleteDrawerLinkOpen && <DeleteDrawerLinkDialog />}
        {isShareLinkOpen && <ShareLinkDialog />}
        <Story />
      </QueryClientProvider>
    );
  },
  parameters: {
    msw: {
      handlers: [
        http.get("/api/link-books?sort=created_at", () => {
          return HttpResponse.json(mockRespone);
        }),
        http.post("/api/link-books", async ({ request }) => {
          const data = (await request.json()) as CreateFormState;
          return HttpResponse.json({ ...data, linkBookId: "lb_999" });
        }),
        http.get("/api/tags", () => {
          return HttpResponse.json(mockTags);
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
      ],
    },
  },
  beforeEach: () => {
    capturedRequest = {};
  },
} satisfies Meta<typeof MutateLinkDrawer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Open: Story = {
  decorators: (Story) => {
    useOpenDrawerStore.setState({ link: mockLink, isLinkDrawerOpen: true });
    return <Story />;
  },
};

export const OpenCloseDrawer: Story = {
  decorators: (Story) => {
    useOpenDrawerStore.setState({ link: undefined, isLinkDrawerOpen: false });
    return (
      <>
        <DrawerButton link={mockLink} />
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

export const RenderFormData: Story = {
  play: async ({ canvasElement }) => {
    useOpenDrawerStore.setState({ link: mockLink, isLinkDrawerOpen: true });

    const canvas = within(canvasElement);

    await waitFor(async () => {
      expect(
        canvas
          .queryByAltText("thumbnail")
          ?.getAttribute("src")
          ?.startsWith(mockLink.thumbnailURL),
      ).toBeTruthy();

      expect(canvas.getByDisplayValue(mockLink.title)).toBeInTheDocument();

      expect(
        within(canvas.getByTestId("link-book-selector")).getByText(
          mockLink.linkBookName,
        ),
      ).toBeInTheDocument();

      expect(canvas.getByTestId("selected-tags").childElementCount).toBe(3);
      for (const tag of mockLink.tags) {
        expect(canvas.getByText(tag)).toBeInTheDocument();
      }
    });
  },
};

export const AddFolder: Story = {
  play: async ({ canvasElement }) => {
    useOpenDrawerStore.setState({ link: mockLink, isLinkDrawerOpen: true });

    const canvas = within(canvasElement);

    await waitFor(async () => {
      await userEvent.click(canvas.getByTestId("create-folder-dialog-button"));
    });

    await waitFor(async () => {
      const titleInput = canvas.getByTestId("link-book-title");
      await userEvent.type(titleInput, "새로 만든 폴더");
    });

    await waitFor(async () => {
      expect(canvas.getByText("생성")).not.toBeDisabled();
    });

    await userEvent.click(canvas.getByText("생성"));

    await waitFor(async () => {
      expect(
        within(canvas.getByTestId("link-book-selector")).getByText(
          "새로 만든 폴더",
        ),
      ).toBeInTheDocument();
    });
  },
};

// TODO: 생성 기능 막고 커밋. 태그 한번 추가하고 난 뒤, ui 어떻게?
// TODO: 기획대로 수정
// export const UpdateTag: Story = {
//   play: async ({ canvasElement }) => {
//     useOpenDrawerStore.setState({ link: mockLink, isLinkDrawerOpen: true });

//     const canvas = within(canvasElement);

//     await waitFor(async () => {
//       const selectedTags = within(canvas.getByTestId("selected-tags"));
//       await userEvent.click(selectedTags.getAllByRole("button")[0]);
//     });

//     await waitFor(async () => {
//       await userEvent.click(canvas.getByTestId("edit-tags-button"));
//     });

//     await waitFor(async () => {
//       const tagSelector = within(canvas.getByTestId("tag-selector"));
//       await userEvent.click(tagSelector.getByTestId("open-button"));
//       await userEvent.click(tagSelector.getByText(mockTags[0]));
//     });

//     await waitFor(async () => {
//       await userEvent.click(canvas.getByTestId("edit-tags-button"));
//     });

//     const selectedTags = within(canvas.getByTestId("selected-tags"));
//     expect(selectedTags.getByText(mockLink.tags[1])).toBeInTheDocument();
//     expect(selectedTags.getByText(mockLink.tags[2])).toBeInTheDocument();
//     expect(selectedTags.getByText(mockTags[0])).toBeInTheDocument();
//   },
// };

export const UpdateLink: Story = {
  decorators: (Story) => {
    invalidateQuerySpy = jest.spyOn(queryClient, "invalidateQueries");
    return <Story />;
  },
  play: async ({ canvasElement }) => {
    const clock = FakeTimers.install({
      shouldAdvanceTime: true,
      advanceTimeDelta: 20,
      shouldClearNativeTimers: true,
    });

    try {
      useOpenDrawerStore.setState({ link: mockLink, isLinkDrawerOpen: true });
      const NEW_TITLE = "뉴 타이틀";
      const NEW_FOLDER_ID = mockLinkBooks[1].linkBookId;
      const NEW_FOLDER_NAME = mockLinkBooks[1].title;
      const NEW_TAG = "생산성";

      const canvas = within(canvasElement);

      // title 수정
      await waitFor(async () => {
        const inputElement = canvas.getByTestId("title");
        await userEvent.clear(inputElement);
        await userEvent.type(inputElement, NEW_TITLE);
      });

      // folder 수정
      const folderSelector = canvas.getByTestId("link-book-selector");
      await userEvent.click(within(folderSelector).getByTestId("open-button"));
      await userEvent.click(within(folderSelector).getByText(NEW_FOLDER_NAME));

      // tag 수정
      // await waitFor(async () => {
      //   await userEvent.click(canvas.getByTestId("edit-tags-button"));
      // });

      // await waitFor(async () => {
      //   const tagSelector = within(canvas.getByTestId("tag-selector"));
      //   await userEvent.click(tagSelector.getByTestId("open-button"));
      //   await userEvent.click(tagSelector.getByText(NEW_TAG));
      // });

      await userEvent.click(canvas.getByText("수정"));

      // request 확인
      if (capturedRequest.updateLink) {
        const url = new URL(capturedRequest.updateLink.url);
        expect(url.pathname).toBe(`/api/links/${mockLink.linkId}`);
        if (!capturedRequest.updateLink.bodyUsed) {
          const body = await capturedRequest.updateLink.json();
          expect(body.thumbnailURL).toBe(mockLink.thumbnailURL);
          expect(body.title).toBe(NEW_TITLE);
          expect(body.linkBookId).toBe(NEW_FOLDER_ID);
          // expect(body.tags).toEqual([...mockLink.tags, NEW_TAG]);
        } else expect(null).toBe("이미 사용된 bodyUsed");
      } else expect(null).toBe("updateLink request X");

      if (capturedRequest.updateLinkBook) {
        const url = new URL(capturedRequest.updateLinkBook.url);
        expect(url.pathname).toBe(
          `/api/links/${mockLink.linkId}/link-book-id/${NEW_FOLDER_ID}`,
        );
      } else expect(null).toBe("updateLinkBook request X");

      // toast
      await waitFor(async () => {
        const toast = canvas.getByTestId("feedback-toast");
        expect(toast).toBeInTheDocument();
        expect(toast).toHaveTextContent("수정되었습니다.");
      });

      await clock.tickAsync(4000);

      await waitFor(() => {
        expect(canvas.queryByTestId("feedback-toast")).not.toBeInTheDocument();
      });

      // 링크 리스트 캐시 확인
      expect(invalidateQuerySpy).toHaveBeenCalled();
    } finally {
      clock.uninstall();
    }
  },
};

export const DeleteLink: Story = {
  play: async ({ canvasElement }) => {
    const queryKey = getLinkListQueryKey(mockLink.linkBookId);
    queryClient.setQueryData(queryKey, () =>
      mockLinks.filter((link) => link.linkBookId === mockLink.linkBookId),
    );
    useOpenDrawerStore.setState({ link: mockLink, isLinkDrawerOpen: true });

    const canvas = within(canvasElement);

    await waitFor(async () => {
      await userEvent.click(canvas.getByRole("button", { name: "삭제" }));
    });

    await waitFor(async () => {
      const dialog = canvas.getByTestId("delete-dialog");
      await userEvent.click(within(dialog).getByText("삭제"));
    });

    // request
    if (capturedRequest.deleteLink) {
      const url = new URL(capturedRequest.deleteLink.url);
      expect(url.pathname).toBe(`/api/links/${mockLink.linkId}`);
      expect(capturedRequest.deleteLink.method).toBe("DELETE");
    }

    // update cache
    const links = queryClient.getQueryData(queryKey) as Link[];
    const deleteLink = links.find((link) => link.linkId === mockLink.linkId);
    expect(deleteLink).toBeUndefined();

    // close drawer
    const deleteDialog = canvas.queryByTestId("dialog");
    expect(deleteDialog).toBeNull();
  },
};

const mockClipboard = {
  writeText: jest.fn().mockImplementation(() => Promise.resolve()),
};

// TODO: 링크 복사 피드백
export const ShareLink: Story = {
  beforeEach: () => {
    Object.defineProperty(window.navigator, "clipboard", {
      value: mockClipboard,
      writable: true,
    });
    useOpenDrawerStore.setState({ link: mockLinks[0], isLinkDrawerOpen: true });
  },
  decorators: (Story) => {
    queryClient.setQueryData(getLinkListQueryKey(), () => mockLinks);
    return <Story />;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await waitFor(async () => {
      await userEvent.click(canvas.getByAltText("share"));
    });

    // 링크 복사
    await waitFor(async () => {
      await userEvent.click(canvas.getByAltText("copy-link"));
      expect(mockClipboard.writeText).toHaveBeenCalledWith(mockLinks[0].url);
    });

    // TODO: 카카오톡

    // 닫기
    await userEvent.click(canvas.getByRole("button", { name: "취소" }));
  },
};
