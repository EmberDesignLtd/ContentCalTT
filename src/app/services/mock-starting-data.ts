import { Idea } from './ideas.service';

export const MOCK_DATA: Idea[] = [
  {
    title: 'Idea one',
    description: 'lorem ipsum',
    tags: ['Awesome'],
    date: new Date(),
  },
  {
    title: 'Idea two',
    description: 'lorem ipsum',
    tags: ['In progress'],
    date: new Date(),
  },
  {
    title: 'Idea three',
    description: 'lorem ipsum',
    tags: ['Approved'],
    date: new Date(),
  },
  {
    title: 'Idea four',
    description: 'lorem ipsum',
    tags: [],
    date: new Date(),
  },
];
