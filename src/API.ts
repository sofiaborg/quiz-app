import { shuffle } from "./utils";

export interface Question {
	category: string;
	correct_answer: string;
	difficulty: string;
	incorrect_answers: string[];
	question: string;
	type: string;
}

export type QuestionState = Question & { answers: string[] };

export const fetchQuestions = async () => {
	const url = `https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple`;
	const data = await (await fetch(url)).json();
	return data.results.map((question: Question) => ({
		...question,
		answers: shuffle([...question.incorrect_answers, question.correct_answer]),
	}));
};
