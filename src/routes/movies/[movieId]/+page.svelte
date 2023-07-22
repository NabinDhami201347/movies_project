<script lang="ts">
	export let data;
  
	// Define the Genre interface
	interface Genre {
	  id: number;
	  name: string;
	}
  
	// Define the MovieData interface with the correct type for genres
	interface MovieData {
	  movie: {
		title: string;
		release_date: string;
		vote_average: number;
		genres: Genre[];
		overview: string;
		poster_path: string;
		production_companies: {
		  id: number;
		  logo_path: string | null;
		  name: string;
		  origin_country: string;
		}[];
		production_countries: { iso_3166_1: string; name: string }[];
		spoken_languages: { english_name: string; iso_639_1: string; name: string }[];
	  };
	}
  </script>
  
  <svelte:head>
	<title>{data.movie.title}</title>
  </svelte:head>
  
  <main class="movie-card">
	<div class="cover-container">
	  <img
		alt=""
		class="cover-image"
		src={`https://image.tmdb.org/t/p/w300/${data.movie.poster_path}`}
	  />
	</div>
  
	<div class="movie-info">
	  <div class="header">
		<h2>{data.movie.title}</h2>
		<div class="rating">Rating: {data.movie.vote_average}</div>
	  </div>
  
	  <div class="release-genre">
		<p>Released Date: {data.movie.release_date}</p>
		<p style="display: flex; gap:10px">Genres: {#each data.movie.genres as genre}
			<p style="color: lightblue;">{genre.name}</p>
			<!-- {genre.name.join(", ")} -->
		{/each}
	</p>
	  </div>
  
	  <h3>Overview:</h3>
	  <p>{data.movie.overview}</p>
  
	  <h3>Production Companies:</h3>
	  <ul>
		{#each data.movie.production_companies as company}
		  <li>
			{company.name} ({company.origin_country})
		  </li>
		{/each}
	  </ul>
  
	  <h3>Production Countries:</h3>
	  <ul>
		{#each data.movie.production_countries as country}
		  <li>{country.name}</li>
		{/each}
	  </ul>
  
	  <h3>Spoken Languages:</h3>
	  <ul>
		{#each data.movie.spoken_languages as language}
		  <li>
			{language.name} ({language.english_name})
		  </li>
		{/each}
	  </ul>
	</div>
  </main>
  
  <style>
	.movie-card {
	  display: flex;
	  gap: 20px;
	  margin: 20px;
	  padding: 20px;
	  border-radius: 8px;
	  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
	  background-color: #f9f9f9;
	  font-family: 'Roboto', sans-serif;
	}
  
	.cover-container {
	  flex: 0 0 300px;
	  height: 450px;
	  overflow: hidden;
	  border-radius: 4px;
	  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
	}
  
	.cover-image {
	  width: 100%;
	  height: 100%;
	  object-fit: cover;
	  display: block;
	}
  
	.movie-info {
	  flex: 1;
	  color: #333;
	}
  
	.header {
	  display: flex;
	  justify-content: space-between;
	  align-items: center;
	}
  
	h2 {
	  margin: 0;
	  font-size: 28px;
	  color: #444;
	}
  
	.rating {
	  font-size: 18px;
	  font-weight: bold;
	  color: #f39c12;
	}
  
	.release-genre {
	  display: flex;
	  justify-content: space-between;
	  color: #777;
	}
  
	h3 {
	  margin: 20px 0 10px;
	  font-size: 20px;
	  font-weight: bold;
	  color: #333;
	}
  
	ul {
	  margin: 0;
	  padding: 0;
	  list-style: none;
	}
  
	li {
	  margin-bottom: 5px;
	}
  
	p {
	  margin: 0;
	  line-height: 1.5;
	}
  </style>
  