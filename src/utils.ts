//function for randomizing answers
export const shuffle = (array: any[]) => {
	[...array].sort(() => Math.random() - 0.5);
};
