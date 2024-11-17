<script lang="ts">
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
	<slot />
</div>

<style>
	@import '@radix-ui/colors/mauve.css';
	@import '@radix-ui/colors/mauve-dark.css';
	@import '@radix-ui/colors/blue.css';
	@import '@radix-ui/colors/blue-dark.css';
	@import '@radix-ui/colors/purple.css';
	@import '@radix-ui/colors/purple-dark.css';
	@import '@radix-ui/colors/ruby.css';
	@import '@radix-ui/colors/ruby-dark.css';

	:global(body) {
		margin: 0;
	}

	#wrapper {
		position: absolute;
		width: 100dvw;
		height: 100dvh;
		background-color: var(--mauve-1);
	}

	* {
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI (Custom)', Roboto, 'Helvetica Neue',
			'Open Sans (Custom)', system-ui, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji';
	}
</style>
