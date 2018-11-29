const fs = require('fs');

module.exports = function (T) {
    function replyToMentions() {
        let lastCheckedId = fs.readFileSync('./mobot_modules/respond-to-mention.txt', 'utf8');

        T.get('statuses/mentions_timeline', { since_id: lastCheckedId }, (err, data, res) => {
            process.stdout.write('\nChecking Mentions...');
            if (err) throw err;
            if (data.length !== 0) {
                lastCheckedId = data[0].id_str
                fs.writeFileSync('./mobot_modules/respond-to-mention.txt', lastCheckedId);
                process.stdout.write('Replying...')
                data.reverse().forEach(elem => {
                    if (elem.text.toLowerCase().includes("#greetme")) {
                        T.post('statuses/update', { status: `@${elem.user.screen_name} Hello ${elem.user.name}, my name is Mobot, a twitter bot`, in_reply_to_status_id: elem.id_str }, (err) => {
                            if (err) throw err;
                            process.stdout.write('+');
                        })
                    }
                    else if (elem.text.toLowerCase().includes("#sayhii")) {
                        T.post('statuses/update', { status: `@${elem.user.screen_name} hi!!!!!!!!!!!!!!1`, in_reply_to_status_id: elem.id_str }, (err) => {
                            if (err) throw err;
                            process.stdout.write('+');
                        })
                    }
                });
            };
        });
    }

    setInterval(replyToMentions, 15*1000)
}