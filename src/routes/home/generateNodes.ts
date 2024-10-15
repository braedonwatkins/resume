const generateNodes = (prefix: string, count: number): string[] => {
	return Array.from({ length: count }, (_, i) => `${prefix}${i + 1}`);
};

export default generateNodes;
