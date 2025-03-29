import { Meta, StoryObj } from '@storybook/angular';
import { ContactListComponent } from '../contact-list/contact-list.component';

export default {
  title: 'Modals',
  component: ContactListComponent,
} as Meta;

type cc = StoryObj<ContactListComponent>;

export const Default: cc = {
  args: {
    // You can add default props for ContactListComponent here if needed
  },
};
