<script lang="ts">
	import Dice from "./Dice.svelte";

	export let dice: number | null = null;
</script>

<button class="flex items-center justify-center bg-stone-800" on:click>
	{#if dice}
		<Dice value="{dice}" />
	{/if}
</button>
