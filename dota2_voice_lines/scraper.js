const rp = require('request-promise');
const cheerio = require('cheerio');
const fs = require('fs');

let arrayOfHeroNamesAndUrl = []
let voiceLineArray = []
let errorArray = []

rp({
    url: 'https://dota2.gamepedia.com/Template:VoiceNavSidebar',
    transform: body => cheerio.load(body)
})
    .then(($) => {
        console.log('Retrieving url and hero names')
        let div = $('td.notanavbox-list.notanavbox-even div').first();
        let a = $('a', div);
        a.each(function () {
            const heroName = $(this).text().trim()
            const path = $(this).attr('href')
            arrayOfHeroNamesAndUrl.push({ heroName, url: `https://dota2.gamepedia.com${path}` })
        });
        console.log('Starting');
        scrapeVoiceLine(arrayOfHeroNamesAndUrl);
    })
    .catch(err => console.log(err))

function scrapeVoiceLine(arrayOfHeroNamesAndUrl) {
    let i = 0;

    function next() {
        if (i < arrayOfHeroNamesAndUrl.length) {
            rp({
                url: arrayOfHeroNamesAndUrl[i].url,
                transform: body => cheerio.load(body)
            })
                .then(($) => {
                    // Extract voice lines under the header "Respawning"
                    process.stdout.clearLine();
                    process.stdout.cursorTo(0);
                    process.stdout.write(`${Math.round(((i + 1) / arrayOfHeroNamesAndUrl.length) * 100 * 100) / 100}%`);
                    let lines = [];
                    let div = $('div.mw-parser-output');
                    $('h2 span:contains("Respawning")', div).parent().nextAll('h2').first().nextAll('ul').remove();
                    let li = $('li', $('h2 span:contains("Respawning")', div).parent().nextAll('ul'))
                    if (li.length !== 0) {
                        li.each(function () {
                            lines.push($(this).clone().children().remove().end().text().trim());
                        })
                        voiceLineArray.push({ name: arrayOfHeroNamesAndUrl[i].heroName, lines: lines })
                    } else {
                        console.log(`Error at ${arrayOfHeroNamesAndUrl[i].heroName}`)
                        errorArray.push(arrayOfHeroNamesAndUrl[i].heroName);
                    }
                    ++i;
                    return next()
                })
                .catch(err => console.log(err));
        } else {
            process.stdout.write('\n');
            process.stdout.write('Writing to file');
            fs.writeFileSync('./dota2-voice-lines.json', JSON.stringify({ lines: voiceLineArray }));
            fs.writeFileSync('./error-log.json', JSON.stringify({ error: errorArray }));
            process.stdout.write('✔');
        }
    }
    
    process.stdout.write('0%')
    return next()
}
