var express = require("express");
var axios = require("axios");

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const sendRequest = async function (req, res, next) {
  try {
    console.log(req.body);

    const webhookUrl = "https://hooks.slack.com/services/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";
    const testUrl = "https://hooks.slack.com/services/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";

    let payload = {
      blocks: [
        {
          type: "header",
          text: {
            type: "plain_text",
            text: "New deploy request",
            emoji: true,
          },
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: " ",
          },
          accessory: {
            type: "checkboxes",
            options: [
              {
                text: {
                  type: "mrkdwn",
                  text: "Deploy completed",
                },
                value: "value-0",
              },
            ],
            action_id: "checkboxes-action",
          },
        },
      ],
    };

    await axios.post(testUrl, payload);
    res.json({ result: "ok" });
  } catch (e) {
    console.error(e);
    res.status(500);
    res.json({ error: e });
  }
};

app.post("/sendRequest", sendRequest);
app.get("/sendRequest", sendRequest);

app.listen(3500);
console.log("App started");
