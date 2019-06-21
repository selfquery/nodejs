
let count = 0;

function test () {
    count++
    console.log(true);
    if (count === 25) clearInterval(this);
};

setInterval(test, 250)