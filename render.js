function render(report){

    var sub_report_names = _.pluck(report, 'name');

    $.get("tmpl/reports.tmpl").then(function(tm){
      $("#main").html(_.template(tm)({subs: sub_report_names}));
    });

    _.each(sub_report_names, function(tmpl_name){
      $.get("tmpl/" + tmpl_name + ".tmpl").then(function(tm){
        $("#" + tmpl_name).html(_.template(tm)(report));
      });
    });

}