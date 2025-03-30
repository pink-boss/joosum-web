import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, waitFor, within } from "@storybook/test";

import DatePicker from "@/app/link-book/[title]/date-picker";
import { dateFormatter } from "@/utils/date";
import meta from "../DatePicker.stories";

const testMeta = {
  ...meta,
  title: "Page/FolderList/DatePicker",
} satisfies Meta<typeof DatePicker>;

export default testMeta;
type Story = StoryObj<typeof testMeta>;

export const TestPickDate: Story = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const selectBox = canvas.getByTestId("open-button");
    await userEvent.click(selectBox);

    const today = new Date();

    await step("이전 달 선택", async () => {
      await userEvent.click(canvas.getByAltText("month-left"));
      await waitFor(async () => {
        expect(
          canvas.getByText(`${today.getFullYear()}년 ${today.getMonth()}월`),
        );
      });
    });

    await step("27 ~ 다음 달 1일 선택", async () => {
      const start = "11";
      const end = "19";
      await waitFor(async () => {
        await userEvent.click(canvas.getByText(start));
      });
      await userEvent.click(canvas.getByText(end));
      const prevMonth = new Date();
      prevMonth.setMonth(today.getMonth() - 1);
      const year = prevMonth.getFullYear();
      const month = `${prevMonth.getMonth()}`.padStart(2, "0");
      await waitFor(async () => {
        expect(selectBox).toHaveTextContent(
          `${year}. ${month}. ${start} ~ ${year}. ${month}. ${end}`,
        );
      });
    });

    await step("초기화 버튼 선택", async () => {
      await userEvent.click(canvas.getByText("초기화"));
      expect(selectBox.textContent).toBe("");
    });

    await step("전 주 버튼 선택", async () => {
      await userEvent.click(canvas.getByText("최근 1주"));
      const aWeekAgo = new Date();
      aWeekAgo.setDate(today.getDate() - 7);
      await waitFor(async () => {
        expect(selectBox).toHaveTextContent(
          `${dateFormatter(aWeekAgo, "numeric")} ~ ${dateFormatter(today, "numeric")}`,
        );
      });
    });

    await step("3개월 전 버튼 선택", async () => {
      await userEvent.click(canvas.getByText("최근 3개월"));
      const threeMonthAgo = new Date();
      threeMonthAgo.setMonth(today.getMonth() - 3);
      await waitFor(async () => {
        expect(selectBox).toHaveTextContent(
          `${dateFormatter(threeMonthAgo, "numeric")} ~ ${dateFormatter(today, "numeric")}`,
        );
      });
    });
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
    await waitFor(async () => {
      expect(tomorrow).toBeInTheDocument();
    });
  },
};

export const TestPickPastDate: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const selectBox = canvas.getByTestId("open-button");
    await userEvent.click(selectBox);

    // 끝 날짜는 시작 날짜 이전의 날짜를 선택 금지
    await userEvent.click(canvas.getByAltText("month-left"));
    await userEvent.click(canvas.getByText("11"));
    await waitFor(async () => {
      expect(
        canvas.getByText("11").parentNode?.previousSibling?.lastChild,
      ).toBeDisabled();
    });
  },
};
