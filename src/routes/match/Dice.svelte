<script lang="ts">
	import type { TCell } from "../../types";

	export let value: TCell;
	export let multiplier: 1 | 2 | 3 = 1;
</script>

<div
	class="grid h-16 w-16 grid-cols-3 grid-rows-3 gap-px rounded-md  p-3"
	class:bg-zinc-200="{multiplier === 1}"
	class:bg-amber-300="{multiplier === 2}"
	class:bg-sky-500="{multiplier === 3}"
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
