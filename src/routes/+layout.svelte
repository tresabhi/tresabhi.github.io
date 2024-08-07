<script lang="ts">
	import LightBlob from '$lib/LightBlob.svelte';
	import { onMount } from 'svelte';

	let wrapper: HTMLDivElement;

	onMount(() => {
		if (window.matchMedia) {
			const watcher = window.matchMedia('(prefers-color-scheme: dark)');

			function handleChange(event: MediaQueryListEvent | MediaQueryList) {
				if (event.matches) {
					wrapper.classList.add('dark');
				} else wrapper.classList.remove('dark');
			}

			handleChange(watcher);
			watcher.addEventListener('change', handleChange);
			return () => watcher.removeEventListener('change', handleChange);
		}
	});
</script>

<div id="wrapper" bind:this={wrapper} class="dark">
	<div id="light-show-wrapper">
		{#each { length: 8 } as _, index}
			<LightBlob {index} />
		{/each}
	</div>
</div>

<style>
	@import '@radix-ui/colors/mauve.css';
	@import '@radix-ui/colors/mauve-dark.css';
	@import '@radix-ui/colors/blue.css';
	@import '@radix-ui/colors/blue-dark.css';
	@import '@radix-ui/colors/purple.css';
	@import '@radix-ui/colors/purple-dark.css';

	:global(body) {
		margin: 0;
	}

	#wrapper {
		position: absolute;
		width: 100dvw;
		height: 100dvh;
		background-color: var(--mauve-1);
	}

	#light-show-wrapper {
		top: 0;
		left: 0;
		overflow: hidden;
		position: absolute;
		width: 100%;
		height: 100%;
		filter: blur(calc((100dvh + 100dvw) / (2 * 8)));
	}
</style>
