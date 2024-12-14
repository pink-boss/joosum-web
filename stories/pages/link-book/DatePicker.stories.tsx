import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, waitFor, within } from "@storybook/test";
import DatePicker from "@/app/link-book/[title]/date-picker";
import { dateFormatter } from "@/utils/date";

const meta = {
  title: "Page/FolderList/Filter/DatePicker",
  component: DatePicker,
  tags: ["autodocs"],
  parameters: {
    backgrounds: {
      default: "light",
    },
  },
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const TestPickDate: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const selectBox = canvas.getByTestId("open-button");
    await userEvent.click(selectBox);

    // 이전 달 선택
    const today = new Date();
    await userEvent.click(canvas.getByAltText("month-left"));
    expect(canvas.getByText(`${today.getFullYear()}년 ${today.getMonth()}월`));

    // 27 ~ 다음 달 1일 선택
    const start = "11";
    const end = "19";
    waitFor(async () => {
      await userEvent.click(canvas.getByText(start));
    });
    await userEvent.click(canvas.getByText(end));
    const prevMonth = new Date();
    prevMonth.setMonth(today.getMonth() - 1);
    const year = prevMonth.getFullYear();
    const month = `${prevMonth.getMonth() + 1}`.padStart(2, "0");
    expect(selectBox).toHaveTextContent(
      `${year}. ${month}. ${start} ~ ${year}. ${month}. ${end}`,
    );

    // 초기화 버튼 선택
    await userEvent.click(canvas.getByText("초기화"));
    expect(selectBox.textContent).toBe("");

    // 전 주 버튼 선택
    await userEvent.click(canvas.getByText("최근 1주"));
    const aWeekAgo = new Date();
    aWeekAgo.setDate(today.getDate() - 7);
    expect(selectBox).toHaveTextContent(
      `${dateFormatter(aWeekAgo, "numeric")} ~ ${dateFormatter(today, "numeric")}`,
    );

    // 3개월 전 버튼 선택
    await userEvent.click(canvas.getByText("최근 3개월"));
    const threeMonthAgo = new Date();
    threeMonthAgo.setMonth(today.getMonth() - 3);
    expect(selectBox).toHaveTextContent(
      `${dateFormatter(threeMonthAgo, "numeric")} ~ ${dateFormatter(today, "numeric")}`,
    );
  },
};

export const TestPickFutureDate: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const selectBox = canvas.getByTestId("open-button");
    await userEvent.click(selectBox);

    // 미래 날짜 선택 금지
    const dateList = canvas.getAllByRole("listitem");
    const today = new Date();
    const tomorrow = dateList.find((date) => {
      const button = within(date).getByRole("button");
      return (
        button.textContent === `${today.getDate() + 1}` &&
        button.hasAttribute("disabled")
      );
    });
    expect(tomorrow).toBeInTheDocument();
  },
};

export const TestPickPastDate: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const selectBox = canvas.getByTestId("open-button");
    await userEvent.click(selectBox);

    const dateList = canvas.getAllByRole("listitem");

    // 끝 날짜는 시작 날짜 이전의 날짜를 선택 금지
    await userEvent.click(canvas.getByAltText("month-left"));
    await userEvent.click(canvas.getByText("11"));

    expect(
      canvas.getByText("11").parentNode?.previousSibling?.lastChild,
    ).toBeDisabled();
  },
};
