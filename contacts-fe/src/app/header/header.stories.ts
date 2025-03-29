import { Meta, StoryObj } from '@storybook/angular';
import { HeaderComponent } from './header.component';

export default {
  title: 'Header',
  component: HeaderComponent,
} as Meta;

type cc = StoryObj<HeaderComponent>;

export const Default: cc = {
  args: {
    // You can add default props for ContactListComponent here if needed
  },
};
