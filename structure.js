document.addEventListener('DOMContentLoaded', function(){
  chrome.bookmarks.getTree(function(node){
    var root = node[0];
    setAncestors(root);
    renderBM(root);
  });
});