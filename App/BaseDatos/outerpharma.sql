-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 13-03-2023 a las 17:27:09
-- Versión del servidor: 10.4.25-MariaDB
-- Versión de PHP: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `outerpharma`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleados`
--

CREATE TABLE `empleados` (
  `nEmpleado` int(3) NOT NULL,
  `Nombre` varchar(20) COLLATE utf8_spanish_ci NOT NULL,
  `CcorreoFarmacia` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `Contrasena` varchar(30) COLLATE utf8_spanish_ci NOT NULL,
  `Rol` varchar(15) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `empleados`
--

INSERT INTO `empleados` (`nEmpleado`, `Nombre`, `CcorreoFarmacia`, `Contrasena`, `Rol`) VALUES
(1, 'Empleado1', 'farmacia1@mail.com', 'contrasenaEmpleado1', 'Admin'),
(2, 'Empleado2', 'farmacia1@mail.com', 'contrasenaEmpleado2', 'Empleado'),
(3, 'Empleado3', 'farmacia2@mail.com', 'contrasenaEmpleado3', 'Admin'),
(4, 'Empleado4', 'farmacia2@mail.com', 'contrasenaEmpleado4', 'Empleado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `farmacias`
--

CREATE TABLE `farmacias` (
  `Ccorreo` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `nColegiado` int(9) NOT NULL,
  `Nombre` varchar(40) COLLATE utf8_spanish_ci NOT NULL,
  `Contrasenia` varchar(20) COLLATE utf8_spanish_ci NOT NULL,
  `Direccion` varchar(40) COLLATE utf8_spanish_ci NOT NULL,
  `nTelefono` int(9) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `farmacias`
--

INSERT INTO `farmacias` (`Ccorreo`, `nColegiado`, `Nombre`, `Contrasenia`, `Direccion`, `nTelefono`) VALUES
('farmacia1@mail.com', 123456789, 'Farmacia1', 'contrasena1', 'Calle 1', 111111111),
('farmacia2@mail.com', 987654321, 'Farmacia2', 'contraseña2', 'Calle 2', 222222222),
('farmacia3@mail.com', 246810121, 'Farmacia3', 'contraseña3', 'Calle 3', 333333333);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inventarios`
--

CREATE TABLE `inventarios` (
  `IdInventario` int(9) NOT NULL,
  `IdProducto` int(9) DEFAULT NULL,
  `CcorreoFarmacia` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `Precio` float(4,2) DEFAULT NULL,
  `Cantidad` int(3) DEFAULT NULL,
  `fEntrada` date DEFAULT NULL,
  `fCaducidad` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `inventarios`
--

INSERT INTO `inventarios` (`IdInventario`, `IdProducto`, `CcorreoFarmacia`, `Precio`, `Cantidad`, `fEntrada`, `fCaducidad`) VALUES
(1, 1, 'farmacia1@mail.com', 1.50, 50, '2022-01-01', '2023-01-01'),
(2, 1, 'farmacia2@mail.com', 1.60, 40, '2022-02-01', '2023-02-01'),
(3, 2, 'farmacia1@mail.com', 2.50, 30, '2022-03-01', '2023-03-01'),
(4, 2, 'farmacia2@mail.com', 2.60, 20, '2022-04-01', '2023-04-01');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `IdProducto` int(9) NOT NULL,
  `Nombre` varchar(20) COLLATE utf8_spanish_ci NOT NULL,
  `pActivo` varchar(30) COLLATE utf8_spanish_ci NOT NULL,
  `Laboratorio` varchar(15) COLLATE utf8_spanish_ci NOT NULL,
  `vAdmin` varchar(20) COLLATE utf8_spanish_ci NOT NULL,
  `presMedica` varchar(2) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`IdProducto`, `Nombre`, `pActivo`, `Laboratorio`, `vAdmin`, `presMedica`) VALUES
