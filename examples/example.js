#!/usr/bin/env node

var proc = require('../build/default/getrusage');
var util = require('util');


var start = proc.gettimeofday();
for (var i = 0; i < 50000; i++) {
  util.print('.');
}

process.on('exit', function() {
    var end = proc.gettimeofday();
    var sys = proc.getsystime() / 1000000;
    var user = proc.getusertime() / 1000000;
    var cpu = sys + user;
    var real = (end - start) / 1000000;
    var percentage = cpu / real; // man ps defines this as CPU time used divided by the time the process has been running (cputime/realtime ratio)

    console.log('');
    console.log(proc.usage());
    console.log('real: \t', real);
    console.log('user: \t', user);
    console.log('sys: \t', sys);
    console.log('%: \t', percentage);

});
