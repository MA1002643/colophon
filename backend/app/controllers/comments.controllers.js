const comments = require("../models/comments.models");
const articles = require("../models/articles.models");
const Joi = require("joi");
const db = require("../../database");

function getAllComments(req, res) {
  let article_id = parseInt(req.params.article_id);
  comments.getAllComments(article_id, (err, results) => {
    if (err) return res.sendStatus(err);

    return res.status(200).send(results);
  });
}

const createComment = (req, res) => {
  let article_id = parseInt(req.params.article_id);

  articles.getSingleArticle(article_id, (err) => {
    if (err === 404) return res.sendStatus(404);
    if (err) return res.sendStatus(500);

    const schema = Joi.object({
      comment_text: Joi.string().required(),
    });

    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let comment = Object.assign({}, req.body);

    comments.addNewComment(article_id, comment, (err, id) => {
      if (err) return res.sendStatus(500);

      return res.status(201).send({ comment_id: id });
    });
  });
};

const deleteComment = (req, res) => {
  let comment_id = parseInt(req.params.comment_id);
  console.log(comment_id);
  comments.getSingleComment(comment_id, (err, result) => {
    if (err === 404) return res.sendStatus(404);
    if (err) return res.sendStatus(500);
    console.log(result);

    comments.deleteComment(comment_id, (err) => {
      if (err) {
        console.log(err);
        return res.sendStatus(500);
      }
      return res.sendStatus(200);
    });
  });
};

module.exports = {
  getAllComments: getAllComments,
  createComment: createComment,
  deleteComment: deleteComment,
};
