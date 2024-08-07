<script>
	import LightBlob from './LightBlob.svelte';
</script>

<div id="light-show">
	{#each { length: 8 } as _, index}
		<LightBlob {index} />
	{/each}
</div>

<style>
	#light-show {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		overflow: hidden;
		filter: blur(calc(5vh + 5vw));
	}
</style>
