import { Meta, StoryObj } from '@storybook/angular';
import { FormComponent } from './form.component';

export default {
  title: 'Form',
  component: FormComponent,
} as Meta;

type cc = StoryObj<FormComponent>;

export const Default: cc = {
  args: {
    // You can add default props for ContactListComponent here if needed
  },
};
