import { Meta, StoryObj } from '@storybook/angular';
import { SideNavComponent } from './side-nav.component';

export default {
  title: 'Side Navbar',
  component: SideNavComponent,
} as Meta;

type cc = StoryObj<SideNavComponent>;

export const Default: cc = {
  args: {
    // You can add default props for ContactListComponent here if needed
  },
};
