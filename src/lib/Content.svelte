<script lang="ts">
	import { DiscordLogo, GithubLogo } from 'radix-icons-svelte';
</script>

<div id="content">
	<span id="name">TrèsAbhi</span>

	<div id="links">
		<a class="link" href="https://discord.gg/nDt7AjGJQH">
			<DiscordLogo />
			<span>Discord</span>
		</a>

		<a class="link" href="https://github.com/tresabhi">
			<GithubLogo />
			<span>GitHub</span>
		</a>
	</div>
</div>

<style>
	#content {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		gap: 0.5rem;
	}

	#name {
		user-select: none;
		color: var(--mauve-12);
		text-shadow:
			0 2px 0 var(--ruby-11),
			0 0 3px var(--ruby-12);
		font-weight: 900;
		font-size: min(15dvw, 5rem);
		letter-spacing: -0.02em;
	}

	#links {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.link {
		text-decoration: none;
		color: var(--mauve-12);
		font-size: 1rem;
		display: flex;
		align-items: center;
		gap: 0.25rem;
	}

	.link:hover {
		text-decoration: underline;
	}

	.link > :global(svg) {
		width: 1em;
		height: 1em;
	}
</style>
