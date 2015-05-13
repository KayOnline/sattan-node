var scope = 'top';
var f1 = function() {
console.log(scope);
};
f1(); 
var f2 = function() {
var scope = 'f2';
f1();
};
f2(); 


var f = function() {
var scope = 'f0';
(function() {
//var scope = 'f1';
(function() {
console.log(scope); // 输出 f1
})();
})();
};
f();

