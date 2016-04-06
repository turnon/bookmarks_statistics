var root;

document.addEventListener('DOMContentLoaded', function(){
  chrome.bookmarks.getTree(function(node){
    root = node[0];
    setAncestors(root);
    renderBM();
  });
});