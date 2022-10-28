export type QuestionsState = {
	category: string;
	correct_answer: string;
	difficulty: string;
	incorrect_answers: string[];
	question: string;
	type: string;
	answers: string[];
};

export const fetchQuestions = async (): Promise<QuestionsState[]> => {
	const endpoint = `https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple`;
	const data = await (await fetch(endpoint)).json();
	return data.results.map((question: QuestionsState) => ({
		...question,
		answers: [...question.incorrect_answers, question.correct_answer],
	}));
};

// export const fetchQuestions = async (): Promise<QuestionState[]> => {
// 	const url = `https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple`;
// 	const data = await (await fetch(url)).json();
// 	return data.results.map((question: Question) => ({
// 		...question,
// 		answers: shuffle([...question.incorrect_answers, question.correct_answer]),
// 	}));
// };
