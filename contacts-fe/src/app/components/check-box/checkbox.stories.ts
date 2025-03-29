import { Meta, StoryObj } from '@storybook/angular';
import { CheckBoxComponent } from './check-box.component';



export default {
  title: 'Check Box',
  component: CheckBoxComponent,
} as Meta;

type cc = StoryObj<CheckBoxComponent>;

export const Default: cc = {
  args: {
    // You can add default props for ContactListComponent here if needed
  },
};
