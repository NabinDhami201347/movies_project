<script lang="ts">
	export let data;
  
	// @ts-ignore
	function truncateOverview(overview, wordLimit) {
	  const words = overview.split(" ");
	  if (words.length > wordLimit) {
		return words.slice(0, wordLimit).join(" ") + "...";
	  } else {
		return overview;
	  }
	}
  </script>
  
  <svelte:head>
	<title>Movies</title>
  </svelte:head>
  
  <main>
	{#if data.movies && data.movies.length > 0}
	  <div class="movie-card-container">
		{#each data.movies as movie}
		  <div class="container">
			<div class="movie-card">
			  <img
				class="image"
				src={`https://image.tmdb.org/t/p/w300/${movie?.backdrop_path}`}
				alt=""
			  />
			  <div class="movie-details">
				<h3 class="title">{movie?.title}</h3>
				<p class="overview">{truncateOverview(movie?.overview, 20)}</p>
				<div class="details">
				  <div class="details-item">
					<span>Release Date:</span>
					{movie?.release_date}
				  </div>
				  <div class="details-item">
					<span>Popularity:</span>
					{movie?.popularity}
				  </div>
				  <div class="details-item">
					<span>Average Vote:</span>
					{movie?.vote_average}
				  </div>
				  <div class="details-item">
					<span>Vote Count:</span>
					{movie?.vote_count}
				  </div>
				</div>
				<a href={`/movies/${movie.id}`}>Read More</a>
			  </div>
			</div>
		  </div>
		{/each}
	  </div>
	{:else}
	  <p>No movies found.</p>
	{/if}
  </main>
  
  <style>
	.movie-card-container {
	  display: flex;
	  flex-wrap: wrap;
	  justify-content: center;
	  font-family: 'Courier New', Courier, monospace;
	}
  
	.container {
	  margin: 16px;
	}
  
	.movie-card {
	  border: 1px solid #ccc;
	  border-radius: 8px;
	  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	  padding: 16px;
	  width: 300px;
	  display: flex;
	  flex-direction: column;
	  background-color: #fff;
	}
  
	.title {
	  font-size: 20px;
	  font-weight: bold;
	  margin-bottom: 8px;
	}
  
	.overview {
	  font-size: 14px;
	  color: #444;
	  line-height: 1.5;
	  margin-bottom: 16px;
	}
  
	.image {
	  width: 100%;
	  max-height: 200px;
	  object-fit: cover;
	  border-radius: 8px;
	  margin-bottom: 16px;
	}
  
	.details {
	  display: flex;
	  flex-wrap: wrap;
	  justify-content: space-between;
	}
  
	.details-item {
	  font-size: 14px;
	  color: #666;
	  margin-bottom: 8px;
	}
  
	.details-item span {
	  font-weight: bold;
	  color: #333;
	}
  
	a {
	  color: #007bff;
	  text-decoration: none;
	  margin-top: 16px;
	  display: inline-block;
	}
  
	a:hover {
	  text-decoration: underline;
	}
  </style>
  