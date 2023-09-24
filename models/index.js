const User = require('./User');
const Blog = require('./Blog');
const Comment = require('./Comment');

User.hasMany(Blog, {
  foreignKey: 'author_id',
});

Blog.belongsTo(User, {
  foreignKey: 'author_id',
});

Blog.hasMany(Comment, {
  foreignKey: 'blog_id',
});

Comment.belongsTo(Blog, {
  foreignKey: 'blog_id',
});

Comment.belongsTo(User, {
  foreignKey: 'author_id',
});

module.exports = { User, Blog, Comment };
