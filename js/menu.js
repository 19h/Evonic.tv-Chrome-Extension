document.addEventListener('DOMContentLoaded', function() {
  document.body.style.margin = '0px';
  chrome.storage.local.get('MovieStorage', function (result) {
    var movieList = result.MovieStorage;
    var content = '<li><div>Movies:</div></li>';
    for (var i = 0; i < movieList.length; i++) {
      content = content +
      '<li>' +
        '<div class="movieItem">' +
          '<p id="movieTitle">' + movieList[i].title + '</p>' +
          '<ul id="shortcutMenu">' +
            '<li class="shortcut fa fa-download" x-action="download" x-title="' + movieList[i].title + '" x-url="' + movieList[i].url + '">' +
            '<li class="shortcut fa fa-external-link" x-action="copyLink" x-title="' + movieList[i].title + '" x-url="' + movieList[i].url + '">' +
            '<li class="shortcut fa fa-ban" x-action="remove" x-title="' + movieList[i].title + '" x-url="' + movieList[i].url + '">' +
          '</ul>' +
      '</li>';
    }
    document.getElementById('movieList').innerHTML = content;
    var listElements = document.getElementsByClassName('shortcut');
    for (var j = 0; j < listElements.length; j++) {
      switch(listElements[j].getAttribute('x-action')) {
      case 'download':
        listElements[j].addEventListener('click', function() {
          var element = document.createElement('a');
          element.setAttribute('href', this.getAttribute('x-url'));
          element.setAttribute('download', this.getAttribute('x-title') + '.mkv');
          element.style.display = 'none';
          document.body.appendChild(element);
          element.click();
          document.body.removeChild(element);
        });
        break;
      case 'copyLink':
        listElements[j].addEventListener('click', function() {
          const input = document.createElement('input');
          input.style.position = 'fixed';
          input.style.opacity = 0;
          input.value = this.getAttribute('x-url');
          document.body.appendChild(input);
          input.select();
          document.execCommand('Copy');
          document.body.removeChild(input);
        });
        break;
      case 'remove':
        listElements[j].addEventListener('click', function() {
          chrome.storage.local.get('MovieStorage', function (result) {
            var toBeSliced = 0;
            var movieList = result.MovieStorage;
            for (var i = 0; i < movieList.length; i++) {
              if (movieList[i].title == this.getAttribute('x-title')) {
                toBeSliced = i + 1;
                var parent = this.parentNode.parentNode.parentNode.parentNode;
                parent.removeChild(this.parentNode.parentNode.parentNode);
              }
            }
            var newList = movieList.slice(toBeSliced);
            chrome.storage.local.set({'MovieStorage': newList});
          }.bind(this));
        });
        break;
      }
    }
  });
});
