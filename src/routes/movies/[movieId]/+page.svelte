<script lang="ts">
	import axios from 'axios';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';

	// Type for the movie object
	interface Movie {
		id: number;
		backdrop_path: string | null;
		title: string;
		overview: string;
	}

	// Create a writable store for recommended movies
	const recommendedMovies = writable<Movie[]>([]);

	// Function to truncate the movie overview
	function truncateOverview(overview: string, maxLength: number): string {
		return overview.length > maxLength ? `${overview.slice(0, maxLength)}...` : overview;
	}

	export let data;

	async function recommendations() {
		const options = {
			method: 'GET',
			url: `https://api.themoviedb.org/3/movie/${data.movie.id}/recommendations?language=en-US&page=1`,
			headers: {
				accept: 'application/json',
				Authorization:
					'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNTRiNzI0YTAwODQ3OGMyZTQ3NjI2MzYzMjYxNmQwOCIsInN1YiI6IjYxYmU5NTFhNjk5ZmI3MDA5NzVlNTJkYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.86XlFAqjy1xg6KahHCzGUZMo5I3nvhRs-31woh3jbp4'
			}
		};
		try {
			const response = await axios.request(options);
			const recommended = await response.data;
			recommendedMovies.set(recommended.results); // Update the store with the received data
		} catch (error) {
			console.error('Error fetching search results:', error);
		}
	}

	onMount(async () => {
		await recommendations();
	});
</script>

<svelte:head>
	<title>{data.movie.title}</title>
</svelte:head>

<main class="w-11/12 mx-auto">
	<div class="flex gap-20 px-10 py-5 rounded-lg shadow-sm bg-gray-50">
		<div class="cover-container flex-none w-300 h-450 overflow-hidden rounded-md shadow-md">
			<img
				alt=""
				class="cover-image w-full h-full object-cover"
				src={`https://image.tmdb.org/t/p/w300/${data.movie.poster_path}`}
			/>
		</div>

		<div class="movie-info flex-1 text-gray-800">
			<div class="header flex justify-between items-center">
				<h2 class="text-2xl font-semibold">{data.movie.title}</h2>
				<div class="rating text-yellow-500 text-xl font-semibold">
					Rating: {data.movie.vote_average}
				</div>
			</div>

			<div class="release-genre flex justify-between text-gray-600">
				<p>Released Date: {data.movie.release_date}</p>
				<p class="flex gap-2 text-light-blue">
					Genres: {#each data.movie.genres as genre}
						<p>{genre.name}</p>
					{/each}
				</p>
			</div>

			<h3 class="text-2xl font-semibold mt-6">Overview:</h3>
			<p>{data.movie.overview}</p>

			<h3 class="text-2xl font-semibold mt-6">Production Companies:</h3>
			<ul class="list-disc list-inside">
				{#each data.movie.production_companies as company}
					<li>
						{company.name} ({company.origin_country})
					</li>
				{/each}
			</ul>

			<h3 class="text-2xl font-semibold mt-6">Production Countries:</h3>
			<ul class="list-disc list-inside">
				{#each data.movie.production_countries as country}
					<li>{country.name}</li>
				{/each}
			</ul>

			<h3 class="text-2xl font-semibold mt-6">Spoken Languages:</h3>
			<ul class="list-disc list-inside">
				{#each data.movie.spoken_languages as language}
					<li>
						{language.name} ({language.english_name})
					</li>
				{/each}
			</ul>
		</div>
	</div>

	{#if $recommendedMovies.length > 0}
		<h3 class="text-2xl px-2 py-2 font-semibold mt-6 text-blue-500">Recommended Movies</h3>
		<div class="grid grid-cols-4 gap-4 p-2">
			{#each $recommendedMovies as movie}
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
		<p>No recommended movies found.</p>
	{/if}
</main>
