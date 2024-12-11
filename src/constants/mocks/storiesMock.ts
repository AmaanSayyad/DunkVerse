// Define the structure of story data
export interface Story {
  id: number;
  image: string;
  title: string;
  isActive: boolean;
  onClick: () => void;
}

// Mock data for stories
export const storyData: Story[] = [
  {
    id: 1,
    image: '/images/story4.png',
    title: 'New York',
    isActive: true,
    onClick: () => alert('Team B clicked'),
  },
  {
    id: 2,
    image: '/images/story2.png',
    title: 'Miami Heat',
    isActive: false,
    onClick: () => alert('Team A clicked'),
  },
  {
    id: 3,
    image: '/images/story3.png',
    title: 'Nets B',
    isActive: false,
    onClick: () => alert('Player 2 clicked'),
  },
  {
    id: 4,
    image: '/images/story1.png',
    title: 'Detroit',
    isActive: true,
    onClick: () => alert('Player 1 clicked'),
  },
];
