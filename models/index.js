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
    getterMethods: {
        getRoute() {
            return '/wiki/' + this.urlTitle;
        }
    }

}, {
    hooks: {
        beforeValidate: (page) => {
            if (page.title) {
                console.log('creating url name')
                page.uriTitle = page.title.replace(/\W+/g, '').replace(/\s+/, '_');

            } else {
                page.uriTitle = Math.random().toString(36).substring(2, 7)
            }
        },

    }
});

module.exports = {
    Page,
    User,
    db
}