document.addEventListener('DOMContentLoaded', function() {
	document.body.style.margin = '0px';

	chrome.storage.local.get('MovieStorage', function(result) {
		var movieList = result.MovieStorage;
		
		var content = '<li><div>Movies:</div></li>';

		var movieItem = function (movie) {
			return '<li>' +
					'<div class="movieItem">' +
						'<p id="movieTitle">' + movie.title + '</p>' +
						'<ul id="shortcutMenu">' +
							'<li class="shortcut fa fa-download" x-action="download" x-title="' + movie.title + '" x-url="' + movie.url + '">' +
							'<li class="shortcut fa fa-external-link" x-action="copyLink" x-title="' + movie.title + '" x-url="' + movie.url + '">' +
							'<li class="shortcut fa fa-ban" x-action="remove" x-title="' + movie.title + '" x-url="' + movie.url + '">' +
						'</ul>' +
					'</div>' +
				'</li>';
		}

		if (movieList) {
			movieList.forEach(function (movie) {
				content += movieItem(movie);
			})
		}

		document.getElementById('movieList').innerHTML = content;

		var listElements = document.getElementsByClassName('shortcut');
		    listElements = Array.prototype.slice.call(listElements);

		var downloadClick = function() {
			var element = document.createElement('a');
			    element.setAttribute('href', this.getAttribute('x-url'));
			    element.setAttribute('download', this.getAttribute('x-title') + '.mkv');
			    element.style.display = 'none';
			
			document.body.appendChild(element);
			
			element.click();
			
			document.body.removeChild(element);
		};

		var copyLinkClick = function() {
			var input = document.createElement('input');
			    input.style.position = 'fixed';
			    input.style.opacity = 0;
			    input.value = this.getAttribute('x-url');
			
			document.body.appendChild(input);
			
			input.select();
			
			document.execCommand('Copy');
			document.body.removeChild(input);
		};

		var removeClick = function() {
			var self = this;

			chrome.storage.local.get('MovieStorage', function(result) {
				var toBeSliced = 0;
				var movieList = result.MovieStorage;

				movieList.forEach(function (movie) {
					if (movie.title == self.getAttribute('x-title')) {
						toBeSliced = i + 1;
						var enclosure = self.parentNode.parentNode.parentNode,
						    enclosureParent = enclosure.parentNode;
						
						enclosureParent.removeChild(enclosure);
					}
				})

				var newList = movieList.slice(toBeSliced);

				chrome.storage.local.set({
					'MovieStorage': newList
				});
			});
		};

		var listElementHandler = function (action) {
			if (action === 'download')
				return downloadClick;

			if (action === 'copyLink')
				return copyLinkClick;

			if (action === 'remove')
				return removeClick;
		}

		listElements.forEach(function (listElement) {
			var action = listElement.getAttribute('x-action');
			    actionHandler = listElementHandler(action);

			if (actionHandler) {
				return listElement.addEventListener('click', actionHandler);
			}
		})
	});
});