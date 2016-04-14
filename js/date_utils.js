define(function(win, u){

  var u = {};

  function padZero(number) {  
    return (number < 10 ? "0" + number : number);
  }

  function chromeDateFormater(chromeDate){
    var dateObject = new Date(chromeDate),
        temp = [];

    for(var i = 1; i < arguments.length; i++){
      var ele = arguments[i];
      temp.push((typeof ele === "function" ? ele(dateObject) : ele));
    }

    return temp.join("");
  }

  u.yy = function(date){
    return date.getUTCFullYear().toString().slice(2);
  };

  u.mm = function(date){
    return padZero(date.getUTCMonth() + 1);
  };

  u.cd2yymm = function(number){
    return chromeDateFormater(number, u.yy, u.mm);
  };

  return u;

});