const EventEmitter = require('events');
const emitter = new EventEmitter();
// Register a listener
emitter.on('messageLogged', (eventArg) => {
    console.log('Listener called ', eventArg);
});

emitter.on('logging', (eventArg) => {
    console.log('Logging event: ', eventArg);
});

//raise an event
emitter.emit('messageLogged', {id:1 , url:'http://'}); 

emitter.emit('logging', {data: 'Hello World!'});