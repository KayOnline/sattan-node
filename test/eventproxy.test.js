var EventProxy = require('eventproxy');
var ep = EventProxy.create("a", "b", "c", function() {
	_.template(a, b, c);
});

$.get("a", function(a) {
	console.info("a");
	ep.emit("a", a);
});
$.get("b", function(b) {
	console.info("b");
	ep.emit("b", b);
});
$.get("c", function(c) {
	console.info("c");
	ep.emit("c", c);
});