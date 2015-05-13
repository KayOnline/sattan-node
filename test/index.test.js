var logger = require('log4js').getLogger(__filename);
var os = require('os');

var cores = os.cpus().length;

var cluster = require('cluster');
var childs = {};
if (cluster.isMaster) {
    logger.debug("isMaster");
    
    for (var i=0; i<cores; i++) {
        var worker = cluster.fork();
        childs[worker.process.pid] = worker;
        worker.on('exit', function(code, signal) {
            logger.debug("worker [PID:%s] exited with code or signal [%s]", worker.process.pid, signal || code);
            var nWorker = cluster.fork();
            childs[nWorker.process.pid] = nWorker;
            logger.debug("restart worker [PID:%s] successfully.", nWorker.process.pid);
        });
    }

} else {
    logger.warn("a child process");
    // http.createServer(...);
}
