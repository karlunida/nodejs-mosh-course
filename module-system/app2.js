
const Logger = require('./loggerEventModule');
const logger = new Logger();

// Register a listener
logger.on('messageLogged', (eventArg) => {
    console.log('Listener called ', eventArg);
});

logger.log('Hello World'); 