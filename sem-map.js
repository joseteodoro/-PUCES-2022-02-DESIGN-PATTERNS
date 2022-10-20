
const axios = require('axios');
const json = require('./urls.json')

// download das paginas

const run = async () => {
    await axios.get(json[0])
    await axios.get(json[1])
    await axios.get(json[2])
    await axios.get(json[3])  
}

run()