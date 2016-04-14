require.config({
　　shim: {
　　　　'underscore':{
　　　　　　exports: '_'
　　　　}
　　},
    baseUrl: "js",
　　paths: {
　　　　"jquery": "lib/jquery-2.2.2.min",
　　　　"underscore": "lib/underscore-min"
　　}
});

var root;

require(['jquery', 'underscore', "getTree", "https://www.gstatic.com/charts/loader.js"], function ($, _, getTreeAndRender){

  google.charts.load("current", {packages:["corechart"]});

  google.charts.setOnLoadCallback(function(){

      $(getTreeAndRender);

      _.each(
        ['onCreated', 'onRemoved', 'onChanged', 'onMoved', 'onChildrenReordered', 'onImportEnded'],
        function(event){chrome.bookmarks[event].addListener(getTreeAndRender);}
      );

  });

});