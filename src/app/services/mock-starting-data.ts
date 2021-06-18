import { Idea } from './ideas.service';

export const MOCK_DATA: Idea[] = [
  {
    title: 'Idea one',
    description: 'lorem ipsum',
    tags: [{ label: 'Awesome', value: true }],
    date: new Date(),
  },
  {
    title: 'Idea two',
    description: 'lorem ipsum',
    tags: [{ label: 'In progess', value: true }],
    date: new Date(),
  },
  {
    title: 'Idea three',
    description: 'lorem ipsum',
    tags: [{ label: 'Approved', value: true }],
    date: new Date(),
  },
  {
    title: 'Idea four',
    description: 'lorem ipsum',
    tags: [],
    date: new Date(),
  },
];
