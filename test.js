require('dotenv').config()
const Twit = require('twit');
const fs = require('fs');
const respond_to_mentions = require('./mobot_modules/respond-to-mentions');
const daily_dota2_quotes = require('./mobot_modules/daily-dota2-quote');

console.log('Mobot is starting!')

let T = new Twit({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET
})

T.get('statuses/mentions_timeline', (err,data,res)=>{
   if (err) throw err;
   data.forEach(elem => {
      console.log(`${elem.id_str} - ${elem.user.screen_name} - ${elem.text}`)
   });
})