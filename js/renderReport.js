define(["underscore", "renderAction"], function(_, renderAction){
  return function(report){

    _.each(report, function(r){
      var print = renderAction(r);
      print(r);
    });

  }
});