define(["underscore", "extend"], function(_, bm_util){

  return function(root, reports_templ){

      var bookmarks = bm_util.getBookmarkDescendants(root);

      rpts = _.map(reports_templ, function(rp){

        var result = _.groupBy(bookmarks, rp.method);

        if(rp.filter){
          result = _.reduce(result, function(rs, group, key){
            if(rp.filter(group, key)) rs[key] = group;
            return rs;
          }, {});
        }

        return {
                  name: rp.name,
                  display: rp.display,
                  data: result
                };
      });

      return rpts;

  }
});