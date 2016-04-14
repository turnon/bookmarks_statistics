define(["underscore"], function(){

  var util =  {

     setAncestors : function(node){
       if(_.isUndefined(node.ancestors)) node.ancestors = [];
       if(node.children){
         _.each(node.children, function(c){
           c.ancestors = _.union([node], node.ancestors);
           that.setAncestors(c);
         });
       }
     },

     getAncestors : function(node, callback){
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
     },

     getPath : function(node){
       return _.clone(node.ancestors).reverse()
     },

     getDescendants : function (node, filter){
       var desc = [];
       if(node.children){
         node.children.forEach(function(c){
           filter ? (filter(c) && desc.push(c)) : desc.push(c) ;
           that.getDescendants(c, filter).forEach(function(d){
             desc.push(d);
           });
         });
       }
       return desc;
     },

     isBookmark : function(node){
       return node.children === undefined;
     },

     hasBookmark : function(node){
       return node.children && _.any(node.children, that.isBookmark);
     },

     getBookmarks : function(node){
       return _.filter(node.children, that.isBookmark);
     },

     getBookmarkDescendants : function(node){
       return that.getDescendants(node, that.isBookmark);
     },

     getDirDescendants : function (node){
       return that.getDescendants(node, that.hasBookmark);
     },

  };

  var that = util;

  return util;

});