<script lang="ts">
	const options = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig', 'Grape', 'Honeydew'];
	const midpoint = Math.floor(options.length / 2);

	let isOpen = true; //TODO: revert, this is just for testing
	let selected: string[] = [];

	const toggle = () => {
		isOpen = !isOpen;
	};
	const toggleOption = (option: string) => {
		if (selected.includes(option)) {
			selected = selected.filter((item) => item !== option);
		} else {
			selected = [...selected, option];
		}
	};
</script>

<!-- TODO: remove this and fix ARIA stuff -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="select-container">
	<div class="select-header" on:click={() => toggle()}>
		{#if selected.length === 0}
			Select items...
		{:else}
			{#each selected as item}
				<span class="chip">{item}</span>
			{/each}
		{/if}
	</div>

	<div class="scene">
		{#if isOpen}
			<div class="options-container">
				{#each options as option}
					<div
						class="option {selected.includes(option) ? 'selected' : ''}"
						on:click={() => toggleOption(option)}
					>
						{option}
					</div>
				{/each}
			</div>
		{/if}
	</div>
</div>

<style>
	.select-container {
		position: relative;
		width: 300px;

		/* margin: 50px auto; */
		/* perspective: 1000px; */
	}

	.select-header {
		padding: 12px;
		border: 1px solid #ccc;
		border-radius: 4px;
		cursor: pointer;
		background: white;
	}

	.scene {
		width: 210px;
		height: 140px;
		position: relative;
		perspective: 1000px;
	}
	.options-container {
		width: 100%;
		height: 100%;
		position: absolute;
		transform-style: preserve-3d;
	}
	.option {
		position: absolute;
		width: 190px;
		height: 120px;
		left: 10px;
		top: 10px;
	}
	.option:nth-child(1) {
		transform: rotateX(0deg) translateZ(288px);
	}
	.option:nth-child(2) {
		transform: rotateX(45deg) translateZ(288px);
	}
	.option:nth-child(3) {
		transform: rotateX(90deg) translateZ(288px);
	}
	.option:nth-child(4) {
		transform: rotateX(135deg) translateZ(288px);
	}
	.option:nth-child(5) {
		transform: rotateX(180deg) translateZ(288px);
	}
	.option:nth-child(6) {
		transform: rotateX(225deg) translateZ(288px);
	}
	.option:nth-child(7) {
		transform: rotateX(270deg) translateZ(288px);
	}
	.option:nth-child(8) {
		transform: rotateX(315deg) translateZ(288px);
	}

	.option:hover {
		background: #f0f0f0;
	}

	.selected {
		background: #e0e0ff;
	}

	.chip {
		display: inline-block;
		padding: 2px 8px;
		margin: 2px;
		background: #e0e0ff;
		border-radius: 12px;
		font-size: 14px;
	}
</style>
