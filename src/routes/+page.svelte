<script lang="ts">
	export let data;

	// @ts-ignore
	function truncateOverview(overview, wordLimit) {
		const words = overview.split(' ');
		if (words.length > wordLimit) {
			return words.slice(0, wordLimit).join(' ') + '...';
		} else {
			return overview;
		}
	}
</script>

<svelte:head>
	<title>Movies</title>
</svelte:head>

<main class="w-11/12 mx-auto my-4">
	{#if data.movies && data.movies.length > 0}
		<div class="grid grid-cols-4 gap-4 p-2">
			{#each data.movies as movie}
				<a href={`/movies/${movie.id}`}>
					<div
						class="border border-gray-300 rounded-lg h-80 transition-shadow hover:shadow-md overflow-hidden"
					>
						<img
							class="w-full h-48 object-cover rounded-md"
							src={`https://image.tmdb.org/t/p/w300/${movie?.backdrop_path}`}
							alt=""
						/>
						<div class="flex flex-col p-2">
							<h3 class="text-lg font-bold text-blue-500">{movie?.title}</h3>
							<div class="h-20 overflow-y-auto">
								<p class="text-sm text-gray-400">{truncateOverview(movie?.overview, 20)}</p>
							</div>
						</div>
					</div>
				</a>
			{/each}
		</div>
	{:else}
		<p>No movies found.</p>
	{/if}
</main>
