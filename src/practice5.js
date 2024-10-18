import axios from 'axios';
import * as cheerio from 'cheerio';

const decoder = new TextDecoder('euc-kr');

const headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36",
};

let options = {
    method: 'GET',
    url: 'https://finance.naver.com/item/news_notice.naver?code=005930&page=',
    responseType: 'arraybuffer',
    charset: 'euc-kr',
    responseEncodig: 'euc-kr',
    header: headers
};


(async() => {
    const res = await axios.request(options);

    const contents = decoder.decode(res.data);

    // console.log(contents)

    const $ = cheerio.load(res.data);

    console.log($.text());

    const $table = $('.type5');

    const $rows = $table.find('td.title').find('a.tit');

    console.log($rows.text());
})()