define(["renderLayout", "renderReport"], function(renderLayout, renderReport){
  return function(report){

      renderLayout(report).then(renderReport);

  }
});