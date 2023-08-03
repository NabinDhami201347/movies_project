<script>
	import { page } from '$app/stores';
	import { enhance } from '$app/forms';
</script>

<header class="py-4 border-b-2 flex items-center justify-between w-11/12 mx-auto">
	<a href="/" class="hover:underline transition-colors duration-300 ease-in-out">
		<h2 class="text-xl text-blue-500 ont-semibold">Movies Database</h2>
	</a>

	<div class="flex items-center gap-4 list-none">
		<ul class="flex items-center gap-4">
			{#if $page.data.user}
				<li class="hover:underline transition-colors duration-300 ease-in-out">
					<a href="/">Home</a>
				</li>
				<li class="hover:underline transition-colors duration-300 ease-in-out">
					<a href="/nowplaying">Now Playing</a>
				</li>
				<li class="hover:underline transition-colors duration-300 ease-in-out">
					<a href="/toprated">Top Rated</a>
				</li>
				<form action="/logout" method="post" use:enhance>
					<button type="submit">Logout</button>
				</form>
			{:else}
				<li class="py-2 px-4 bg-green-600 rounded-md text-white hover:bg-green-800">
					<a href="/login">Sign in</a>
				</li>
				<li class="py-2 px-4 bg-blue-600 rounded-md text-white hover:bg-blue-800">
					<a href="/register">Sign up</a>
				</li>
			{/if}
		</ul>
	</div>
</header>
