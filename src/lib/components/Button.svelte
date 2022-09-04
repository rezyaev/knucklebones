<script lang="ts">
	export let type: "button" | "submit" | null = null;
	export let href: string | null = null;

	const styling =
		"w-56 rounded bg-zinc-600 py-4 text-center text-lg text-zinc-300 hover:bg-red-600 hover:text-zinc-100";
</script>

{#if href}
	<a class="{styling}" href="{href}">
		<slot />
	</a>
{:else}
	<button class="{styling}" type="{type}" on:click>
		<slot />
	</button>
{/if}
