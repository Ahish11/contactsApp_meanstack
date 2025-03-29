import { Meta, StoryObj } from '@storybook/angular';
import { FilterComponent } from './filter.component';

export default {
  title: 'Filter',
  component: FilterComponent,
} as Meta;

type cc = StoryObj<FilterComponent>;

export const Default: cc = {
  args: {
    // You can add default props for ContactListComponent here if needed
  },
};
