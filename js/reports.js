define(["date_utils"], function(dut){
  return [
    { 
      name : "duplicate links",
      display : "text",
      method : function(bm){return bm.title;},
      filter : function(group){return group.length > 1;}
    },
    { 
      name : "capacity of each dir",
      display : "PieChart",
      method : function(bm){return bm.ancestors[0].title;}
    },
    { 
      name : "month",
      display : "text",
      method : function(bm){return dut.cd2yymm(bm.dateAdded);}
    },
    { 
      name : "hosts",
      display : "PieChart",
      method : function(bm){return /\/\/(.*?)\//.exec(bm.url)[1];}
    },
  ];
});