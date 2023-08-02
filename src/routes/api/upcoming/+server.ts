import { json } from '@sveltejs/kit';
import axios from 'axios';

export const GET = async () => {
	try {
		const options = {
			method: 'GET',
			url: 'https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1',
			headers: {
				accept: 'application/json',
				Authorization:
					'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNTRiNzI0YTAwODQ3OGMyZTQ3NjI2MzYzMjYxNmQwOCIsInN1YiI6IjYxYmU5NTFhNjk5ZmI3MDA5NzVlNTJkYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.86XlFAqjy1xg6KahHCzGUZMo5I3nvhRs-31woh3jbp4'
			}
		};

		const response = await axios.request(options);
		return json(response.data);
	} catch (error) {
		return json({ error: 'Failed to fetch movies' });
	}
};
