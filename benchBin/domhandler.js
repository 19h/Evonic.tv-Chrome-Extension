document.addEventListener('DOMContentLoaded', function() {
  document.body.style.margin = '0px';
  var copybtn = document.getElementById('action_copy');
  /*
  copybtn.addEventListener('click', function() {
    alert('hi');
    chrome.tabs.getSelected(null, function(tab) {
      chrome.tabs.executeScript(null, {file: "draft.js"});
    });
  });
  */
  copybtn.addEventListener('click', function() {
    chrome.tabs.executeScript(null, {file: "draft.js"});
  });
});

chrome.tabs.getSelected(null, function(tab) {
  chrome.tabs.sendRequest(tab.id, {method: "getText"}, function(response) {
    if(response.method=="getText"){
      alltext = response.data;
    }
  });
});

function getCurrentTabUrl(callback) {
  var queryInfo = {
    active: true,
    currentWindow: true
  };
  chrome.tabs.query(queryInfo, function(tabs) {
    var tab = tabs[0];
    var url = tab.url;
    console.assert(typeof url == 'string', 'tab.url should be a string');
    callback(url);
  });
}
