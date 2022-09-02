<script lang="ts">
	import "./app.css";
	import Router from "svelte-spa-router";
	import Home from "./routes/Home.svelte";
	import Match from "./routes/match/Match.svelte";

	const routes = {
		"/": Home,
		"/match/:gamemode": Match,
	};
</script>

<main class="h-screen w-screen">
	<Router routes="{routes}" />
</main>
