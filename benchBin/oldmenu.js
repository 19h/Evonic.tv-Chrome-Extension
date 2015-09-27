document.addEventListener('DOMContentLoaded', function() {
  document.body.style.margin = '0px';
  chrome.storage.local.get('MovieStorage', function (result) {
    console.log(result);
    console.log('hihi');
  });
  chrome.runtime.sendMessage({cmd: 'getMovies'},
    function(response) {
      var movieList = response.msg;
      console.log(movieList);
      var content = '<li><div>Movies:</div></li>';
      for (var i = 0; i < movieList.length; i++) {
        content = content +
        '<li>' +
          '<div class="movieItem">' +
            '<p>' + movieList[i].title + '</p>' +
            '<ul id="shortcutMenu">' +
              '<li class="shortcut fa fa-download" x-action="download" x-title="' + movieList[i].title + '" x-url="' + movieList[i].url + '">' +
              '<li class="shortcut fa fa-external-link" x-action="copyLink" x-title="' + movieList[i].title + '" x-url="' + movieList[i].url + '">' +
              '<li class="shortcut fa fa-play" x-action="openPlayer" x-title="' + movieList[i].title + '" x-url="' + movieList[i].url + '">' +
            '</ul>' +
        '</li>';
      }
      document.getElementById('movieList').innerHTML = content;
      var listElements = document.getElementsByClassName('shortcut');
      var el = null;
      for (var j = 0; j < listElements.length; j++) {
        // console.log(listElements[j].getAttribute('x-action') + listElements[j].getAttribute('x-url'));
        switch(listElements[j].getAttribute('x-action')) {
          case 'download':
            listElements[j].addEventListener('click', function() {
              console.log(this.getAttribute('x-url'));
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
              console.log('tryin');
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
          case 'movieList':
            alert('todo');
          break;
        }
      }
    }
  );
});

/*
if (request.cmd == "getMovies") {
  sendResponse({msg: request.cmd});
} in background*/
