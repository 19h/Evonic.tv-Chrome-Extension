/*
document.addEventListener('DOMContentLoaded', function() {
  document.body.style.margin = '0px';
  chrome.runtime.sendMessage({cmd: 'getMovies'},
    function(response) {
      var movieList = response.msg;
      console.log(response.msg);
      var ul = document.getElementById('movieList');
      var li = document.createElement("li");
      var div = document.createElement("div");
      var container = document.createElement("ul");
      var download = document.createElement("li");
      var link = document.createElement("li");
      var vlc = document.createElement("li");
      var p = document.createElement("p");
      div.className = "movieItem";
      container.id = "shortcutMenu"
      download.className = "shortcut fa fa-download";
      link.className = "shortcut fa fa-external-link";
      vlc.className = "shortcut fa fa-play";
      for (var i = 0; i < movieList.length; i++) {
        li.appendChild(div);
        div.appendChild(p);
        p.appendChild(document.createTextNode(movieList[i].title))
        div.appendChild(container);
        container.appendChild(download);
        container.appendChild(link);
        container.appendChild(vlc);
        ul.appendChild(li);
      }
    });
    */
    /*
  var copybtn = document.getElementById('action_copy');
  copybtn.addEventListener('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
        console.log(response.msg);
      });
    });
  });

});
  */
