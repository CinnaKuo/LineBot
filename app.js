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
        if (event.message.text == '位置') {
          let respondLocation = {
            type: 'location',
            title: '實體店位置',
            address: "10608台北市大安區忠孝東路三段一號",
            latitude: 25.043212,
            longitude: 121.538255
          }
          return client.replyMessage(event.replyToken, respondLocation);

        }
        if (event.message.text == '購物') {
          let shopping={
            type: 'flex',
            altText: 'ADAM',
            contents: {
              "type": "carousel",
            "contents": [
              {
                "type": "bubble",
                "hero": {
                  "type": "image",
                  "size": "full",
                  "aspectRatio": "20:13",
                  "aspectMode": "cover",
                  "url": "https://cdn11.bigcommerce.com/s-8pcbviyy/images/stencil/800x1200/products/5820/25580/011200050-1__90542.1568231070.jpg?c=2&imbypass=on"
                },
                "body": {
                  "type": "box",
                  "layout": "vertical",
                  "spacing": "sm",
                  "contents": [
                    {
                      "type": "text",
                      "text": "Simple Stone Earring Set (14K)",
                      "wrap": true,
                      "weight": "bold",
                      "size": "xl"
                    },
                    {
                      "type": "box",
                      "layout": "baseline",
                      "contents": [
                        {
                          "type": "text",
                          "text": "$28",
                          "wrap": true,
                          "weight": "bold",
                          "size": "xl",
                          "flex": 0
                        },
                        {
                          "type": "text",
                          "text": ".00",
                          "wrap": true,
                          "weight": "bold",
                          "size": "sm",
                          "flex": 0
                        }
                      ]
                    }
                  ]
                },
                "footer": {
                  "type": "box",
                  "layout": "vertical",
                  "spacing": "sm",
                  "contents": [
                    {
                      "type": "button",
                      "style": "secondary",
                      "action": {
                        "type": "uri",
                        "label": "It's yours",
                        "uri": "https://lovoda.com/simple-stone-earring-set-14k/"
                      }
                    },
                    {
                      "type": "button",
                      "action": {
                        "type": "uri",
                        "label": "Add to wishlist",
                        "uri": "https://linecorp.com"
                      }
                    }
                  ]
                }
              },
              {
                "type": "bubble",
                "hero": {
                  "type": "image",
                  "size": "full",
                  "aspectRatio": "20:13",
                  "aspectMode": "cover",
                  "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_6_carousel.png"
                },
                "body": {
                  "type": "box",
                  "layout": "vertical",
                  "spacing": "sm",
                  "contents": [
                    {
                      "type": "text",
                      "text": "Metal Desk Lamp",
                      "wrap": true,
                      "weight": "bold",
                      "size": "xl"
                    },
                    {
                      "type": "box",
                      "layout": "baseline",
                      "flex": 1,
                      "contents": [
                        {
                          "type": "text",
                          "text": "$11",
                          "wrap": true,
                          "weight": "bold",
                          "size": "xl",
                          "flex": 0
                        },
                        {
                          "type": "text",
                          "text": ".99",
                          "wrap": true,
                          "weight": "bold",
                          "size": "sm",
                          "flex": 0
                        }
                      ]
                    },
                    {
                      "type": "text",
                      "text": "Temporarily out of stock",
                      "wrap": true,
                      "size": "xxs",
                      "margin": "md",
                      "color": "#ff5551",
                      "flex": 0
                    }
                  ]
                },
                "footer": {
                  "type": "box",
                  "layout": "vertical",
                  "spacing": "sm",
                  "contents": [
                    {
                      "type": "button",
                      "flex": 2,
                      "style": "secondary",
                      "color": "#aaaaaa",
                      "action": {
                        "type": "uri",
                        "label": "Add to Cart",
                        "uri": "https://linecorp.com"
                      }
                    },
                    {
                      "type": "button",
                      "action": {
                        "type": "uri",
                        "label": "Add to wish list",
                        "uri": "https://linecorp.com"
                      }
                    }
                  ]
                }
              },
              {
                "type": "bubble",
                "body": {
                  "type": "box",
                  "layout": "vertical",
                  "spacing": "sm",
                  "contents": [
                    {
                      "type": "button",
                      "flex": 1,
                      "gravity": "center",
                      "action": {
                        "type": "uri",
                        "label": "See more",
                        "uri": "https://linecorp.com"
                      }
                    }
                  ]
                }
              }
            ]
            }
          }
          return client.replyMessage(event.replyToken, shopping);
        }
        const echo = { type: 'text', text: event.message.text };
        // use reply API
        return client.replyMessage(event.replyToken, shopping);
      case 'sticker':
        let respondSticker = {
          type: 'sticker',
          packageId: '11539',
          stickerId: '52114131'
        }
        return client.replyMessage(event.replyToken, respondSticker);


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