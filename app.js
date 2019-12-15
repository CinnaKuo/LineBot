'use strict';

const line = require('@line/bot-sdk');
const express = require('express');

// create LINE SDK config from env variables
const config = {
  channelAccessToken: 'zGY9xzBeOLgkSYW551drQMNFQwgs1xgls83nRjgrCwxMnth6ePTCKmq0luGMVwHl6OenNiR3tVRUrWTu6zdaelYDfvijCvvVfTmrQGyO9BkiJE6uL3H2Mh8Nm7xCSxQzn/pxi7CTPkjJED5WpSLoFAdB04t89/1O/w1cDnyilFU=',
  channelSecret: 'b9572939e57fa5f1f086480c360e8a7d'
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
      console.error(err);
      res.status(500).end();
    });
});

// event handler
function handleEvent(event) {
    console.log(event);
  if (event.type == 'message' ) {
    // create a echoing text message
  const echo = { type: 'text', text: event.message.text };

  // use reply API
  return client.replyMessage(event.replyToken, echo);
  }

  if (event.type == 'follow' ) {
    // create a echoing text message
  const echo = { type: 'text', text: '安安你好牙' };

  // use reply API
  return client.replyMessage(event.replyToken, echo);
  }
  

 
}

// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});