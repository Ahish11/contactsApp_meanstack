import { Meta, StoryObj } from '@storybook/angular';
import { CardComponent } from './card.component';

export default {
  title: 'Cards',
  component: CardComponent,
} as Meta;

type cc = StoryObj<CardComponent>;

export const Default: cc = {
  args: {
    // You can add default props for ContactListComponent here if needed
  },
};
