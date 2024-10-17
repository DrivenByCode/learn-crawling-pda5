import axios from 'axios';

// import { Cheerio } from 'cheerio';
import * as cheerio from 'cheerio';

(async ()=>{
    const res = await axios.get('https://example.com/');
    console.log(res);
    const data = res.data;
    console.log(data); 

    const $ = cheerio.load(data);
    // tag select
    const $h1 = $('h1');
    console.log($h1.text()) // text 추출
    // console.log($h1);
    const $pTags = $('div').children('p');
    console.log($pTags.text());

    // 속성 추출
    const url = $('a').prop('href');
    console.log("url", url);

    const pTagsText = $pTags.map((idx, elem)=>{
        return $(elem).text()
    }).get();
    console.log("-".repeat(10));
    console.log(pTagsText);

    const p1 = $pTags[0];

    console.log($(p1).text())

    let result = []
    for (let i =0; i<$pTags.length; i++){
        result.push($($pTags[i]).text());
    }
    console.log(result);

    const anchorTag = $($pTags[1]).find("a");
    console.log($(anchorTag).prop('href'));
})()