import { Meta, StoryObj } from '@storybook/angular';
import { NotificationComponent } from './notification.component';

export default {
  title: 'Notification',
  component: NotificationComponent,
} as Meta;

type cc = StoryObj<NotificationComponent>;

export const Default: cc = {
  args: {
    // You can add default props for ContactListComponent here if needed
  },
};
