define(function(){

  return function(report, groupName){
    console.log(report.name, groupName, report.data[groupName]);
  }

});