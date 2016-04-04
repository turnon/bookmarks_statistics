document.addEventListener('DOMContentLoaded', function(){
  chrome.bookmarks.getTree(function(node){

    var bookmarks = getBookmarkDescendants(node[0]);

    var render = _.after(bookmarks.length, renderBM);

    _.each(bookmarks, function(node){
        getAncestors(node, function(ans, n){
          n.ancestors = ans;
          render(bookmarks);
        });
    });

  });
});