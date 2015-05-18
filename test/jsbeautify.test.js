var beautify_html = require('js-beautify').html;
var fs = require('fs');

fs.readFile('foo.html', 'utf8', function (err, data) {
    if (err) {
        throw err;
    }
    console.log(beautify_html(data, {indent_size : 4}));
});

