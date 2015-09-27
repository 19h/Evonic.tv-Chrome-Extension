var movieList = [];
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.cmd == 'addMovie') {
      var isNew = true;
      for (var i = 0; i < movieList.length; i++) {
        if (movieList[i].title == request.title) {
          isNew = false;
        }
      }
      if (isNew) {
        movieList.push({title: request.movieName, url: request.movieURL});
        sendResponse({msg: request.cmd});
      } else {
        sendResponse({msg: request.cmd + ' movie exists'});
      }
      chrome.storage.local.set({'MovieStorage': movieList});
    }
  }
);
