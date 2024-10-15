import type { Edge } from './Edge';

const generateRandomEdges = (
	count: number,
	leftNodes: string[],
	middleNodes: string[],
	rightNodes: string[]
): Edge[] => {
	const edges: Edge[] = [];
	for (let i = 0; i < count; i++) {
		const isLeft = Math.random() < 0.5;
		if (isLeft) {
			edges.push({
				source: leftNodes[Math.floor(Math.random() * leftNodes.length)],
				target: middleNodes[Math.floor(Math.random() * middleNodes.length)]
			});
		} else {
			edges.push({
				source: middleNodes[Math.floor(Math.random() * middleNodes.length)],
				target: rightNodes[Math.floor(Math.random() * rightNodes.length)]
			});
		}
	}
	return edges;
};

export default generateRandomEdges;
