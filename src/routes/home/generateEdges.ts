import type { Edge } from './Edge';

//TODO: do some runtime analysis. intuition says this smells like O(n!) which is SCARY
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

	const edgeSet = new Set<string>();

	while (edgeSet.size < count) {
		const [sourceNodes, targetNodes] = nodeGroups[Math.floor(Math.random() * 3)];
		const source = sourceNodes[Math.floor(Math.random() * sourceNodes.length)];
		const target = targetNodes[Math.floor(Math.random() * targetNodes.length)];

		const edgeString = JSON.stringify({ source, target });

		edgeSet.add(edgeString);
	}

	return Array.from(edgeSet).map((edgeString) => JSON.parse(edgeString));
};

export default generateRandomEdges;
