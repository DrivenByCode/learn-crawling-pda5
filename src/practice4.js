import axios from 'axios';
import * as cheerio from 'cheerio';

const decoder = new TextDecoder('euc-kr');

const headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36",
};

let options = {
    method: 'GET',
    url: 'https://finance.naver.com/item/sise.naver?code=005930',
    responseType: 'arraybuffer',
    charset: 'euc-kr',
    responseEncodig: 'euc-kr',
    header: headers
};


(async() => {
    const res = await axios.request(options);

    const contents = decoder.decode(res.data);

    const $ = cheerio.load(contents);

    const parseTable = $('.type2');

    const tableData = [];

    parseTable.find('tr').each((i, row) => {
        const prices = $(row).find('.tah.p11');
        
        prices.map((idx, ele) => {
            tableData.push($(ele).text().trim());   
        })
    })

    console.log(tableData);
})()