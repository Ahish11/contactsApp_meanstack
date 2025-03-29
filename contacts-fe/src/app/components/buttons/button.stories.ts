import { Meta, StoryObj } from '@storybook/angular';
import { ButtonsComponent } from './buttons.component';

export default {
  title: 'Buttons',
  component: ButtonsComponent,

  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'success', 'danger'],
    },
    backgroundColor: { control: 'color' },
    textColor: { control: 'color' },
    borderRadius: { control: 'text' }, // Example: "10px"
    padding: { control: 'text' }, // Example: "10px 20px"
  },
} as Meta;

type cc = StoryObj<ButtonsComponent>;

export const Primary: cc = {
  args: {
    padding: '',
    borderRadius: '50',
    backgroundColor: '#060606',
    textColor: '#ffffff',
    label: 'Primary',
  },

  argTypes: {
    variant: {
      control: { type: 'select' }, // ✅ Correctly structured control
      options: ['default', 'primary', 'secondary', 'success', 'danger'], // ✅ Ensures only allowed values
    },
    backgroundColor: { control: 'color' },
    textColor: { control: 'color' },
    borderRadius: { control: { type: 'text' } }, // ✅ Corrected to be an object
    padding: { control: { type: 'text' } }, // ✅ Corrected to be an object
  },
};
export const Secondary: cc = {
  args: {
    // You can add default props for ContactListComponent here if needed
  },
};
export const Tertiary: cc = {
  args: {
    // You can add default props for ContactListComponent here if needed
  },
};
export const Error: cc = {
  args: {
    // You can add default props for ContactListComponent here if needed
  },
};
export const Link: cc = {
  args: {
    // You can add default props for ContactListComponent here if needed
  },
};
// export const Outline: cc = {
//   args: {
//     // You can add default props for ContactListComponent here if needed
//   },
// };
// export const danger: cc = {
//   args: {
//     // You can add default props for ContactListComponent here if needed
//   },
// };

//

// import { Meta, StoryObj } from '@storybook/angular';
// import { ButtonsComponent } from './buttons.component';

// export default {
//   title: 'Components/Buttons',
//   component: ButtonsComponent,
//   argTypes: {
//     onClick: { action: 'clicked' },
//     variant: {
//       control: 'select',
//       options: [
//         'default',
//         'primary-outline',
//         'secondary',
//         'success',
//         'disabled',
//         'outline',
//         'danger',
//       ],
//     },
//     label: { control: 'text' },
//   },
// } as Meta<ButtonsComponent>;

// type Story = StoryObj<ButtonsComponent>;

// export const Default: Story = {
//   args: {
//     variant: 'default',
//     label: 'Default Button',
//   },
// };

// export const PrimaryOutline: Story = {
//   args: {
//     variant: 'primary-outline',
//     label: 'Primary Outline',
//   },
// };

// export const Secondary: Story = {
//   args: {
//     variant: 'secondary',
//     label: 'Secondary Button',
//   },
// };

// export const Success: Story = {
//   args: {
//     variant: 'success',
//     label: 'Success Button',
//   },
// };

// export const Disabled: Story = {
//   args: {
//     variant: 'disabled',
//     label: 'Disabled Button',
//   },
// };

// export const Outline: Story = {
//   args: {
//     variant: 'outline',
//     label: 'Outline Button',
//   },
// };

// export const Danger: Story = {
//   args: {
//     variant: 'danger',
//     label: 'Danger Button',
//   },
// };
// // export const ClickableButton: Story = {
// //   args: {
// //     label: 'Click Me',
// //     onClick: () => {
// //       console.log('Button clicked inside Storybook!');
// //     },
// //   },
// // };
