import axios from 'axios';
import * as cheerio from 'cheerio';

const base_url = "https://search.daum.net/search?nil_suggest=btn&w=news&DA=SBC&cluster=y&q=%EA%B8%88%EC%9C%B5+%EC%84%9C%EB%B9%84%EC%8A%A4";
const headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36",
};

const obj = [];

(async() => {
    const res = await axios.get(base_url, {headers,});

    // console.log(res.data);

    const $ = cheerio.load(res.data);

    const parseUrl = $('.item-title a')
            
    const urls = parseUrl.map((idx, ele) => 
        $(ele).attr('href')
    ).get().filter(x => x.trim().length > 0)

    console.log(urls)

    const arrayLength = urls.length

    await Promise.all(
        urls.map(async(ele) => {
            const connectUrl = await axios.get(ele)
            const $$ = cheerio.load(connectUrl.data);
            obj.push($$.html());
        })
    )

    console.log(obj)
})()


