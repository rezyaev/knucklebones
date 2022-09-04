<script lang="ts">
	const backgroundColor = "fill-zinc-800";
	const foregroundColor = "fill-zinc-900";
</script>

<svg
	class="fixed left-0 top-0 -z-50 h-full w-full bg-zinc-900"
	version="1.1"
	xmlns="http://www.w3.org/2000/svg"
>
	<defs>
		<g id="dice-1">
			<rect width="64" height="64" rx="6" class="{backgroundColor}"></rect>
			<circle cx="32" cy="32" r="6" class="{foregroundColor}"></circle>
		</g>
		<g id="dice-2">
			<rect width="64" height="64" rx="6" class="{backgroundColor}"></rect>
			<circle cx="18" cy="32" r="6" class="{foregroundColor}"></circle>
			<circle cx="46" cy="32" r="6" class="{foregroundColor}"></circle>
		</g>
		<g id="dice-3">
			<rect width="64" height="64" rx="6" class="{backgroundColor}"></rect>
			<circle cx="46" cy="18" r="6" class="{foregroundColor}"></circle>
			<circle cx="32" cy="32" r="6" class="{foregroundColor}"></circle>
			<circle cx="18" cy="46" r="6" class="{foregroundColor}"></circle>
		</g>
		<g id="dice-4">
			<rect width="64" height="64" rx="6" class="{backgroundColor}"></rect>
			<circle cx="18" cy="18" r="6" class="{foregroundColor}"></circle>
			<circle cx="46" cy="18" r="6" class="{foregroundColor}"></circle>
			<circle cx="18" cy="46" r="6" class="{foregroundColor}"></circle>
			<circle cx="46" cy="46" r="6" class="{foregroundColor}"></circle>
		</g>
		<g id="dice-5">
			<rect width="64" height="64" rx="6" class="{backgroundColor}"></rect>
			<circle cx="18" cy="18" r="6" class="{foregroundColor}"></circle>
			<circle cx="46" cy="18" r="6" class="{foregroundColor}"></circle>
			<circle cx="32" cy="32" r="6" class="{foregroundColor}"></circle>
			<circle cx="18" cy="46" r="6" class="{foregroundColor}"></circle>
			<circle cx="46" cy="46" r="6" class="{foregroundColor}"></circle>
		</g>
		<g id="dice-6">
			<rect width="64" height="64" rx="6" class="{backgroundColor}"></rect>
			<circle cx="18" cy="18" r="6" class="{foregroundColor}"></circle>
			<circle cx="46" cy="18" r="6" class="{foregroundColor}"></circle>
			<circle cx="18" cy="32" r="6" class="{foregroundColor}"></circle>
			<circle cx="46" cy="32" r="6" class="{foregroundColor}"></circle>
			<circle cx="18" cy="46" r="6" class="{foregroundColor}"></circle>
			<circle cx="46" cy="46" r="6" class="{foregroundColor}"></circle>
		</g>

		<pattern id="pattern" x="0" y="0" height="768" width="1536" patternUnits="userSpaceOnUse">
			<g id="dice-row-1" transform="translate(0, 0)">
				<use href="#dice-2" x="32" y="32"></use>
				<use href="#dice-6" x="166" y="32"></use>
				<use href="#dice-5" x="288" y="32"></use>
				<use href="#dice-1" x="416" y="32"></use>
				<use href="#dice-4" x="544" y="32"></use>
				<use href="#dice-3" x="672" y="32"></use>
				<use href="#dice-2" x="800" y="32"></use>
				<use href="#dice-6" x="928" y="32"></use>
				<use href="#dice-5" x="1056" y="32"></use>
				<use href="#dice-1" x="1184" y="32"></use>
				<use href="#dice-4" x="1312" y="32"></use>
				<use href="#dice-3" x="1440" y="32"></use>
			</g>
			<g id="dice-row-2" transform="translate(64, 128)">
				<use href="#dice-3" x="-96" y="32"></use>
				<use href="#dice-2" x="32" y="32"></use>
				<use href="#dice-6" x="166" y="32"></use>
				<use href="#dice-5" x="288" y="32"></use>
				<use href="#dice-1" x="416" y="32"></use>
				<use href="#dice-4" x="544" y="32"></use>
				<use href="#dice-3" x="672" y="32"></use>
				<use href="#dice-2" x="800" y="32"></use>
				<use href="#dice-6" x="928" y="32"></use>
				<use href="#dice-5" x="1056" y="32"></use>
				<use href="#dice-1" x="1184" y="32"></use>
				<use href="#dice-4" x="1312" y="32"></use>
				<use href="#dice-3" x="1440" y="32"></use>
			</g>
			<g id="dice-row-3" transform="translate(128, 256)">
				<use href="#dice-3" x="-96" y="32"></use>
				<use href="#dice-2" x="32" y="32"></use>
				<use href="#dice-6" x="166" y="32"></use>
				<use href="#dice-5" x="288" y="32"></use>
				<use href="#dice-1" x="416" y="32"></use>
				<use href="#dice-4" x="544" y="32"></use>
				<use href="#dice-3" x="672" y="32"></use>
				<use href="#dice-2" x="800" y="32"></use>
				<use href="#dice-6" x="928" y="32"></use>
				<use href="#dice-5" x="1056" y="32"></use>
				<use href="#dice-1" x="1184" y="32"></use>
				<use href="#dice-4" x="1312" y="32"></use>
			</g>
			<g id="dice-row-4" transform="translate(192, 384)">
				<use href="#dice-4" x="-224" y="32"></use>
				<use href="#dice-3" x="-96" y="32"></use>
				<use href="#dice-2" x="32" y="32"></use>
				<use href="#dice-6" x="166" y="32"></use>
				<use href="#dice-5" x="288" y="32"></use>
				<use href="#dice-1" x="416" y="32"></use>
				<use href="#dice-4" x="544" y="32"></use>
				<use href="#dice-3" x="672" y="32"></use>
				<use href="#dice-2" x="800" y="32"></use>
				<use href="#dice-6" x="928" y="32"></use>
				<use href="#dice-5" x="1056" y="32"></use>
				<use href="#dice-1" x="1184" y="32"></use>
				<use href="#dice-4" x="1312" y="32"></use>
			</g>
			<g id="dice-row-5" transform="translate(256, 512)">
				<use href="#dice-4" x="-224" y="32"></use>
				<use href="#dice-3" x="-96" y="32"></use>
				<use href="#dice-2" x="32" y="32"></use>
				<use href="#dice-6" x="166" y="32"></use>
				<use href="#dice-5" x="288" y="32"></use>
				<use href="#dice-1" x="416" y="32"></use>
				<use href="#dice-4" x="544" y="32"></use>
				<use href="#dice-3" x="672" y="32"></use>
				<use href="#dice-2" x="800" y="32"></use>
				<use href="#dice-6" x="928" y="32"></use>
				<use href="#dice-5" x="1056" y="32"></use>
				<use href="#dice-1" x="1184" y="32"></use>
			</g>
			<g id="dice-row-6" transform="translate(320, 640)">
				<use href="#dice-5" x="-352" y="32"></use>
				<use href="#dice-4" x="-224" y="32"></use>
				<use href="#dice-3" x="-96" y="32"></use>
				<use href="#dice-2" x="32" y="32"></use>
				<use href="#dice-6" x="166" y="32"></use>
				<use href="#dice-5" x="288" y="32"></use>
				<use href="#dice-1" x="416" y="32"></use>
				<use href="#dice-4" x="544" y="32"></use>
				<use href="#dice-3" x="672" y="32"></use>
				<use href="#dice-2" x="800" y="32"></use>
				<use href="#dice-6" x="928" y="32"></use>
				<use href="#dice-5" x="1056" y="32"></use>
				<use href="#dice-1" x="1184" y="32"></use>
			</g>
		</pattern>
	</defs>

	<rect fill="url(#pattern)" x="0" y="0" width="100%" height="100%"></rect>
</svg>
