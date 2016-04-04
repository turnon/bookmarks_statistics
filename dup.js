function renderBM(root){

    var bookmarks = getBookmarkDescendants(root);

    var groupByTitle = _.groupBy(bookmarks, function(bm){return bm.title;});

    var dup = _.reduce(groupByTitle, function(dup, grp, title){
                  if(grp.length > 1) dup[title] = grp;
                  return dup;
                  }, Object.create(null));
    
    $.get("tmpl/dup.tmpl").then(function(tm){
      $("#main").html(_.template(tm)({dup: dup}));
    });

}