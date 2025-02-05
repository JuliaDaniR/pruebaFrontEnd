export const revertDate = (date: string | undefined): string | undefined => {
	const newDate = date?.split('-').reverse().join('-');
	return newDate;
};
