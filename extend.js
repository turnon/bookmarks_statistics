var node_proto = Object.prototype;

node_proto.getAncestors = function(callback){
  var ps = [];
  function get_parent_node(pid){
    pid ? chrome.bookmarks.get(pid, after_get_node) : callback(ps);
  }
  function after_get_node(nodes){
    p_node = nodes[0];
    ps.push(p_node);
    get_parent_node(p_node.parentId);
  }
  get_parent_node(this.parentId);
};

node_proto.getDescendants = function(filter){
  var desc = [];
  if(this.children){
    this.children.forEach(function(c){
      filter ? (filter(c) && desc.push(c)) : desc.push(c) ;
      c.getDescendants(filter).forEach(function(d){
        desc.push(d);
      });
    });
  }
  return desc;
};

node_proto.getBookmarkDescendants = function(){
  return this.getDescendants(function(node){
    return node['children'] === undefined;
  });
};