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
        switch (event.message.text) {
          case '位置': {
            let respondLocation = {
              type: 'location',
              title: '實體店位置',
              address: "10608台北市大安區忠孝東路三段一號",
              latitude: 25.043212,
              longitude: 121.538255
            }
            return client.replyMessage(event.replyToken, respondLocation);

          }
          case ('購物','官網'): {
            let shopping = {
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
          case '快速': {
            let quick = {
              type: 'text',
              text: 'Quick reply',
              quickReply: {
                items: [
                  {
                    type: 'action',
                    action: {
                      type: 'postback',
                      label: '逛逛新品',
                      data: "購物",
                      text: '購物'
                    }
                  },
                  {
                    type: 'action',
                    action: {
                      type: 'camera',
                      label: 'Send camera'
                    }
                  },
                  {
                    type: 'action',
                    action: {
                      type: 'cameraRoll',
                      label: 'camera roll'
                    }
                  },
                  {
                    type: 'action',
                    action: {
                      type: 'location',
                      label: 'location'
                    }
                  }
                ]
              },
            }
            return client.replyMessage(event.replyToken, quick);
          }
          default: {
            const echo = { type: 'text', text: event.message.text };
            // use reply API
            return client.replyMessage(event.replyToken, echo);
          }
        }
      case 'sticker':
        let respondSticker = {
          type: 'sticker',
          packageId: '11539',
          stickerId: '52114131'
        }
        return client.replyMessage(event.replyToken, respondSticker);

      case 'image':
        let hello = { type: 'text', text: "你長得好可愛~~我也很可愛!\u{100037}" };
        let d=new Date();
        let now=d.getFullYear()+"年"+(d.getMonth()+1)+"月"+d.getDate()+"日";
        let bubble = {
          type: 'flex',
          altText: 'ADAM',
          contents: {
            "type": "bubble",
            "hero": {
              "type": "image",
              "url": "https://upload.cc/i1/2019/12/26/6hfzWs.jpg",
              "size": "full",
              "aspectRatio": "20:13",
              "aspectMode": "cover",
              "action": {
                "type": "uri",
                "uri": "http://linecorp.com/"
              }
            },
            "body": {
              "type": "box",
              "layout": "vertical",
              "spacing": "md",
              "contents": [
                {
                  "type": "text",
                  "text": "你長得好可愛~~\n我也很可愛!",
                  "wrap": true,
                  "weight": "bold",
                  "gravity": "center",
                  "size": "xl"
                },
                {
                  "type": "box",
                  "layout": "vertical",
                  "margin": "lg",
                  "spacing": "sm",
                  "contents": [
                    {
                      "type": "box",
                      "layout": "baseline",
                      "spacing": "sm",
                      "contents": [
                        {
                          "type": "text",
                          "text": "Date",
                          "color": "#aaaaaa",
                          "size": "sm",
                          "flex": 1
                        },
                        {
                          "type": "text",
                          "text": now,
                          "wrap": true,
                          "size": "sm",
                          "color": "#666666",
                          "flex": 4
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          }
        };
        return client.replyMessage(event.replyToken, bubble);


      default:
        break;
    }

  }

  if (event.type == 'follow') {
    // create a echoing text message
    const echo = { type: 'text', text: '歡迎加入Cinna的Line Bot好友，您可以嘗試輸入「快速」、「購物」等等，或是發送不同類型的訊息' };

    // use reply API
    return client.replyMessage(event.replyToken, echo);
  }



}

// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});

