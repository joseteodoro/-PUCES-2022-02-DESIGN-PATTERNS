const axios = require('axios');
const json = require('./urls.json')

const filePath = './output.txt';

download google 200
download github 100

300, 100, 200

const download = async (url) => {
    const res = await axios.get(url);
    const content = readFileSync(filePath);
    writeFileSync(filePath, content + res.data);
}

// download das paginas
Promise.all(json.map(download))

// race condition

// dead lock

const sum = 0;

urls
    .map(urlDownload)
    .map(sizeOfBody)
    .reduce(sumAll)