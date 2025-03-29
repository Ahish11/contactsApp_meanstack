import { Meta, StoryObj } from '@storybook/angular';
import { BreadcrumbsComponent } from './breadcrumbs.component';

export default {
  title: 'Breadcrumbs',
  component: BreadcrumbsComponent,
} as Meta;

type cc = StoryObj<BreadcrumbsComponent>;

export const Default: cc = {
  args: {
    // You can add default props for ContactListComponent here if needed
  },
};
