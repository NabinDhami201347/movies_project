export async function load({ fetch }) {
	const response = await fetch('/api/movies');
	const movies = await response.json();

	return { movies: movies.results };
}
