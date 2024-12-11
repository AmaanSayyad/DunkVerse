import React, { useEffect, useState } from 'react';
import { fetchNBAMatchData, generateQuizQuestions } from './quiz-utils'; // Import functions

const QuizGenerator = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const generateQuiz = async () => {
      const matchData = await fetchNBAMatchData(); // Step 1
      const quizQuestions = await generateQuizQuestions(matchData); // Step 2
      setQuestions(quizQuestions);
    };

    generateQuiz();
  }, []);

  return (
    <div>
      <h1>NBA Quiz</h1>
      <ul>
        {questions.map((question, index) => (
          <li key={index}>{question}</li>
        ))}
      </ul>
    </div>
  );
};

export default QuizGenerator;
