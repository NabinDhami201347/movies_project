export async function load({ fetch }: any) {
	const response = await fetch('/api/nowplaying');
	const movies = await response.json();

	return { movies: movies.results };
}
