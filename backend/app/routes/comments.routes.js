const comments = require("../controllers/comments.controllers");
const auth = require("../lib/authentication");

module.exports = function (app) {
  app
    .route("/articles/:article_id/comments")
    .get(comments.getAllComments)
    .post(comments.createComment);

  app
    .route("/comments/:comment_id")
    .delete(auth.isAuthenticated, comments.deleteComment);
};
