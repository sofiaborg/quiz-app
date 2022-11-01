import React from "react";
import { useState } from "react";
import { QuestionCard } from "./components/QuestionCard";
import { fetchQuestions, QuestionsState } from "./API";
import { StyledBasic } from "./styled-components/App.styles";

const TOTAL_QUESTIONS = 10;

export interface AnswerObject {
	question: string;
	answer: string;
	correct: boolean;
	correctAnswer: string;
}

export const App = () => {
	const [loading, setLoading] = useState(false);
	const [questions, setQuestions] = useState<QuestionsState[]>([]);
	const [number, setNumber] = useState(0);
	const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
	const [score, setScore] = useState(0);
	const [gameOver, setGameOver] = useState(true);
	const [showNextBtn, setShowNextBtn] = useState(false);

	console.log(fetchQuestions());
	console.log(userAnswers);

	const startQuiz = async () => {
		setLoading(true);
		setGameOver(false);

		const newQuestions = await fetchQuestions();
		setQuestions(newQuestions);
		setScore(0);
		setUserAnswers([]);
		setNumber(0);

		setLoading(false);
		setShowNextBtn(true);
	};

	const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
		if (!gameOver) {
			//answer from user
			const answer = e.currentTarget.value;
			//correct answer
			const correct = questions[number].correct_answer === answer;
			//add point if answer is correct
			if (correct) {
				setScore((prevScore) => prevScore + 1);
			}
			//create object to save answer in userAnswers-state
			const answerObject = {
				question: questions[number].question,
				answer,
				correct,
				correctAnswer: questions[number].correct_answer,
			};
			setUserAnswers((prevAnswer) => [...prevAnswer, answerObject]);
		}
	};

	const nextQuestion = () => {
		//go to next if not on last question
		const nextQuestion = number + 1;
		if (nextQuestion === TOTAL_QUESTIONS) {
			setGameOver(true);
		} else {
			setNumber(nextQuestion);
		}
	};

	return (
		<>
			<h1>QUIZ</h1>
			{gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
				<button className="start" onClick={startQuiz}>
					start
				</button>
			) : null}
			{!gameOver ? <p className="score">{score}</p> : null}
			{loading ? <p>loading questions...</p> : null}
			{!loading && !gameOver && (
				<QuestionCard
					questionNr={number + 1}
					totalQuestions={TOTAL_QUESTIONS}
					question={questions[number].question}
					answers={questions[number].answers}
					usersAnswer={userAnswers ? userAnswers[number] : undefined}
					callback={checkAnswer}
				/>
			)}

			{showNextBtn ? (
				<button className="next" onClick={nextQuestion}>
					next question
				</button>
			) : null}
		</>
	);
};
