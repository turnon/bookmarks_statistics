function render(report){

    var sub_report_names = _.pluck(report, 'name');

    $.get("tmpl/reports.tmpl").then(function(tm){
      $("#main").html(_.template(tm)({subs: sub_report_names}));

      _.each(report, function(r){
        var print = print_action(r);
        print();
      });

    });

    function print_action(report){
      return function(){

        if(report.display === 'text') return;

        var count = _.sortBy(
          _.map(report.data, function(group, key){
            return [key, group.length];
          }),function(data){
            return data[1];
          }).reverse();

        var org_data = [[report.name, 'count']].concat(count);

        var data_table = google.visualization.arrayToDataTable(org_data);

        var options = {
          title: report.name,
          pieHole: 0.4,
          width: $(window).width() * 0.8,
          height: $(window).height() * 0.8,
        };

        var chart = new google.visualization[report.display](document.getElementById(report.name.replace(/\s/g,'_')));
        chart.draw(data_table, options);

        google.visualization.events.addListener(chart, 'select', selectHandler);

        function selectHandler(e) {
          var selected = chart.getSelection()[0];
          console.log(selected.row, report.data[org_data[selected.row + 1][0]]);
        }
      }
    }

    return;

    _.each(sub_report_names, function(tmpl_name){
      $.get("tmpl/" + tmpl_name + ".tmpl").then(function(tm){
        $("#" + tmpl_name).html(_.template(tm)(report));
      });
    });

}