const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack', { logging: false });

const User = db.define('user', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        },
        unique: true

    }
});

const Page = db.define('page', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    urlTitle: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    status: {
        type: Sequelize.ENUM('open', 'closed')
    },
    date: {
        type: Sequelize.DATE,
        default: Sequelize.NOW
    }

}, {
    hooks: {
        beforeValidate: function(page) {
            console.log('log page in hoo' + page)
            if (page.title) {
                // console.log('creating url name')
                page.urlTitle = page.title.replace(/\s+/g, '_').replace(/\W/g, '');
            } else {
                page.urlTitle = Math.random().toString(36).substring(2, 7)
            }
        }
    },
    getterMethods: {
        route: function() {
            return '/wiki/' + this.urlTitle;
        }
    }


});

// User.hook('beforeValidate', (page) => {
//     console.log('log page in hoo' + page)
//     if (page.title) {
//         console.log('creating url name')
//         page.urlTitle = page.title.replace(/\s+/g, '_').replace(/\W/g, '');
//     } else {
//         page.urlTitle = Math.random().toString(36).substring(2, 7)
//     }
// });




module.exports = {
    Page,
    User,
    db
}