document.addEventListener('DOMContentLoaded', function(){
  chrome.bookmarks.getTree(function(node){
    var hash = Object.create(null);
    
    function add(node){
      hash[node.title] || (hash[node.title] = []);
      hash[node.title].push(node);
    }
    
    var bookmarks = node[0].getBookmarkDescendants();
    
    bookmarks.forEach(function(node){
      add(node);
    });
    
    var dup = [];
    
    var dup_count = 0;
    var getAncestors_done_count = 0;

    Object.keys(hash).forEach(function(k){
      var arr = hash[k];
      if(arr.length > 1){
        dup_count = dup_count + arr.length;
        arr.forEach(function(node){
          node.getAncestors(function(ans){
            node.ancestors = ans;
            getAncestors_done_count = getAncestors_done_count + 1;
          });
        });
        var o = Object.create(null);
        o['title'] = k;
        o['bookmarks'] = arr;
        dup.push(o);
      }
    });

    function format(obj){
      var list = '<ul>' + obj.bookmarks.map(function(bm){return '<li>' + bm.ancestors.reverse().map(function(dir){return dir.title;}).join("/") + '</li>'; }).join("") + '</ul>';
      return '<h3>' + obj.title + '</h3>' + list;
    }
    
    (function print(){
      if(getAncestors_done_count === dup_count){
        var html = dup.map(function(obj){
          return format(obj);
        }).join("");
        document.getElementById("main").innerHTML = html;
      }else{
        setTimeout(arguments.callee, 0);
      }
    })();


  });
});