(1, 'Paracetamol', 'Acetaminofén', 'Laboratorio1', 'oral', 'NO'),
(2, 'Ibuprofeno', 'Ibuprofeno', 'Laboratorio2', 'oral', 'NO'),
(3, 'Aspirina', 'Ácido acetilsalicílico', 'Laboratorio3', 'oral', 'NO');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proveedores`
--

CREATE TABLE `proveedores` (
  `Nombre` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `Direccion` varchar(50) COLLATE utf8_spanish_ci DEFAULT NULL,
  `nTelefono` int(7) DEFAULT NULL,
  `CcorreoFarmacia` varchar(50) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `proveedores`
--

INSERT INTO `proveedores` (`Nombre`, `Direccion`, `nTelefono`, `CcorreoFarmacia`) VALUES
('Proveedor1', 'Calle 1', 111111111, 'farmacia1@mail.com'),
('Proveedor2', 'Calle 2', 222222222, 'farmacia2@mail.com');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ventas`
--

CREATE TABLE `ventas` (
  `nVentas` int(9) NOT NULL,
  `IdProducto` int(9) DEFAULT NULL,
  `nEmpleado` int(3) DEFAULT NULL,
  `Fecha` date DEFAULT NULL,
  `Cantidad` int(2) DEFAULT NULL,
  `Precio` float(4,2) DEFAULT NULL,
  `Total` float(5,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `ventas`
--

INSERT INTO `ventas` (`nVentas`, `IdProducto`, `nEmpleado`, `Fecha`, `Cantidad`, `Precio`, `Total`) VALUES
(1, 1, 1, '2022-01-01', 5, 1.50, 7.50),
(2, 1, 2, '2022-01-02', 10, 1.50, 15.00),
(3, 2, 1, '2022-01-03', 15, 2.50, 37.50),
(4, 2, 2, '2022-01-04', 20, 2.50, 50.00);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `empleados`
--
ALTER TABLE `empleados`
  ADD PRIMARY KEY (`nEmpleado`),
  ADD KEY `Codigo_Farmacia_FK` (`CcorreoFarmacia`);

--
-- Indices de la tabla `farmacias`
--
ALTER TABLE `farmacias`
  ADD PRIMARY KEY (`Ccorreo`);

--
-- Indices de la tabla `inventarios`
--
ALTER TABLE `inventarios`
  ADD PRIMARY KEY (`IdInventario`),
  ADD KEY `CcorreoFarmacia` (`CcorreoFarmacia`),
  ADD KEY `IdProducto` (`IdProducto`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`IdProducto`);

--
-- Indices de la tabla `proveedores`
--
ALTER TABLE `proveedores`
  ADD PRIMARY KEY (`Nombre`),
  ADD KEY `CcorreoFarmacia` (`CcorreoFarmacia`);

--
-- Indices de la tabla `ventas`
--
ALTER TABLE `ventas`
  ADD PRIMARY KEY (`nVentas`),
  ADD KEY `IdProducto` (`IdProducto`),
  ADD KEY `nEmpleado` (`nEmpleado`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `empleados`
--
ALTER TABLE `empleados`
  MODIFY `nEmpleado` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `inventarios`
--
ALTER TABLE `inventarios`
  MODIFY `IdInventario` int(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `empleados`
--
ALTER TABLE `empleados`
  ADD CONSTRAINT `Codigo_Farmacia_FK` FOREIGN KEY (`CcorreoFarmacia`) REFERENCES `farmacias` (`Ccorreo`);

--
-- Filtros para la tabla `inventarios`
--
ALTER TABLE `inventarios`
  ADD CONSTRAINT `inventarios_ibfk_1` FOREIGN KEY (`CcorreoFarmacia`) REFERENCES `farmacias` (`Ccorreo`),
  ADD CONSTRAINT `inventarios_ibfk_2` FOREIGN KEY (`IdProducto`) REFERENCES `productos` (`IdProducto`);

--
-- Filtros para la tabla `proveedores`
--
ALTER TABLE `proveedores`
  ADD CONSTRAINT `proveedores_ibfk_1` FOREIGN KEY (`CcorreoFarmacia`) REFERENCES `farmacias` (`Ccorreo`);

--
-- Filtros para la tabla `ventas`
--
ALTER TABLE `ventas`
  ADD CONSTRAINT `ventas_ibfk_1` FOREIGN KEY (`IdProducto`) REFERENCES `productos` (`IdProducto`),
  ADD CONSTRAINT `ventas_ibfk_2` FOREIGN KEY (`nEmpleado`) REFERENCES `empleados` (`nEmpleado`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
