export async function load({ fetch, params }: any) {
	const response = await fetch(`/api/movies/${params.movieId}`);
	const movie = await response.json();

	return { movie };
}
