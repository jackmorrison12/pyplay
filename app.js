var stat = require('node-static');
 
var file = new stat.Server('./static');
 
require('http').createServer(function (request, response) {
    request.addListener('end', function () {
        file.serve(request, response);
    }).resume();
}).listen(process.env.PORT || 8000);
