const { Router } = require("express");
const News = require("../../../models/news");
const Comment = require("../../../models/fans");

const router = Router();

router.get("/", (req, res) => {
  res.render("index", {
    title: "Main",
    isMain: true,
  });
});

router.get("/news", async (req, res) => {
  const news = await News.find({}).lean();

  // res.render("news", {
  //   title: "News",
  //   isNews: true,
  //   news,
  // });

  res.status(200).send(news);
});

router.get("/fans", async (req, res, next) => {
    const comments = await Comment.find({}).lean();

    res.status(200).send(comments);
    // next();

    // console.log(comments);
    // res.json(comments);

    // res.render("fans", {
    //   title: "Fans",
    //   isFans: true,
    //   comments,
    // });
});

router.post("/fans", async (req, res) => {
  const now = new Date();
  const newComment = new Comment({
    createdAt: now.toLocaleString().substring(0, 17),
    userName: "FootballFan2000",
    commentContent: req.body.commentContent,
  });

  await newComment.save();

  res.status(200).redirect("/fans");
  // res.redirect("/fans");

});

router.get("/admin", (req, res) => {
  res.render("admin", {
    title: "Admin",
    isAdmin: true,
  });
});

router.post("/admin", async (req, res) => {
  const newPost = new News({
    title: req.body.title,
    postText: req.body.postText,
  });
  // postText: req.body.text,

  await newPost.save();

  res.status(200).redirect("/admin");
  // res.redirect("/news");
});

module.exports = router;
