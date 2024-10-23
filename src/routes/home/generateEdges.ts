import type { Edge } from './Edge';

const generateRandomEdges = (
	count: number,
	jobNodes: string[],
	skillNodes: string[],
	bulletNodes: string[],
	projectNodes: string[]
): Edge[] => {
	const nodeGroups = [
		[jobNodes, skillNodes],
		[skillNodes, bulletNodes],
		[bulletNodes, projectNodes]
	];

	return Array.from({ length: count }, () => {
		const [sourceNodes, targetNodes] = nodeGroups[Math.floor(Math.random() * 3)];

		return {
			source: sourceNodes[Math.floor(Math.random() * sourceNodes.length)],
			target: targetNodes[Math.floor(Math.random() * targetNodes.length)]
		};
	});
};

export default generateRandomEdges;
