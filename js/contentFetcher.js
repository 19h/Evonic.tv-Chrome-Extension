try {
	// Getting title and url for the currently loaded evonic page
	var title = document.getElementsByClassName('cms_article_title')[0].innerText.slice(4);
	var selector = document.querySelectorAll('[target="Videoframe"]')[1].href;
	var xhr = new XMLHttpRequest();
	xhr.open('GET', selector, true);

	xhr.onload = function(e) {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				var parser = new DOMParser();
				var doc = parser.parseFromString(xhr.responseText, 'text/html');
				var url = doc.querySelector('embed').getAttribute('src');

				chrome.runtime.sendMessage({
					cmd: 'addMovie',
					movieName: title,
					movieURL: url
				}, function(response) {
					console.log(response.msg);
				});
			} else {
				console.error(xhr.statusText + e);
			}
		}
	};

	xhr.onerror = function(e) {
		console.error(xhr.statusText + e);
	};
	xhr.send(null);
} catch (e) {
	console.log(e);
}