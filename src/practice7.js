import axios from 'axios';
import * as cheerio from 'cheerio';

const base_url = "https://search.naver.com/search.naver?ssc=tab.news.all&where=news&sm=tab_jum&query=%EC%9D%B4%EC%B0%A8%EC%A0%84%EC%A7%80";

const objs = [];

(async() => {
    const res = await axios.get(base_url);
    
    const $ = cheerio.load(res.data);

    const parseTitle = $('.news_tit');

    const titles = parseTitle.map((idx, ele) => 
        $(ele).attr('title')
    ).get();

    const parsePress = $('.info.press');

    const presses = parsePress.map((idx, ele) => 
        $(ele).text()
    ).get();

    const parseDesc = $('.api_txt_lines.dsc_txt_wrap');

    const desc = parseDesc.map((idx, ele) => 
        $(ele).text()
    ).get();

    const parseImg = $('img.thumb')

    const imgs = parseImg.map((idx, ele) => {
       return $(ele).attr('data-lazysrc');
    }).get();

    const parseClusterSection = $('.news_cluster:first').find('li').find('a');

    const clusterNews = parseClusterSection.map((idx, ele) => {
        return $(ele).attr('title')
    }).get();

    objs.push({
        title: titles,
        pressName: presses,
        desc: desc,
        img: imgs,
        clusterNews: clusterNews
    })

    console.log(objs);
})()