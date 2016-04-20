define(["underscore", "jquery", "extend-report", "showDetail"], function(_, $, rp_utl, detail){

  function text(report){
    $.get("tmpl/text.tmpl").then(function(tm){
      $("#" + rp_utl.htmlId(report))
        .html(_.template(tm)({report : report.data}))
        .on("click", ".item", function(e){
          detail(report, e.target.innerText);
        });
    });
  }

  function google_chart(report){

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

    var chart = new google.visualization[report.display](document.getElementById(rp_utl.htmlId(report)));
    chart.draw(data_table, options);

    google.visualization.events.addListener(chart, 'select', selectHandler);

    function selectHandler(e) {
      var selected = chart.getSelection()[0];
      detail(report, org_data[selected.row + 1][0]);
    }
  }

  return function(report){
    return (report.display === 'text' ? text : google_chart);
  }

});