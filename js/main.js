require.config({
　　shim: {
　　　　'underscore': {exports: '_'}
　　},
    baseUrl: "js",
　　paths: {
　　　　"jquery": "lib/jquery-2.2.2.min",
        "modal": "lib/simple-popup.min",
　　　　"underscore": "lib/underscore-min"
　　}
});

var root;

require(['jquery', 'underscore', "getTree"], function ($, _, getTreeAndRender){

  $(getTreeAndRender);

  _.each(
    ['onCreated', 'onRemoved', 'onChanged', 'onMoved', 'onChildrenReordered', 'onImportEnded'],
    function(event){chrome.bookmarks[event].addListener(getTreeAndRender);}
  );

});