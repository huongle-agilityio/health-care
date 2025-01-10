import { IMAGES } from '../images';

export const bookingCardMock = {
  date: '12/12/2024',
  name: 'Caitlyn',
  time: '09:00',
  imageSrc: IMAGES.DENTIST,
};

export const cardMock = {
  name: 'John Doe',
  specialty: 'Dentist',
  experience: 5,
  rating: 4,
  imageSrc: IMAGES.DOCTOR,
  href: '/test',
};

export const ListCheckboxMock = [
  { value: 'option1', label: 'Option 1', isDisabled: false },
  { value: 'option2', label: 'Option 2', isDisabled: true },
  { value: 'option3', label: 'Option 3', isDisabled: false },
];
