import React, { useState } from 'react'
import './Quiz.css'
import QuizCore from '../core/QuizCore';
// Hint: Take advantage of the QuizQuestion interface

const quizCore = new QuizCore(); // Create a single instance of QuizCore

const Quiz: React.FC = () => {
  // TODO: Task1 - Seprate the logic of quiz from the UI.
  // Hint: Take advantage of QuizCore to manage quiz state separately from the UI.
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);

  const handleOptionSelect = (option: string): void => {
    setSelectedAnswer(option);
    quizCore.answerQuestion(option); // Record answer in QuizCore
  }


  const handleButtonClick = (): void => {
    // TODO: Task3 - Implement the logic for button click ("Next Question" and "Submit").
    // Hint: You might want to check for a function in the core logic to help with this.
    if (quizCore.hasNextQuestion()) {
      quizCore.nextQuestion();
      setSelectedAnswer(null); // Clear selected answer for new question
    } else {
        setIsQuizCompleted(true);
    }
  } 

  if (isQuizCompleted) {
    return (
      <div>
        <h2>Quiz Completed</h2>
        <p>Final Score: {quizCore.getScore()} out of {quizCore.getTotalQuestions()}</p>
      </div>
    );
  }

  const currentQuestion = quizCore.getCurrentQuestion();

  return (
    <div>
      <h2>Quiz Question:</h2>
      <p>{currentQuestion?.question}</p>
    
      <h3>Answer Options:</h3>
      <ul>
        {currentQuestion?.options.map((option) => (
          <li
            key={option}
            onClick={() => handleOptionSelect(option)}
            className={selectedAnswer === option ? 'selected' : ''}
          >
            {option}
          </li>
        ))}
      </ul>

      <button onClick={handleButtonClick}>Next Question</button>
    </div>
  );
};

export default Quiz;