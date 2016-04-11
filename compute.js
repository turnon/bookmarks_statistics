function compute(root){

    var bookmarks = getBookmarkDescendants(root);

    var dirs = getDirDescendants(root);

    var report = Object.create(null);

    report.dup = _.reduce(
                   _.groupBy(
                     bookmarks,
                     function(bm){return bm.title;}
                   ),
                   function(dup, grp, title){if(grp.length > 1) dup[title] = grp;return dup;},
                   Object.create(null)
                 );

    report.dir_cap = _.sortBy(dirs, function(d){return getBookmarks(d).length;}).reverse();
    
    report.month = _.sortBy(
                     _.map(
                       _.groupBy(
                         bookmarks,
                         function(bm){return dut.cd2yymm(bm.dateAdded);}
                       ),
                       function(grp, m){return {month: m, bookmarks : grp}}
                     ),
                     function(obj){ return parseInt(obj.month);}
                   );

     report.hosts = _.sortBy(
                     _.map(
                       _.groupBy(
                         bookmarks,
                         function(bm){return /\/\/(.*?)\//.exec(bm.url)[1];}
                       ),
                       function(grp, h){return {host: h, bookmarks : grp}}
                     ),
                     function(obj){ return obj.bookmarks.length;}
                   ).reverse();

    return report;

}