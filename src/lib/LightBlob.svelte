<script lang="ts">
	import { onMount } from 'svelte';

	export let index: number;

	const MIN_SIZE = 15;
	const MAX_SIZE = 25;
	const COLORS = ['blue-9', 'purple-9'];

	let blob: HTMLDivElement;

	onMount(() => {
		const size = Math.random() * (MAX_SIZE - MIN_SIZE + 1) + MIN_SIZE;
		const fraction = size / MAX_SIZE;
		const duration = 1000 * fraction * 20 * (Math.random() / 2 + 0.5);
		const color = COLORS[index % COLORS.length];
		const minX = Math.random() * 50 + 25;
		const minY = Math.random() * 50 + 25;
		const maxX = Math.random() * 50 + 25;
		const maxY = Math.random() * 50 + 25;
		const wobble = blob.animate(
			[
				{ left: `${minX}%`, top: `${minY}%`, easing: 'ease-in-out' },
				{ left: `${maxX}%`, top: `${maxY}%`, easing: 'ease-in-out' },
				{ left: `${minX}%`, top: `${minY}%`, easing: 'ease-in-out' }
			],
			{ duration, iterations: Infinity }
		);

		blob.style.width = `${size}dvw`;
		blob.style.height = `${size}dvh`;
		blob.style.backgroundColor = `var(--${color})`;
		// blob.style.opacity = `${fraction}`;

		return wobble.cancel;
	});
</script>

<div class="blob" bind:this={blob} />

<style bind:this="{style}">
	.blob {
		position: absolute;
		border-radius: 50%;
		transform: translate(-50%, -50%);
	}
</style>
