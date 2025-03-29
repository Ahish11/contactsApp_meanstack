import { Meta, StoryObj } from '@storybook/angular';
import { DatatableComponent } from './datatable.component';

export default {
  title: 'Data Table',
  component: DatatableComponent,
} as Meta;

type cc = StoryObj<DatatableComponent>;

export const Default: cc = {
  args: {
    // You can add default props for ContactListComponent here if needed
  },
};
