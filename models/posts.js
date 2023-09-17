const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const dayjs = require("dayjs");
const utc = require('dayjs/plugin/utc');
dayjs.extend(utc);

class Posts extends Model {
    formatDate(){
        return dayjs.utc(this.created_at).format('MMMM DD, YYYY [at] hh:mm A');
    }
}

Posts.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        author_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id',
            }
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'posts',
    }
);

module.exports = Posts;