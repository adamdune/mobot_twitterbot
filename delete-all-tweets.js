// This is a dependency-less utility function
require('dotenv').config()
const Twit = require('twit');

let T = new Twit({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET
})

let counter = 0;

T.get('statuses/user_timeline', { screen_name: 'localhost3002' }, (err, data, res) => {
    if (err) throw err;
    console.log('Deleting');
    data.forEach((elem,i) => {
        T.post('statuses/destroy/:id', { id: elem.id_str }, (err, data, res) => {
            if (err) throw err;
            if (i !== (data.length - 1))
            {process.stdout.write('-');}
            else{process.stdout.write('✔');}
        })
        counter++;
    });  
});

process.stdout.write(`Deleted ${counter} tweets`)