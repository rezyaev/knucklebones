<script lang="ts">
	import Button from "../lib/components/Button.svelte";
	import DicePatternBackground from "../lib/components/DicePatternBackground.svelte";

	const links = [
		{ title: "Play Versus AI", href: "#/match/PvAI" },
		{ title: "Play Locally", href: "#/match/LPvP" },
		{ title: "Play Online", href: "#/lobby" },
	];
</script>

<div class="flex h-full w-full flex-col items-center pt-56">
	<DicePatternBackground />

	<h1 class="mb-24 text-9xl font-bold text-zinc-100">Knucklebones</h1>

	<nav class="flex flex-col gap-4">
		{#each links as link}
			<Button href="{link.href}">
				{link.title}
			</Button>
		{/each}
	</nav>
</div>
