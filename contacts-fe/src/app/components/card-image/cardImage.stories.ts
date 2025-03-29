import { Meta, StoryObj } from '@storybook/angular';
import { CardImageComponent } from './card-image.component';

export default {
  title: 'Card Image',
  component: CardImageComponent,
} as Meta;

type cc = StoryObj<CardImageComponent>;

export const Default: cc = {
  args: {
    // You can add default props for ContactListComponent here if needed
  },
};
