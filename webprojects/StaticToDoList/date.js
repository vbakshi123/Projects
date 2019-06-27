
module.exports.getDate = getDate;

function getDate (){

var options = { 
    weekday: 'long', 
    month: 'long', 
    day: 'numeric' 
};

var today  = new Date();
var dateformat = today.toLocaleDateString("en-US", options); // Saturday, September 17, 2016

return dateformat;
}

module.exports.getDay = getDay;

function getDay (){

var options = { 
    weekday: 'long', 
    
};

var today  = new Date();
var dateformat = today.toLocaleDateString("en-US", options); // Saturday, September 17, 2016

return dateformat;
}

