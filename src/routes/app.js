const express = require("express");
const bodyParser = require("body-parser");
var randomstring = require("randomstring");
const appBaseUrl = "http://localhost:3000/";

require("../db/mongoose");

const Url = require("../dbModels/urls");

router = new express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.get("/", (req, res) => {
  res.render("index", { shortUrl: null });
});

router.get("/:id", async (req, res) => {
  const urlId = req.params.id;

  try {
    const url = await Url.findOne({ urlId });

    if (!url) {
      return res.status(404).render("notfound");
    }

    url.clicks = url.clicks + 1;
    url.markModified("clicks");
    await url.save();

    res.redirect(301, url.url);
  } catch (error) {
    console.log(error);
    res.status(500).send("Interal server error!");
  }
});

router.post("/", async (req, res) => {
  let url = req.body.url;
  console.log(req.body.url);
  if (!url) {
    return res.status(200).json({ error: "Invalid Url" });
  }
  if (!/^https?:\/\//i.test(url)) {
    url = "http://" + url;
  }
  const urlId = await randomstring.generate({
    length: 6,
    charset: "alphabetic",
  });

  const response = await Url.create({ url, urlId }).then(
    function (resp) {
      return res
        .status(201)
        .render("index", { shortUrl: `${appBaseUrl}${resp.urlId}`, url: url });
    },
    function (err) {
      return res.status(500).send("Database Error!");
    }
  );
});

module.exports = router;
