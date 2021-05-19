const path = require('path');

// Load ORM
const Sequelize = require('sequelize');


// Environment variable to define the URL of the data base to use.
// To use SQLite data base:
//    DATABASE_URL = sqlite:quiz.sqlite
const url = process.env.DATABASE_URL || "sqlite:quiz.sqlite";

const sequelize = new Sequelize(url);

// Import the definition of the Quiz Table from quiz.js
const Quiz = sequelize.import(path.join(__dirname, 'quiz'));

// Import the definition of the Group Table from group.js
const Group = sequelize.import(path.join(__dirname, 'group'));

// Import the definition of the Users Table from user.js
const User = sequelize.import(path.join(__dirname,'user'));

// Session
sequelize.import(path.join(__dirname,'session'));


// Relation 1-to-N between User and Quiz:
User.hasMany(Quiz, {as: 'quizzes', foreignKey: 'authorId'});
Quiz.belongsTo(User, {as: 'author', foreignKey: 'authorId'});

//Relaciones Group-Quiz
/*del modelo quiz me dice que en cada uno de los quiz puede pertenecer a varios quizes
el atributo dentro de quizes es groups, definimos la tabla GroupQuizzes,
la foreignKey de Quiz dentro de esa tabla va a ser quizId,
la otra clave que va a ser la que se relaciones con grupo va a ser groupId*/
Quiz.belongsToMany(Group, {
    as: 'groups',
    through: 'GroupQuizzes',
    foreignKey: 'quizId',
    otherKey: 'groupId'
});

/*por otro lado tenemos que un grupo puede estar relacionado con varios quizzes,
Me refiero al modelo group. */
Group.belongsToMany(Quiz, {
    as: 'quizzes',
    through: 'GroupQuizzes',
    foreignKey: 'groupId',
    otherKey: 'quizId'
});

module.exports = sequelize;
