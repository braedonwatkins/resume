<script lang="ts">
	import type { Edge } from './Edge';
	import type { Node } from './Node';
	import type { RankedNode } from './RankedNode';
	import generateRandomEdges from './generateEdges';
	import generateNodes from './generateNodes';

	//TODO: replace random node and edge generation with an upload / interactive node creator
	export let leftNodes: string[] = generateNodes('L', 15);
	export let middleNodes: string[] = generateNodes('M', 25);
	export let rightNodes: string[] = generateNodes('R', 20);
	export let edges: Edge[] = generateRandomEdges(100, leftNodes, middleNodes, rightNodes);

	const width = 600;
	const height = 400;
	const nodeRadius = 5;
	const leftX = 10;
	const middleX = 280;
	const rightX = 525;

	let selectedMiddleNodes = new Set<string>();
	let rankedRightNodes: RankedNode[] = [];
	let zoomLevel = 1;

	$: allNodes = [
		...leftNodes.map((id, index) => ({
			id,
			x: leftX,
			y: (index + 1) * (height / (leftNodes.length + 1))
		})),
		...middleNodes.map((id, index) => ({
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
		if (node.x == rightX) return 'lightpink';
		return 'black'; // NOTE: using black nodes as a debug tool to say something has gone wrong
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

	// NOTE: GRAPH EVENTS BELOW
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

	function handleDropdownSelect(event: Event) {
		const { options } = event.target as HTMLSelectElement;
		const selectedValues = Array.from(options)
			.filter((option) => option.selected)
			.map((option) => option.value);

		console.log('Selected values changed:', selectedValues);

		selectedMiddleNodes.clear();
		for (const value of selectedValues) {
			toggleMiddleNode(value);
		}
	}
</script>

<div class="flex-col flex-[2_1_0%] items-center justify-center gap-1">
	<div class="flex gap-10 justify-around">
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

		<div>
			I am a <select on:change={handleDropdownSelect} multiple>
				<option value="" disabled>Full-Stack Developer</option>
				{#each middleNodes as node}
					<option value={node}>{node}</option>
				{/each}
			</select>
			building the future with <select></select>
		</div>
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
