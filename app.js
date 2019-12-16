'use strict';

const line = require('@line/bot-sdk');
const express = require('express');

// create LINE SDK config from env variables
const config = {
  channelId:process.env.CHANNEL_ID,
  channelAccessToken:process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET
};

// create LINE SDK client
const client = new line.Client(config);

// create Express app
// about Express itself: https://expressjs.com/
const app = express();

// register a webhook handler with middleware
// about the middleware, please refer to doc
app.post('/linewebhook', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      var data = JSON.stringify(err);
      console.error(data);
      res.status(500).end();
    });
});

// event handler
function handleEvent(event) {
  console.log(event.message);
  if (event.type == 'message') {
    switch (event.message.type) {
      case 'text':
        if (event.message.text=='位置')
        {
          let respondLocation= {
        type: 'location',
        title: '實體店位置',
        address: "10608台北市大安區忠孝東路三段一號",
        latitude: 25.043212,
        longitude: 121.538255
        }
          return client.replyMessage(event.replyToken,respondLocation );

        }
        const echo = { type: 'text', text: event.message.text };
        // use reply API
        return client.replyMessage(event.replyToken, echo);
      case 'sticker':
        let respondSticker= {
          type: 'sticker',
          packageId: '11539',
          stickerId: '52114131'
      }
        return client.replyMessage(event.replyToken,respondSticker );
        

      default:
        break;
    }

  }

  if (event.type == 'follow') {
    // create a echoing text message
    const echo = { type: 'text', text: '歡迎加入柏維超土炮法師組' };

    // use reply API
    return client.replyMessage(event.replyToken, echo);
  }



}

// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});