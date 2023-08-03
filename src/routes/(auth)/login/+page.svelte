<script lang="ts">
	import { enhance } from '$app/forms';

	export let form;
</script>

<svelte:head>
	<title>Movies | Login</title>
</svelte:head>

<main class="w-1/3 my-20 mx-auto">
	<form action="?/login" method="POST" use:enhance class="flex flex-col">
		<label for="email">Email</label>
		<input type="text" name="email" class="border py-2 px-2" />

		<label for="password">Password</label>
		<input type="password" name="password" class="border py-2 px-2" />

		{#if form?.noFound}
			<p class="text-red-500">No user found with this email.</p>
		{/if}
		{#if form?.invalid}
			<p class="text-red-500">Username and password is required.</p>
		{/if}
		{#if form?.credentials}
			<p class="text-rose-500">Credentials doesn't match.</p>
		{/if}

		<button type="submit" class="w-full mt-4 bg-blue-500 py-2 text-white">Sign in</button>
	</form>
</main>
