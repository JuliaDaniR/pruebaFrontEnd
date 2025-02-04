export const revertDate = (date: string): string => {
	const newDate = date.split('-').reverse().join('-');
	return newDate;
};
