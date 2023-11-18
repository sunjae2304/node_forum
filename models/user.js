module.exports = function (sequelize, DataTypes) {
    const user = sequelize.define('user', {
        username : {
            type: DataTypes.STRING(20),
            allowNull : false,
        },
        password : {
            type: DataTypes.STRING(20),
            allowNull : false,
        },
				
    });
    return user;
}