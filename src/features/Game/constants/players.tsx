import { faker } from '@faker-js/faker';

// Utility function to generate random points
const generateRandomPoints = () => Math.floor(Math.random() * 5000);

// Utility function to generate random country
const generateRandomCountry = () => {
  const countries = ['United States', 'Mexico', 'Argentina', 'England', 'Canada', 'Australia', 'Germany', 'France', 'Japan', 'India'];
  return countries[Math.floor(Math.random() * countries.length)];
};

// Generate random players
export const generateRandomPlayers = (numPlayers: number) => {
  const players = [];
  for (let i = 0; i < numPlayers; i++) {
    players.push({
      profileImage: `/images/profiles/demo-profile-${i + 1}.png`,
      handle: faker.person.fullName(),
      points: generateRandomPoints(),
      country: generateRandomCountry(),
    });
  }
  return players;
};

// Generate 5 random players
export const players = generateRandomPlayers(5);