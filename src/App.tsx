import React from "react";
import { useState } from "react";
import { QuestionCard } from "./components/QuestionCard";
import { fetchQuestions, QuestionState } from "./API";

const TOTAL_QUESTIONS = 10;

interface AnswerObject {
	question: string;
	answer: string;
	correct: boolean;
	correctAnswer: string;
}

export const App = () => {
	const [loading, setLoading] = useState(false);
	const [questions, setQuestions] = useState<QuestionState[]>([]);
	const [number, setNumber] = useState(0);
	const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
	const [score, setScore] = useState(0);
	const [gameOver, setGameOver] = useState(true);

	console.log(questions);

	const startQuiz = async () => {
		setLoading(true);
		setGameOver(false);

		const newQuestions = await fetchQuestions();
		setQuestions(newQuestions);
		setScore(0);
		setUserAnswers([]);
		setNumber(0);

		setLoading(false);
	};

	const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {};

	const nextQuestion = () => {};

	return (
		<>
			<h1>QUIZ</h1>
			<button className="start" onClick={startQuiz}>
				start
			</button>
			<p className="score">score</p>
			<p>loading questions...</p>
			<button className="next" onClick={nextQuestion}>
				next question
			</button>{" "}
		</>
	);
};
