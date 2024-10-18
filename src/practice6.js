import axios from 'axios';

const base_url = "https://service.wadiz.kr/api/search/funding";

let options = {
    "headers": {
        "accept": "*/*",
        "accept-language": "ko-KR,ko;q=0.9",
        "content-type": "application/json",
        "priority": "u=1, i",
        "sec-ch-ua": "\"Chromium\";v=\"130\", \"Google Chrome\";v=\"130\", \"Not?A_Brand\";v=\"99\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
        "Referer": "https://www.wadiz.kr/",
        "Referrer-Policy": "strict-origin-when-cross-origin"
      },
      "body": "{\"startNum\":0,\"order\":\"recommend\",\"limit\":48,\"categoryCode\":\"\",\"endYn\":\"\"}",
      "method": "POST"
};

const objs = [];

(async() => {
    try{
        const res = await axios.post(base_url,options);
        // console.log(res.data);
       const dataList = res.data.data.list;

        dataList.map((ele, idx) => {
            if(idx < 1000) {
                const title = ele.title;
                const corpName = ele.corpName;
                const coreMessage = ele.coreMessage;
                const categoryName = ele.categoryName;
                
                const obj = {
                    title: title,
                    corpName: corpName,
                    coreMessage: coreMessage,
                    categoryName: categoryName,
                }

                objs.push(obj);
            }
        })

        console.log(objs);

    } catch(err){
        // console.log(err.data);
        // console.log(err.response);
    }
    // console.log(res.data);
})()
