import axios from 'axios';
import * as cheerio from 'cheerio';
import fs from 'fs';

// quote, authorName, tags

const objs = [];

const base_url = 'https://quotes.toscrape.com';

const getInfoBySpecificPage = async(lastPage) => {{
    for(let i = 1; i <= lastPage; i++) {
        console.log(`${i}번 째 시작`)

        const obj = {"quote": [], "author": [], "tags": [], "birth": []};

        const res = await axios.get(`${base_url}/page/${i}`)
    
        // console.log(res.data)

        const $ = cheerio.load(res.data);

        const $quote = $(".quote .text");
        
        for(const o of $quote) {
            obj.quote.push($(o).text());
        }

        const $author = $(".quote .author");
        
        // console.log($author.text())

        for(const o of $author) {
            obj.author.push($(o).text());
        }

        const $tags = $(".quote .tags").find(".tag");

        for(const o of $tags) {
            obj.tags.push($(o).text());
        }

        const $authorBios = $('.quote a')

        for(const o of $authorBios) {
            const additionalLink = $(o).attr('href')
            const bio = await axios.get(`${base_url}${additionalLink}`)

            const $$ = cheerio.load(bio.data)
    
            const birth = $$(".author-born-date")

            const len = birth.text().trim().length;
            
            if(len > 0) {
                obj.birth.push(birth.text());
            } else if(len == 0) {
                obj.birth.push("null");
            }
        }

        objs.push(obj)
    }
    
}}


const saveFile = async() => {
    const saveData = JSON.stringify(objs)
    fs.writeFile('json-result.json', saveData, (err) => {
    console.error(err)
})
}

(async() => {
    await getInfoBySpecificPage(3);
    await saveFile();
})()