import axios from 'axios';
import * as cheerio from 'cheerio';

const base_url = "https://search.daum.net/search?w=news&nil_search=btn&DA=NTB&enc=utf8&cluster=y&cluster_page=";
const search_url = "&q=%EA%B8%88%EC%9C%B5%20%EC%84%9C%EB%B9%84%EC%8A%A4";

const headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36",
};
const obj = [];

const getNewsBySpecificPage = async(page) => {
        for(let i = 1; i <= page; i++) {
            const full_url = `${base_url}${i}${search_url}`;
    
            const res = await axios.get(full_url, headers);
            // console.log(res.data);
    
            const $ = cheerio.load(res.data);
    
            const parseTitles = $('.item-title');
    
            const titles = parseTitles.map((idx, x) => 
                $(x).text()
            ).get().filter(x => x.trim().length > 0)
    
            const parseAbbrContents = $('.conts-desc')
    
            const abbrContents = parseAbbrContents.map((idx, ele) => 
                $(ele).text()
            ).get().filter(x => x.trim().length > 0)
    
            // console.log(abbrContents)
    
            const parseCompany = $('.tit_item .txt_info')
    
            const companies = parseCompany.map((idx, ele) => 
                $(ele).text()
            ).get().filter(x => x.trim().length > 0)
    
            const date = $('.gem-subinfo')
    
            const dates = date.map((idx, ele) => 
                $(ele).text()
            ).get().filter(x => x.trim().length > 0);
    
            // console.log(dates);
    
            const parseUrl = $('.item-title a');
            
            const urls = parseUrl.map((idx, ele) => 
                $(ele).attr('href')
            ).get();
    
            // console.log(urls)
    
            const imgs = $('.wrap_thumb').find('img').attr('data-original-src');

            obj.push({
                title: titles,
                company: companies,
                desc: abbrContents,
                date: dates,
                url: urls,
                imageUrl: imgs,
            });
        }
}


(async() => {
    await getNewsBySpecificPage(3);
    const jsonData = await JSON.stringify(obj);
    console.log(jsonData);
})()