import axios from 'axios';

const fetchNBAMatchData = async () => {
  const API_KEY = 'YOUR_SPORTS_API_KEY';
  const url = `https://api.sportsdata.io/v3/nba/scores/json/GamesByDate/{date}?key=${API_KEY}`; // Example URL
  const date = new Date().toISOString().split('T')[0]; // Today's date

  try {
    const response = await axios.get(url.replace('{date}', date));
    return response.data; // Returns match data for the day
  } catch (error) {
    console.error('Error fetching NBA data:', error);
    return [];
  }
};
