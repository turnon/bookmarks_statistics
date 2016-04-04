function getAncestors(node, callback){
  var ps = [];
  function get_parent_node(pid){
    pid ? chrome.bookmarks.get(pid, after_get_node) : callback(ps, node);
  }
  function after_get_node(nodes){
    p_node = nodes[0];
    ps.push(p_node);
    get_parent_node(p_node.parentId);
  }
  get_parent_node(node.parentId);
};

function getDescendants(node, filter){
  var desc = [];
  if(node.children){
    node.children.forEach(function(c){
      filter ? (filter(c) && desc.push(c)) : desc.push(c) ;
      getDescendants(c, filter).forEach(function(d){
        desc.push(d);
      });
    });
  }
  return desc;
};

function getBookmarkDescendants(node){
  return getDescendants(node, function(node){
    return node['children'] === undefined;
  });
};