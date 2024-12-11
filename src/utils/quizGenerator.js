import { Configuration, OpenAIApi } from 'openai';

const openai = new OpenAIApi(
  new Configuration({
    apiKey: 'YOUR_OPENAI_API_KEY',
  })
);

const generateQuizQuestions = async (matchData) => {
  try {
    const teamNames = matchData.map(
      (game) => `${game.HomeTeam} vs ${game.AwayTeam}`
    );
    const prompt = `
      Generate a quiz for the following NBA matches. The quiz should have questions about players, recent performances, and team stats. 
      Matches: ${teamNames.join(', ')}
      
      Example Questions:
      - Who scored the highest points in the game between [HomeTeam] and [AwayTeam]?
      - What is the winning percentage of [HomeTeam] in their last 5 games?
    `;

    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt,
      max_tokens: 1000,
      temperature: 0.7,
    });

    return response.data.choices[0].text.split('\n').filter(Boolean); // Split questions into an array
  } catch (error) {
    console.error('Error generating quiz:', error);
    return [];
  }
};
