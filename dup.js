document.addEventListener('DOMContentLoaded', function(){x
  chrome.bookmarks.getTree(function(node){
    var hash = Object.create(null);
    
    function add(node){
      hash[node.title] || (hash[node.title] = []);
      hash[node.title].push(node);
    }
    
    var bookmarks = node[0].getDescendants().filter(function(node){
      return node['children'] === undefined;
    });
    
    bookmarks.forEach(function(node){
      add(node);
    });
    
    var dup = [];
    
    Object.keys(hash).forEach(function(k){
      var arr = hash[k];
      if(arr.length > 1){
        arr.forEach(function(node){
          node.getAncestors(function(ans){node.ancestors = ans});
        });
        var o = Object.create(null);
        o['title'] = k;
        o['bookmarks'] = arr;
        dup.push(o);
      }
    });
    
    console.log(dup);
  });
});