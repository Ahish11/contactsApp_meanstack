import { Meta, StoryObj } from '@storybook/angular';
import { InputFieldComponent } from './input-field.component';

export default {
  title: 'Input Field',
  component: InputFieldComponent,
} as Meta;

type cc = StoryObj<InputFieldComponent>;

export const Default: cc = {
  args: {
    // You can add default props for ContactListComponent here if needed
  },
};
