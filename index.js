const express = require("express");
const webpush = require("web-push");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
app.use(bodyParser.json());

//Set static path
app.use(express.static(path.join(__dirname, "htmlClient")));

const publicVapidKey =
  "BEQ5PEqzPm_iokxZUXBb9G7Qop3BYljPnVwpPFvHAlk3MwnL8k9QtbuLh51LA53UnGotcS2ltg7H_K5iMQX2HjI";
const privateVapidKey = "2xZ0K4qkM0-L94bCRCoc5l33ZL2WjOj6_KUYcfdwmEA";

webpush.setVapidDetails(
  "mailto:test@test.com",
  publicVapidKey,
  privateVapidKey
);

// Subscribe Route
app.post("/subscribe", (req, res) => {
  // Get pushSubscription object
  const subscription = req.body;

  // Send 201 - resource created
  res.status(201).json({});

  // Create Payload
  const payload = JSON.stringify({ title: "Push Test" });

  //Pass object into sendNotification
  webpush
    .sendNotification(subscription, payload)
    .catch((err) => console.error(err));
});

const port = 5000;

app.listen(port, () => console.log(`Server started on port: ${port}`));
