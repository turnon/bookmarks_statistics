define(["https://www.gstatic.com/charts/loader.js"], function(){

  return new Promise(function(res){
    google.charts.load("current", {packages:["corechart"]});
    google.charts.setOnLoadCallback(res);
  });

});