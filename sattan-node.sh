#!/bin/sh
NODE_ENV=production
DEAMON="nodemon ./bin/www"
APPNAME="Sattan-node"
PIDFILE="sattan-node.pid"

case "$1" in
    start)
        echo -e "\e[1;41m Starting $APPNAME...\e[0m"
        $DEAMON > /dev/null &
        echo $! > $PIDFILE
        ;;
    stop)
        echo -e "\033[1;34m Stopping $APPNAME...\033[0m"
        pid=cat $PIDFILE
        kill $pid
        #rm $PIDFILE
        ;;
esac
exit 0

