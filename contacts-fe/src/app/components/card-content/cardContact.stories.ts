import { Meta, StoryObj } from '@storybook/angular';
import { CardContentComponent } from './card-content.component';


export default {
  title: 'Card Contact',
  component: CardContentComponent,
} as Meta;

type cc = StoryObj<CardContentComponent>;

export const Default: cc = {
  args: {
    // You can add default props for ContactListComponent here if needed
  },
};
