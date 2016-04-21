define(["underscore", "jquery"], function(_, $){
  return function(report){

      var sub_report_names = _.pluck(report, 'name');

      return new Promise(function(res){
          $.get("tmpl/reports.tmpl").then(function(tm){
            $("#main").html(_.template(tm)({subs: sub_report_names}));
            res(report);
          });
      });

  }
});