define(["extend", "reports", "compute", "render"], function(bm_utl, reports, compute, render){

  return function (){
    chrome.bookmarks.getTree(function(node){
      root = node[0];
      bm_utl.setAncestors(root);
      console.log(compute(root,reports));
      render(compute(root,reports));
    });
  }

});