const express = require('express');
const jwt = require('jsonwebtoken');
const { DatosUsuarios, User } = require('./models'); // Importa los modelos definidos
const secretKey = 'your_secret_key'; // Define tu clave secreta para JWT
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear el cuerpo de las solicitudes POST como objetos JSON
app.use(express.json());

// Middleware para autenticar el token JWT
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, secretKey, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

// Ruta para leer y mostrar los datos de la tabla usuarios
app.get('/usuarios', authenticateToken, async (req, res) => {
    try {
        const users = await DatosUsuarios.findAll();
        res.json(users);
    } catch (error) {
        console.error('Error al realizar la consulta:', error);
        res.status(500).send('Error interno del servidor');
    }
});

// Ruta para ver los datos de un usuario por su ID
app.get('/usuarios/:id_usuario', authenticateToken, async (req, res) => {
    try {
        const user = await DatosUsuarios.findByPk(req.params.id_usuario);
        if (!user) {
            return res.status(404).send('Usuario no encontrado');
        }
        res.json(user);
    } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
        res.status(500).send('Error interno del servidor');
    }
});

// Ruta para añadir un nuevo usuario a la tabla usuarios
app.post('/usuarios', authenticateToken, async (req, res) => {
    try {
        const nuevoUsuario = await DatosUsuarios.create(req.body);
        res.status(201).send('Usuario añadido correctamente');
    } catch (error) {
        console.error('Error al insertar un nuevo usuario:', error);
        res.status(500).send('Error interno del servidor');
    }
});

// Ruta para actualizar un usuario existente por su ID
app.put('/usuarios/:id_usuario', authenticateToken, async (req, res) => {
    try {
        const [updated] = await DatosUsuarios.update(req.body, {
            where: { id_usuario: req.params.id_usuario }
        });
        if (updated) {
            res.send('Usuario actualizado correctamente');
        } else {
            res.status(404).send('Usuario no encontrado');
        }
    } catch (error) {
        console.error('Error al actualizar el usuario:', error);
        res.status(500).send('Error interno del servidor');
    }
});

// Ruta para borrar un usuario existente por su ID
app.delete('/usuarios/:id_usuario', authenticateToken, async (req, res) => {
    try {
        const deleted = await DatosUsuarios.destroy({
            where: { id_usuario: req.params.id_usuario }
        });
        if (deleted) {
            res.send('Usuario eliminado correctamente');
        } else {
            res.status(404).send('Usuario no encontrado');
        }
    } catch (error) {
        console.error('Error al eliminar el usuario:', error);
        res.status(500).send('Error interno del servidor');
    }
});

// Ruta para autenticar un usuario y generar un token JWT
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ where: { username, password } });
        if (!user) {
            return res.status(401).json({ message: 'Credenciales incorrectas' });
        }
        const token = jwt.sign({ username: user.username }, secretKey);
        res.json({ token });
    } catch (error) {
        console.error('Error al buscar usuario:', error);
        res.status(500).send('Error interno del servidor');
    }
});

// Inicia el servidor y lo hace escuchar en el puerto especificado
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
