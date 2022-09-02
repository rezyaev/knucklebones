<script lang="ts">
	import "./app.css";
	import Router from "svelte-spa-router";
	import Home from "./routes/Home.svelte";

	const routes = {
		// Exact path
		"/": Home,
	};
</script>

<main>
	<Router routes="{routes}" />
</main>
