const fs = require('fs');

//const files = fs.readdirSync('./');
//console.log(files);

const files = fs.readdir('./', (err, files) => {
  if (err) {
    console.log(`Error: ${err}`);
  } else {
    console.log(`Result: ${files}`);
  }
});