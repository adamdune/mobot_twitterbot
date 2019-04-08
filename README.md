# mobot_twitterbot

A simple twitter bot that uses the [Twit](https://github.com/ttezel/twit) package:

## What does it do?

* When a user tweets @ the bot with one the following hashtag, the bot will give a canned response.

  * `#sayhi`

  * `#greetme`

* Tweet a quote from Dota 2 everyday at 20:00 (GMT +8). The quotes are scraped from the [Dota 2 Wiki](https://dota2.gamepedia.com/Dota_2_Wiki) using [request-promise](https://github.com/request/request-promise)/[cheerio](https://github.com/cheeriojs/cheerio).

## Prerequisites

* Node.js
* NPM
* A Twitter with a [Developer Account](https://developer.twitter.com/)

## Getting Started
Assuming you've already got a developer account. Follow the following steps

1. Install dependencies

```bash
  $ npm install
```
2. Create a Twitter app and generate the keys and tokens.
2. Create a .env file in the root directory with the following values.

```env
CONSUMER_KEY=...
CONSUMER_SECRET=...
ACCESS_TOKEN=...
ACCESS_TOKEN_SECRET=...
```
3. Replace the `...` with the keys and tokens from your Twitter app.

3. Finally run the bot using the following command:

```bash
  $ npm start
```

## Updating the Dota 2 Voice Lines (optional)

If there are new voice lines that have been added to the Wiki, you may want to update the voice line file by running the following command.

```bash
  $ npm run scrape
```

This will scrape the site for the voice line according to the rules specified in `/dota2_voice_lines/scraper.js`.