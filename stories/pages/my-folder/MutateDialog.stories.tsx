import type { Meta, StoryObj } from "@storybook/react";
import CreateButton from "@/app/my-folder/CreateDialogOpenButton";
import MutateDialog from "@/app/my-folder/mutate/MutateDialog";

const meta = {
  title: "Page/MyFolder/MutateDialog",
  component: CreateButton,
  decorators: (Story) => (
    <>
      <Story />
      <MutateDialog />
    </>
  ),
} satisfies Meta<typeof CreateButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
