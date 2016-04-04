document.addEventListener('DOMContentLoaded', function(){
  chrome.bookmarks.getTree(function(node){

    var root = node[0];

    var all_nodes = getDescendants(root);

    var render = _.after(all_nodes.length, renderBM);

    _.each(all_nodes, function(node){
        getAncestors(node, function(ans, n){
          n.ancestors = ans;
          render(root);
        });
    });

  });
});