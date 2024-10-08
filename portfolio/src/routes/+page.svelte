<script>
  import { onMount } from 'svelte';
//  import { debugOutline } from '../utils/debugOutline';
//  import Showcase from '../components/Showcase.svelte';
//  import ProjectList from '../components/ProjectList.svelte';
//  import Profile from '../components/Profile.svelte';

  const DEBUG_MODE = import.meta.env.VITE_DEBUG === 'true';

  onMount(() => {
    if (DEBUG_MODE) {
      // debugOutline();
    }
  });
</script>

<main class="flex justify-between h-full">
  <div class="left-main flex flex-[3_1_0%] flex-col justify-center">
    <!-- <Showcase /> -->
    <!-- <ProjectList /> -->
  </div>
  <div class="right-main flex flex-[2_1_0%] flex-col items-center justify-center">
    <!-- <Profile /> -->
  </div>
</main>

<style>
</style>

