<script>
	import { onMount } from 'svelte';
	import { debugOutline } from '../../utils/debugOutline';
	import Showcase from './Showcase.svelte';
	import ResumeBuilder from './ResumeBuilder.svelte';
	import Profile from './Profile.svelte';
	onMount(() => {
		debugOutline();
	});
</script>

<main class="flex justify-between h-screen py-4 px-2">
	<div class="left-main flex flex-[3_1_0%] flex-col justify-center">
		<Showcase />
		<ResumeBuilder />
	</div>

	<div class="right-main flex flex-[2_1_0%] flex-col items-center justify-center">
		<Profile />
	</div>
</main>
