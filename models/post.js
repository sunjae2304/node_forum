module.exports = function (sequelize, DataTypes) {
    const post = sequelize.define('post', {
        title : {
            type: DataTypes.STRING,
            allowNull : false,
        },
        content : {
            type: DataTypes.STRING,
            allowNull : false,
        },

    });
    return post;
}