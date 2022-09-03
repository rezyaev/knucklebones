<script lang="ts">
	const links = [
		{ title: "Play Versus AI", href: "#/match/PvAI" },
		{ title: "Play Locally", href: "#/match/LPvP" },
		{ title: "Play Online", href: "#/lobby" },
	];
</script>

<nav class="flex h-full w-full flex-col items-center bg-zinc-900 pt-56">
	<h1 class="mb-24 text-9xl font-bold text-zinc-100">Knucklebones</h1>

	{#each links as link}
		<a
			class="w-56 rounded py-4 text-center text-lg text-zinc-400 hover:bg-red-600 hover:text-zinc-100"
			href="{link.href}"
		>
			{link.title}
		</a>
	{/each}
</nav>
