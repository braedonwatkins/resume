<script lang="ts">
	type Node = {
		id: string;
		x: number;
		y: number;
	};

	type Edge = {
		source: string;
		target: string;
	};

	type RankedNode = {
		id: string;
		count: number;
	};

	const numLeftNodes = 15;
	const numMiddleNodes = 25;
	const numRightNodes = 20;
	const numEdges = 100;

	function generateNodes(prefix: string, count: number): string[] {
		return Array.from({ length: count }, (_, i) => `${prefix}${i + 1}`);
	}

	export let leftNodes: string[] = generateNodes('L', numLeftNodes);
	export let middleNodes: string[] = generateNodes('M', numMiddleNodes);
	export let rightNodes: string[] = generateNodes('R', numRightNodes);

	function generateRandomEdges(count: number): Edge[] {
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
	}

	export let edges: Edge[] = generateRandomEdges(numEdges);

	const width = 600;
	const height = 400;
	const nodeRadius = 5;
	const leftX = 10;
	const middleX = 300;
	const rightX = 590;

	let selectedMiddleNodes = new Set<string>();
	let rankedRightNodes: RankedNode[] = [];
	let searchTerm = '';
	let zoomLevel = 1;

	$: filteredMiddleNodes = searchTerm
		? middleNodes.filter((node) => node.toLowerCase().includes(searchTerm.toLowerCase()))
		: middleNodes;

	$: allNodes = [
		...leftNodes.map((id, index) => ({
			id,
			x: leftX,
			y: (index + 1) * (height / (leftNodes.length + 1))
		})),
		...filteredMiddleNodes.map((id, index) => ({
			id,
			x: middleX,
			y: (index + 1) * (height / (middleNodes.length + 1))
		})),
		...rightNodes.map((id, index) => ({
			id,
			x: rightX,
			y: (index + 1) * (height / (rightNodes.length + 1))
		}))
	];

	function getNodeColor(node: Node): string {
		if (node.x === leftX) return 'lightblue';
		if (node.x === middleX) return 'lightgreen';
		return 'lightpink';
	}

	function toggleMiddleNode(nodeId: string) {
		const set = new Set<string>(selectedMiddleNodes);
		if (set.has(nodeId)) {
			set.delete(nodeId);
		} else {
			set.add(nodeId);
		}
		selectedMiddleNodes = set;

		updateRankedRightNodes();
	}

	function updateRankedRightNodes() {
		const rightNodeCounts = new Map<string, number>();

		edges.forEach((edge) => {
			if (selectedMiddleNodes.has(edge.source)) {
				const rightNode = rightNodes.find((node) => node === edge.target);
				if (rightNode) {
					rightNodeCounts.set(rightNode, (rightNodeCounts.get(rightNode) || 0) + 1);
				}
			}
		});

		const ranked: RankedNode[] = Array.from(rightNodeCounts.entries())
			.map(([id, count]) => ({ id, count }))
			.sort((a, b) => b.count - a.count);

		rankedRightNodes = ranked;
	}

	function handleZoom(event: WheelEvent) {
		event.preventDefault();
		zoomLevel += event.deltaY * -0.001;
		zoomLevel = Math.min(Math.max(0.1, zoomLevel), 10);
	}

	function handleNodeKeydown(event: KeyboardEvent, nodeId: string) {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			toggleMiddleNode(nodeId);
		}
	}
</script>

<div class="controls">
	<input bind:value={searchTerm} placeholder="Search middle nodes..." />
	<p>Zoom: {zoomLevel.toFixed(2)}x</p>
</div>

<div class="graph-container" on:wheel={handleZoom}>
	<svg {width} {height} viewBox="0 0 {width} {height}" style="transform: scale({zoomLevel});">
		{#each edges as edge}
			{@const source = allNodes.find((node) => node.id === edge.source)}
			{@const target = allNodes.find((node) => node.id === edge.target)}
			{#if source && target}
				<line
					x1={source.x}
					y1={source.y}
					x2={target.x}
					y2={target.y}
					stroke={selectedMiddleNodes.has(source.id) || selectedMiddleNodes.has(target.id)
						? 'red'
						: '#ccc'}
					stroke-width="0.5"
				/>
			{/if}
		{/each}

		{#each allNodes as node}
			<g
				role="button"
				tabindex={node.x === middleX ? 0 : 1}
				aria-pressed={selectedMiddleNodes.has(node.id)}
				on:click={() => node.x === middleX && toggleMiddleNode(node.id)}
				on:keydown={(event) => node.x === middleX && handleNodeKeydown(event, node.id)}
			>
				<circle
					cx={node.x}
					cy={node.y}
					r={nodeRadius}
					fill={getNodeColor(node)}
					stroke={selectedMiddleNodes.has(node.id) || rankedRightNodes[0]?.id === node.id
						? 'red'
						: 'none'}
					stroke-width="1"
				/>
				<text x={node.x} y={node.y + nodeRadius + 10} font-size="8" text-anchor="middle"
					>{node.id}</text
				>
			</g>
		{/each}
	</svg>
</div>

<div class="info">
	<h3>Selected middle nodes:</h3>
	<div class="selected-nodes">
		{#each [...selectedMiddleNodes] as nodeId}
			<span class="node-tag">{nodeId}</span>
		{/each}
	</div>
	<h3>Ranked Right Nodes (Top 10):</h3>
	<ol>
		{#each rankedRightNodes.slice(0, 10) as node}
			<li>{node.id} (Count: {node.count})</li>
		{/each}
	</ol>
</div>

<style>
	.graph-container {
		border: 1px solid #ccc;
		display: inline-block;
		overflow: hidden;
	}
	svg {
		display: block;
	}
	.info {
		margin-top: 10px;
	}
	.controls {
		margin-bottom: 10px;
	}
	.selected-nodes {
		display: flex;
		flex-wrap: wrap;
		gap: 5px;
	}
	.node-tag {
		background-color: #e0e0e0;
		padding: 2px 5px;
		border-radius: 3px;
	}
</style>
