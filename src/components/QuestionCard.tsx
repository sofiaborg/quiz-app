import React from "react";

type QuestionCardProps = {
	question: string;
	answers: string[];
	callback: any;
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
			<p>{props.question}</p>
			<div>
				{props.answers.map((answer) => (
					<div>
						<button disabled={props.usersAnswer} onClick={props.callback}>
							<span>{props.answers}</span>
						</button>
					</div>
				))}
			</div>
		</>
	);
};
