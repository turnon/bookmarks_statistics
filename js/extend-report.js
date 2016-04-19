define(["underscore"], function(){

  var util =  {
    htmlId : function(report){
      return report.name.replace(/\s/g,'_');
    },
  };

  return util;

});