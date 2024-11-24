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

	{#if isOpen}
		<div class="options-container">
			{#each options as option, i}
				<div
					class="option {selected.includes(option) ? 'selected' : ''}"
					on:click={() => toggleOption(option)}
					style="transform: 
                        rotateX({(i - midpoint) * 20}deg)
                        translateZ({Math.abs(i - midpoint) * 10}px)
                        translateY({Math.min(i - 5, i - 3) * 10}px)
                    "
				>
					<!-- <div -->
					<!-- 	class="option {selected.includes(option) ? 'selected' : ''}" -->
					<!-- 	on:click={() => toggleOption(option)} -->
					<!-- 	style=" -->
					<!-- transform: rotateX({-i * 10}deg) translateZ({i * 10}px) translateY({i * 4}px); -->
					<!-- opacity: {1 - i * 0.1}; -->
					<!-- " -->
					<!-- > -->
					{option}
					{i}
				</div>
			{/each}
		</div>
	{/if}
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

	.options-container {
		max-height: 200px;
		overflow-y: auto;

		/* position: absolute; */
		/* width: 100%; */
		/* margin-top: 4px; */
		/* transform-style: preserve-3d; */
		/* transform-origin: top center; */
	}

	/* .option { */
	/* 	padding: 12px; */
	/* 	background: white; */
	/* 	border: 1px solid #eee; */
	/* 	cursor: pointer; */
	/* 	backface-visibility: visible; */
	/* 	transform-origin: center; */
	/* 	position: absolute; */
	/* 	width: 100%; */
	/* 	box-sizing: border-box; */
	/* } */

	.option {
		position: relative;
		overflow-y: scroll;
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
