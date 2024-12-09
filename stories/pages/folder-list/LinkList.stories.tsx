import type { Meta, StoryObj } from "@storybook/react";
import { mockLinks } from "../home/mock-up";
import LinkList from "@/app/my-folder/[id]/link-list";
import { expect, userEvent, within } from "@storybook/test";

const meta = {
  title: "Page/Folder-List/Link-List",
  component: LinkList,
  args: {
    linkList: mockLinks,
  },
  tags: ["autodocs"],
  parameters: {
    backgrounds: {
      default: "light",
    },
  },
} satisfies Meta<typeof LinkList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { defaultEditMode: false },
};

export const EditMode: Story = {
  args: { defaultEditMode: true },
};

export const TestCheckStatement: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // edit mode 변경
    await userEvent.click(canvas.getByRole("button", { name: "편집" }));

    const checkboxList = canvas.getAllByRole("listitem");

    // 3번 체크 박스 적용 확인
    await userEvent.click(within(checkboxList[2]).getByRole("checkbox"));
    await expect(checkboxList[2].firstChild).toBeChecked();

    // 모두 체크
    await userEvent.click(
      canvas.getByRole("checkbox", {
        name: "모두 선택",
      }),
    );
    checkboxList.forEach(async (checkbox) => {
      await expect(checkbox.firstChild).toBeChecked();
    });

    // 모두 해제
    await userEvent.click(
      canvas.getByRole("checkbox", {
        name: "모두 선택",
      }),
    );
    checkboxList.forEach(async (checkbox) => {
      await expect(checkbox.firstChild).not.toBeChecked();
    });
  },
};
