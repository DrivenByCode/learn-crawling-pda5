import axios from 'axios';
import * as cheerio from 'cheerio';

const base_url = "https://finance.naver.com/item/sise_day.naver?code=005930";

const headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36",
};

(async() => {
    const res = await axios.get(base_url, headers);

    // console.log(res.data);

    const $ = cheerio.load(res.data);

    // const parseDate = $('table.type2 > span.tah.p10.gray03');

    const parsePrice = $('tbody > tr > td')

    // console.log(parseDate);

    const prices = parsePrice.map((idx, el) =>   
        $(el).get(0)
    ).get();

    console.log(prices);
})()