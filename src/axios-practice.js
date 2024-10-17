// common.js
// const axios = require('axios');
import axios from 'axios';

// axios.get('https://www.naver.com').then(response=>{
//     console.log(response);
//     return response.data;
// }).then(data=>{
//     console.log(data);
// });

(async ()=>{
    const res = await axios.get('https://www.naver.com');
    console.log(res);
    const data = res.data;
    console.log(data); 
})()