<script lang="ts">
	import type { Edge } from './Edge';
	import type { Node } from './Node';
	import type { RankedNode } from './RankedNode';
	import generateRandomEdges from './generateEdges';
	import generateNodes from './generateNodes';

	//TODO: replace random node and edge generation with an upload / interactive node creator
	export let jobNodes: string[] = generateNodes('J', 10);
	export let skillNodes: string[] = generateNodes('S', 12);
	export let bulletNodes: string[] = generateNodes('B', 17);
	export let projectNodes: string[] = generateNodes('P', 5);
	export let edges: Edge[] = generateRandomEdges(
		100,
		jobNodes,
		skillNodes,
		bulletNodes,
		projectNodes
	);

	const LAYOUT = {
		width: 500,
		height: 400,
		nodeRadius: 5,
		jobX: 10,
		skillX: 145,
		bulletX: 290,
		projectX: 400
	};

	let selectedJobNode = '';
	let selectedSkillNodes = new Set<string>();

	let rankedJobNodes: RankedNode[] = [];
	let rankedSkillNodes: RankedNode[] = [];
	let rankedBulletNodes: RankedNode[] = [];
	let rankedProjectNodes: RankedNode[] = [];
	let zoomLevel = 1;
	let isSelectOpen = false;

	$: allNodes = [
		...jobNodes.map((id, index) => ({
			id,
			x: LAYOUT.jobX,
			y: (index + 1) * (LAYOUT.height / (jobNodes.length + 1))
		})),
		...skillNodes.map((id, index) => ({
			id,
			x: LAYOUT.skillX,
			y: (index + 1) * (LAYOUT.height / (skillNodes.length + 1))
		})),
		...bulletNodes.map((id, index) => ({
			id,
			x: LAYOUT.bulletX,
			y: (index + 1) * (LAYOUT.height / (bulletNodes.length + 1))
		})),
		...projectNodes.map((id, index) => ({
			id,
			x: LAYOUT.projectX,
			y: (index + 1) * (LAYOUT.height / (projectNodes.length + 1))
		}))
	];

	function getNodeColor(node: Node): string {
		if (node.x === LAYOUT.jobX) return 'lightblue';
		if (node.x === LAYOUT.skillX) return 'lightgreen';
		if (node.x === LAYOUT.bulletX) return 'lightpink';
		if (node.x === LAYOUT.projectX) return 'mediumpurple';
		return 'black'; // NOTE: using black nodes as a debug tool to say something has gone wrong
	}

	/* 
        TODO: figure out if there's a way to consolidate these
        NOTE:
        - for updateRankedProjectNodes() the source is rankedBulletNodes of type RankedNode[]
        - for updateRankedJobNodes() the selectedSkillNodes Set<string> is the target, not the source
        - for updateRankedBulletNodes() the selectedSkillNodes Set<string> selectedSkillNodes is the source 
        - all have targets that are of type RankedNode[]
    */

	function updateRankedJobNodes() {
		const jobNodeCounts = new Map<string, number>();

		edges.forEach((edge) => {
			if (selectedSkillNodes.has(edge.target)) {
				const jobNode = jobNodes.find((node) => node === edge.source);
				if (jobNode) {
					jobNodeCounts.set(jobNode, (jobNodeCounts.get(jobNode) || 0) + 1);
				}
			}
		});

		const ranked: RankedNode[] = Array.from(jobNodeCounts.entries())
			.map(([id, count]) => ({ id, count }))
			.sort((a, b) => b.count - a.count);

		rankedJobNodes = ranked;
	}

	function updateRankedSkillNodes() {
		const skillNodeCounts = new Map<string, number>();

		edges.forEach((edge) => {
			if (selectedJobNode === edge.source) {
				const skillNode = skillNodes.find((node) => node === edge.target);
				if (skillNode) {
					skillNodeCounts.set(skillNode, (skillNodeCounts.get(skillNode) || 0) + 1);
				}
			}
		});

		const ranked: RankedNode[] = Array.from(skillNodeCounts.entries())
			.map(([id, count]) => ({ id, count }))
			.sort((a, b) => b.count - a.count);

		rankedSkillNodes = ranked;
	}

	function updateRankedBulletNodes() {
		const bulletNodeCounts = new Map<string, number>();

		edges.forEach((edge) => {
			if (selectedSkillNodes.has(edge.source)) {
				const bulletNode = bulletNodes.find((node) => node === edge.target);
				if (bulletNode) {
					bulletNodeCounts.set(bulletNode, (bulletNodeCounts.get(bulletNode) || 0) + 1);
				}
			}
		});

		const ranked: RankedNode[] = Array.from(bulletNodeCounts.entries())
			.map(([id, count]) => ({ id, count }))
			.sort((a, b) => b.count - a.count);

		rankedBulletNodes = ranked;

		// There's really no other case we want to trigger than when we update bullet ranks
		// feels a bit janky but that feels trueest
		updateRankedProjectNodes();
	}

	function updateRankedProjectNodes() {
		const projectNodeCounts = new Map<string, number>();

		edges.forEach((edge) => {
			const rankedBulletNode = rankedBulletNodes.find((node) => node.id === edge.source);
			if (!rankedBulletNode) return;

			const projectNode = projectNodes.find((node) => node === edge.target);
			if (!projectNode) return;

			projectNodeCounts.set(
				projectNode,
				(projectNodeCounts.get(projectNode) || 0) + rankedBulletNode.count
			);
		});

		const ranked: RankedNode[] = Array.from(projectNodeCounts.entries())
			.map(([id, count]) => ({ id, count }))
			.sort((a, b) => b.count - a.count);

		rankedProjectNodes = ranked;
	}

	function toggleJobNode(nodeId: string) {
		// reset our skill and bullet nodes
		selectedSkillNodes = new Set<string>();

		selectedJobNode =
			jobNodes.find((node) => {
				return node === nodeId;
			}) ?? '';

		//TODO: should this look more like toggleSkillNode? Look into this later...
		for (const edge of edges) {
			if (edge.source === selectedJobNode && !selectedSkillNodes.has(edge.target)) {
				selectedSkillNodes.add(edge.target);
				selectedSkillNodes = selectedSkillNodes; //TODO: figure out if this is the best way to cause re-renders in Svelte
			}
		}

		rankedJobNodes = [{ id: selectedJobNode, count: 1 }];
		updateRankedSkillNodes();
		updateRankedBulletNodes();
	}

	function toggleSkillNode(nodeId: string) {
		const set = new Set<string>(selectedSkillNodes);
		if (set.has(nodeId)) {
			set.delete(nodeId);
		} else {
			set.add(nodeId);
		}
		selectedSkillNodes = set;
		selectedJobNode = '';

		updateRankedJobNodes();
		updateRankedSkillNodes();
		updateRankedBulletNodes();
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
			toggleSkillNode(nodeId);
		}
	}

	//TODO: shouldn't this only select one? check later...
	function handleJobSelect(event: Event) {
		const { options } = event.target as HTMLSelectElement;
		const selectedValues = Array.from(options)
			.filter((option) => option.selected)
			.map((option) => option.value);

		console.log('Selected values changed:', selectedValues);

		for (const value of selectedValues) {
			toggleJobNode(value);
		}
	}

	function handleSkillSelect(event: Event) {
		const { options } = event.target as HTMLSelectElement;
		const selectedValues = Array.from(options)
			.filter((option) => option.selected)
			.map((option) => option.value);

		console.log('Selected values changed:', selectedValues);

		selectedSkillNodes.clear();
		for (const value of selectedValues) {
			toggleSkillNode(value);
		}
	}

	const handleSkillClick = (event: Event) => {
		event.preventDefault();
		if (!isSelectOpen) {
			isSelectOpen = true;
		}
	};
