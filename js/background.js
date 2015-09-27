var movieList = [];

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		if (request.cmd === 'addMovie') {
			var knownMovie = movieList.some(function (movie) {
				return movie.title === request.title;
			});

			if (knownMovie) {
				sendResponse({
					msg: request.cmd + ' movie exists'
				});
			} else {
				movieList.push({
					title: request.movieName,
					url: request.movieURL
				});
				sendResponse({
					msg: request.cmd
				});
			}

			chrome.storage.local.set({
				'MovieStorage': movieList
			});
		}
	}
);