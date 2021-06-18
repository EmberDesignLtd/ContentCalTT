import { Idea } from './ideas.service';

export const MOCK_DATA: Idea[] = [
  {
    title: 'Idea one',
    description: 'lorem ipsum',
    tags: [
      { label: 'Awesome', value: true },
      { label: 'In Progress', value: false },
      { label: 'Approved', value: false },
    ],
    date: new Date(),
  },
  {
    title: 'Idea two',
    description: 'lorem ipsum',
    tags: [
      { label: 'Awesome', value: true },
      { label: 'In Progress', value: true },
      { label: 'Approved', value: false },
    ],
    date: new Date(),
  },
  {
    title: 'Idea three',
    description: 'lorem ipsum',
    tags: [
      { label: 'Awesome', value: true },
      { label: 'In Progress', value: false },
      { label: 'Approved', value: true },
    ],
    date: new Date(),
  },
  {
    title: 'Idea four',
    description: 'lorem ipsum',
    tags: [
      { label: 'Awesome', value: false },
      { label: 'In Progress', value: false },
      { label: 'Approved', value: false },
    ],
    date: new Date(),
  },
];
