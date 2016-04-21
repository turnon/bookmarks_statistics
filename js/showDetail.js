define(["jquery", "modal"], function($){

  var $detail = $('#details');

  var $title = $detail.find('h3');
  var $body = $detail.find('.popup-body');

  var popup = $detail.popup({
    width: $(window).width() * 0.7,
    height: 600
  });

  function setTitle(report, groupName){
    $title.html([report.name, '=>', groupName].join('  '));
  }

  function setData(report, groupName){
    $.get("tmpl/detail.tmpl").then(function(tm){
      $body.html(_.template(tm)({links: report.data[groupName]}));
    });
  }

  return function(report, groupName){
    setTitle(report, groupName);
    setData(report, groupName);
    popup.open();
  }

});