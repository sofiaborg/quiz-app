import React from "react";
import { AnswerObject } from "../App";

type QuestionCardProps = {
	question: string;
	answers: string[];
	callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
	usersAnswer: any;
	questionNr: number;
	totalQuestions: number;
};

export const QuestionCard = (props: QuestionCardProps) => {
	return (
		<>
			<p>
				Question {props.questionNr} of {props.totalQuestions}
			</p>
			<p dangerouslySetInnerHTML={{ __html: props.question }} />
			<div>
				{props.answers?.map((answer) => (
					<div key={answer}>
						<button
							disabled={props.usersAnswer ? true : false}
							value={answer}
							onClick={props.callback}
						>
							<span dangerouslySetInnerHTML={{ __html: answer }}></span>
						</button>
					</div>
				))}
			</div>
		</>
	);
};
