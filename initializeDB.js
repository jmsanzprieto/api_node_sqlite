const sequelize = require('./config_DB_SQL3LITE');
const { DatosUsuarios, User } = require('./models');

sequelize.sync({ force: true })
    .then(() => {
        return Promise.all([
            DatosUsuarios.bulkCreate([
                { id_usuario: 1, nombre: 'Usuario1', email: 'usuario1@example.com' },
                { id_usuario: 2, nombre: 'Usuario2', email: 'usuario2@example.com' },
                { id_usuario: 3, nombre: 'Usuario3_ACTUALIZADO', email: 'usuario6@example.com' },
                { id_usuario: 4, nombre: 'Usuario4', email: 'usuario4@example.com' },
                { id_usuario: 5, nombre: 'Usuario5', email: 'usuario5@example.com' },
                { id_usuario: 6, nombre: 'Usuario6', email: 'usuario6@example.com' }
            ]),
            User.bulkCreate([
                { id_user: 1, username: 'usuario', password: 'contraseña' }
            ])
        ]);
    })
    .then(() => {
        console.log('Datos iniciales insertados');
    })
    .catch(err => {
        console.error('Error al inicializar la base de datos:', err);
    });
