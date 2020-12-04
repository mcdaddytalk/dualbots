const { spawn, fork } = require('child_process');
let children = [
    "./bot1/bot.js",
    "./bot2/bot.js",
]

let childManager = [];
const startChild = async (c, i)=> {
    console.log(`Spawning bot${i} with ${c}`);
    childManager[i] = spawn('node', [children[i]]);
    childManager[i].on('exit', () => startChild(c, i))
    childManager[i].stdout.on('data', (data) => {
        console.log(`[BOT${i}] ${data.toString()}`)
    })
    childManager[i].stderr.on('data', (data) => {
        console.log(`[BOT${i}] ${data.toString()}`)
    })
    childManager[i].on('close', (code) => {
        console.log(`child process exited with code ${code}`);
    })
}
children.forEach(startChild)