const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./config_DB_SQL3LITE');

// Definición del modelo 'DatosUsuarios'
const DatosUsuarios = sequelize.define('DatosUsuarios', {
    id_usuario: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.TEXT
    },
    email: {
        type: DataTypes.TEXT
    }
}, {
    tableName: 'datos_usuarios',
    timestamps: false
});

// Definición del modelo 'User'
const User = sequelize.define('User', {
    id_user: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.TEXT
    },
    password: {
        type: DataTypes.TEXT
    }
}, {
    tableName: 'user',
    timestamps: false
});

// Sincronizar los modelos con la base de datos
sequelize.sync()
    .then(() => {
        console.log('Tablas sincronizadas');
    })
    .catch(err => {
        console.error('Error al sincronizar las tablas:', err);
    });

module.exports = { DatosUsuarios, User };
