const fs = require('fs');

module.exports = function (T) {
   const dota2VoiceLineJSON = JSON.parse(fs.readFileSync('./dota2_voice_lines/dota2-voice-lines.json'));

   function returnMillisTill8PM() {
      const now = new Date();
      let millisTill8PM = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 20, 0, 0, 0) - now;

      if (millisTill8PM < 0) {
         millisTill8PM += 24 * 60 * 60 * 1000
      }

      return millisTill8PM
   }

   function returnRandomLine(file) {
      const randomHero = file.lines[Math.floor(Math.random() * file.lines.length)]
      const randomLine = randomHero.lines[Math.floor(Math.random() * randomHero.lines.length)]

      return `${randomLine} -${randomHero.name}`
   }

   function dailyRecursion() {
      T.post('statuses/update', { status: returnRandomLine(dota2VoiceLineJSON) }, (err) => {
         if (err) throw err;
         let nextMillisTill8PM = returnMillisTill8PM();
         process.stdout.write('\n*Daily Dota 2 quote tweeted!*');
         setTimeout(dailyRecursion, nextMillisTill8PM);
      });
   }
   let firstMillisTill8PM = returnMillisTill8PM();
   process.stdout.write(`\n*${Math.floor(firstMillisTill8PM/(1000*60*60))} hour(s) till the next Dota 2 quote*`)
   setTimeout(dailyRecursion, firstMillisTill8PM);
}