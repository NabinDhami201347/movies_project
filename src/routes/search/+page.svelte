<script lang="ts">
	import axios from 'axios';

	interface Movie {
		id: number;
		title: string;
		overview: string;
		backdrop_path: string;
	}

	let searchTerm: string = '';
	let searchResults: Movie[] = [];

	async function handleClick() {
		const options = {
			method: 'GET',
			url: `https://api.themoviedb.org/3/search/movie?query=${searchTerm}`,
			headers: {
				accept: 'application/json',
				Authorization:
					'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNTRiNzI0YTAwODQ3OGMyZTQ3NjI2MzYzMjYxNmQwOCIsInN1YiI6IjYxYmU5NTFhNjk5ZmI3MDA5NzVlNTJkYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.86XlFAqjy1xg6KahHCzGUZMo5I3nvhRs-31woh3jbp4'
			}
		};
		try {
			const response = await axios.request(options);
			searchResults = response.data.results;
		} catch (error) {
			console.error('Error fetching search results:', error);
			searchResults = [];
		}
	}

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

<div class="flex items-center justify-center p-4">
	<input
		type="text"
		placeholder="Enter your search term..."
		class="p-2 border border-gray-300 rounded-md mr-2"
		bind:value={searchTerm}
	/>
	<button type="submit" class="p-2 bg-blue-500 text-white rounded-md" on:click={handleClick}>
		Search
	</button>
</div>

<main class="w-11/12 mx-auto my-4">
	{#if searchResults.length > 0}
		<div class="grid grid-cols-4 gap-4 p-2">
			{#each searchResults as movie}
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
	{:else if searchTerm.trim() !== ''}
		<p>No results found.</p>
	{/if}
</main>
