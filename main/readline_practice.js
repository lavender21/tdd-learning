const readline = require('readline');

const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
});
const rl2 = readline.createInterface({
    input:process.stdin,
    output:process.stdout
});
rl.on('line', input => {
    switch (input){
        case '1':
            rl.on('line', input => {
                console.log('1.1>> '+input);
            });
            break;
        case '2':
            rl.on('line', input => {
                rl.close();
            });
            break;
        default:
            break;
    }
   console.log('1>'+input);
});
