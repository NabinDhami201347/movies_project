<script lang="ts">
	import type { ActionData } from './$types';
	import { enhance } from '$app/forms';

	export let form: ActionData;
</script>

<svelte:head>
	<title>Movies | Register</title>
</svelte:head>
<main class="w-1/3 my-20 mx-auto">
	<form action="?/register" method="POST" use:enhance class="flex flex-col">
		<label for="name">Name</label>
		<input type="text" name="name" class="border py-2 px-2" />

		<label for="email">Email</label>
		<input type="text" name="email" class="border py-2 px-2" />

		<label for="password">Password</label>
		<input type="password" name="password" class="border py-2 px-2" />

		<label for="confirmpassword">Confirm Password</label>
		<input type="password" name="confirmpassword" class="border py-2 px-2" />

		{#if form?.invalid}
			<p class="text-red-500">Username and password is required.</p>
		{/if}
		{#if form?.passwords}
			<p class="text-red-500">Passwords don't match.</p>
		{/if}
		<button type="submit" class="w-full mt-4 bg-blue-500 py-2 text-white">Sign up</button>
	</form>
</main>
