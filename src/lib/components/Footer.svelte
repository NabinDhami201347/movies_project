<script>
	const dateFormatter = new Intl.DateTimeFormat('en', {
		day: 'numeric',
		month: 'long',
		year: 'numeric'
	});
	let currentDate = new Date();
	let formattedDate = dateFormatter.format(currentDate);
</script>

<footer class="bg-gray-800 text-white py-4 text-center">
	<p>&copy; {formattedDate} Movies Database. All rights reserved.</p>
</footer>
