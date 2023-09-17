const User = require("./user");
const Posts = require("./posts");
const Comments = require("./comments");


User.hasMany(Posts, {
  foreignKey: "author_id",
  onDelete: "CASCADE",
});

User.hasMany(Comments, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Posts.belongsTo(User, {
  foreignKey: "author_id",
});

Posts.hasMany(Comments, {
  foreignKey: "post_id",
  onDelete: "CASCADE",
});

Comments.belongsTo(User, {
  foreignKey: "user_id",
});

Comments.belongsTo(Posts, {
  foreignKey: "post_id",
});


module.exports = {
  User, Posts, Comments,
};