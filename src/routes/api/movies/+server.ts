import { json } from '@sveltejs/kit';
import axios from 'axios';

export const GET = async () => {
	try {
		const options = {
			method: 'GET',
			url: 'https://api.themoviedb.org/3/discover/movie',
			headers: {
				accept: 'application/json',
				Authorization:
					'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNTRiNzI0YTAwODQ3OGMyZTQ3NjI2MzYzMjYxNmQwOCIsInN1YiI6IjYxYmU5NTFhNjk5ZmI3MDA5NzVlNTJkYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.86XlFAqjy1xg6KahHCzGUZMo5I3nvhRs-31woh3jbp4'
			}
		};

		// Make the API request using axios
		const response = await axios.request(options);

		// Return the data from the API response using the json helper function
		return json(response.data);
	} catch (error) {
		// If an error occurs during the API request, log the error and return an empty array or an error message.
		console.error('Error fetching movies:', error);
		return json({ error: 'Failed to fetch movies' });
	}
};
