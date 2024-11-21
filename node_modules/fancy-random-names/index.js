const names = require('./names')


function getRandomName() {  
    const randomIndex = Math.floor(Math.random() * names.length);
    return names[randomIndex];
}

function getNRandomNames(n){
    const randomIndex = Math.floor(Math.random() * names.length);
    let randomNames = [];
    // console.log(randomIndex);
    for(let i = 1;i <= n; ++i){
        randomNames.push(names[(randomIndex + i) % names.length]);
    }

    return randomNames;
}



module.exports = {
    getRandomName,
    getNRandomNames,
    names
};
