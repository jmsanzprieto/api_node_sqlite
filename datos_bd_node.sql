-- Estructura de tabla para la tabla `datos_usuarios`
CREATE TABLE IF NOT EXISTS `datos_usuarios` (
  `id_usuario` INTEGER PRIMARY KEY AUTOINCREMENT,
  `nombre` TEXT,
  `email` TEXT
);

-- Volcado de datos para la tabla `datos_usuarios`
INSERT INTO `datos_usuarios` (`id_usuario`, `nombre`, `email`) VALUES
(1, 'Usuario1', 'usuario1@example.com'),
(2, 'Usuario2', 'usuario2@example.com'),
(3, 'Usuario3_ACTUALIZADO', 'usuario6@example.com'),
(4, 'Usuario4', 'usuario4@example.com'),
(5, 'Usuario5', 'usuario5@example.com'),
(6, 'Usuario6', 'usuario6@example.com');

-- Estructura de tabla para la tabla `user`
CREATE TABLE IF NOT EXISTS `user` (
  `id_user` INTEGER PRIMARY KEY AUTOINCREMENT,
  `username` TEXT,
  `password` TEXT
);

-- Volcado de datos para la tabla `user`
INSERT INTO `user` (`id_user`, `username`, `password`) VALUES
(1, 'usuario', 'contraseña');
