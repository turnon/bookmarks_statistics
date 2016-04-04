function setAncestors(node){
  if(_.isUndefined(node.ancestors)) node.ancestors = [];
  if(node.children){
    _.each(node.children, function(c){
      c.ancestors = _.union([node], node.ancestors);
      setAncestors(c);
    });
  }
};

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

function isBookmark(node){
  return node.children === undefined;
};

function hasBookmark(node){
  return node.children && _.any(node.children, isBookmark);
};

function getBookmarks(node){
  return _.filter(node.children, isBookmark);
};

function getBookmarkDescendants(node){
  return getDescendants(node, isBookmark);
};

function getDirDescendants(node){
  return getDescendants(node, hasBookmark);
};