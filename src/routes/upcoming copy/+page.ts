export async function load({ fetch }: any) {
	const response = await fetch('/api/upcoming');
	const movies = await response.json();

	return { movies: movies.results };
}
