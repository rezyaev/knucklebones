<script lang="ts">
	export let value: number;
</script>

<div
	class="grid h-16 w-16 grid-cols-3 grid-rows-3 gap-px rounded-md bg-zinc-200 p-3"
>
	<div
		class="h-full w-full rounded-full"
		class:bg-stone-800="{value === 4 || value === 5 || value === 6}"
	></div>
	<div class="h-full w-full rounded-full"></div>
	<div
		class="h-full w-full rounded-full"
		class:bg-stone-800="{value === 3 ||
			value === 4 ||
			value === 5 ||
			value === 6}"
	></div>
	<div
		class="h-full w-full rounded-full"
		class:bg-stone-800="{value === 2 || value === 6}"
	></div>
	<div
		class="h-full w-full rounded-full"
		class:bg-stone-800="{value === 1 || value === 3 || value === 5}"
	></div>
	<div
		class="h-full w-full rounded-full"
		class:bg-stone-800="{value === 2 || value === 6}"
	></div>
	<div
		class="h-full w-full rounded-full"
		class:bg-stone-800="{value === 3 ||
			value === 4 ||
			value === 5 ||
			value === 6}"
	></div>
	<div class="h-full w-full rounded-full"></div>
	<div
		class="h-full w-full rounded-full"
		class:bg-stone-800="{value === 4 || value === 5 || value === 6}"
	></div>
</div>