</script>

<div class="flex-col flex-[2_1_0%] items-center justify-center gap-1">
	<!-- Graph and Selects -->
	<div class="flex gap-10 justify-around">
		<div class="graph-container" on:wheel={handleZoom}>
			<svg
				width={LAYOUT.width}
				height={LAYOUT.height}
				viewBox="0 0 {LAYOUT.width} {LAYOUT.height}"
				style="transform: scale({zoomLevel});"
			>
				{#each edges as edge}
					{@const source = allNodes.find((node) => node.id === edge.source)}
					{@const target = allNodes.find((node) => node.id === edge.target)}
					{#if source && target}
						<line
							x1={source.x}
							y1={source.y}
							x2={target.x}
							y2={target.y}
							stroke={selectedSkillNodes.has(source.id) ||
							selectedSkillNodes.has(target.id) ||
							rankedBulletNodes.some((node) => node.id === source.id)
								? 'red'
								: '#ccc'}
							stroke-width="0.5"
						/>
					{/if}
				{/each}

				{#each allNodes as node}
					<g
						role="button"
						tabindex={node.x === LAYOUT.skillX ? 0 : 1}
						aria-pressed={selectedSkillNodes.has(node.id)}
						on:click={() => node.x === LAYOUT.skillX && toggleSkillNode(node.id)}
						on:keydown={(event) => node.x === LAYOUT.skillX && handleNodeKeydown(event, node.id)}
					>
						<circle
							cx={node.x}
							cy={node.y}
							r={LAYOUT.nodeRadius}
							fill={getNodeColor(node)}
							stroke={selectedJobNode === node.id ||
							selectedSkillNodes.has(node.id) ||
							rankedProjectNodes[0]?.id === node.id ||
							rankedBulletNodes[0]?.id === node.id ||
							rankedJobNodes[0]?.id === node.id
								? 'red'
								: 'none'}
							stroke-width="1"
						/>
						<text x={node.x} y={node.y + LAYOUT.nodeRadius + 10} font-size="8" text-anchor="middle"
							>{node.id}</text
						>
					</g>
				{/each}
			</svg>
		</div>

		<div>
			I am a <select on:change={handleJobSelect}>
				<option value="" selected>Full-Stack Developer</option>
				{#each jobNodes as node}
					<option value={node}>{node}</option>
				{/each}
			</select>
			building the future with
			<select
				on:click={handleSkillClick}
				on:change={handleSkillSelect}
				on:focus={() => (isSelectOpen = true)}
				on:blur={() => (isSelectOpen = false)}
				multiple
				size={isSelectOpen ? Math.min(skillNodes.length, 5) : 1}
			>
				<option value="" selected={selectedSkillNodes.size === 0} disabled={!isSelectOpen}
					>everything</option
				>
				{#each skillNodes as node}
					<option
						value={node}
						class:selected={selectedSkillNodes.has(node)}
						selected={selectedSkillNodes.has(node)}
						disabled={!isSelectOpen}>{node}</option
					>
				{/each}
			</select>.
		</div>
	</div>

	<!-- listing of selected nodes  -->
	<div class="info flex gap-2">
		<div class="selected-nodes flex-col">
			<h3>Selected Skill Nodes:</h3>
			{#each [...selectedSkillNodes] as nodeId}
				<span class="node-tag">{nodeId}</span>
			{/each}
		</div>
		<h3 class="flex-col">
			Ranked Job Nodes (Top 10):
			<ol>
				{#each rankedJobNodes.slice(0, 10) as node}
					<li>{node.id} (Count: {node.count})</li>
				{/each}
			</ol>
		</h3>
		<h3 class="flex-col">
			Ranked Skill Nodes (Top 10):
			<ol>
				{#each rankedSkillNodes.slice(0, 10) as node}
					<li>{node.id} (Count: {node.count})</li>
				{/each}
			</ol>
		</h3>
		<h3 class="flex-col">
			Ranked Bullet Nodes (Top 10):
			<ol>
				{#each rankedBulletNodes.slice(0, 10) as node}
					<li>{node.id} (Count: {node.count})</li>
				{/each}
			</ol>
		</h3>
		<h3 class="flex-col">
			Ranked Project Nodes (Top 10):
			<ol>
				{#each rankedProjectNodes.slice(0, 10) as node}
					<li>{node.id} (Count: {node.count})</li>
				{/each}
			</ol>
		</h3>
	</div>
</div>

<style>
	option:disabled {
		color: #ccc;
		background-color: #f5f5f5;
	}
	option:disabled.selected {
		color: #fff;
		background-color: #a5a5a5;
	}

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
