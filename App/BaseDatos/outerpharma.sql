-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 07-03-2023 a las 17:58:18
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
  `Nombre` varchar(20) COLLATE utf8mb4_spanish_ci NOT NULL,
  `Codigo` int(9) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `farmacias`
--

CREATE TABLE `farmacias` (
  `Codigo` int(9) NOT NULL,
  `nColegiado` int(9) NOT NULL,
  `Nombre` varchar(20) COLLATE utf8mb4_spanish_ci NOT NULL,
  `Ccorreo` varchar(20) COLLATE utf8mb4_spanish_ci NOT NULL,
  `Contrasenia` varchar(20) COLLATE utf8mb4_spanish_ci NOT NULL,
  `Direccion` varchar(40) COLLATE utf8mb4_spanish_ci NOT NULL,
  `nTelefono` int(9) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inventarios`
--

CREATE TABLE `inventarios` (
  `IdInventario` int(9) NOT NULL,
  `IdProducto` int(9) DEFAULT NULL,
  `Codigo` int(9) DEFAULT NULL,
  `Precio` float(4,2) DEFAULT NULL,
  `Cantidad` int(3) DEFAULT NULL,
  `fEntrada` date DEFAULT NULL,
  `fCaducidad` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `IdProducto` int(9) NOT NULL,
  `Nombre` varchar(20) COLLATE utf8mb4_spanish_ci NOT NULL,
  `pActivo` varchar(30) COLLATE utf8mb4_spanish_ci NOT NULL,
  `Laboratorio` varchar(15) COLLATE utf8mb4_spanish_ci NOT NULL,
  `vAdmin` varchar(20) COLLATE utf8mb4_spanish_ci NOT NULL,
  `presMedica` varchar(2) COLLATE utf8mb4_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `empleados`
--
ALTER TABLE `empleados`
  ADD PRIMARY KEY (`nEmpleado`),
  ADD KEY `Codigo_Farmacia_FK` (`Codigo`);

--
-- Indices de la tabla `farmacias`
--
ALTER TABLE `farmacias`
  ADD PRIMARY KEY (`Codigo`);

--
-- Indices de la tabla `inventarios`
--
ALTER TABLE `inventarios`
  ADD PRIMARY KEY (`IdInventario`),
  ADD KEY `Codigo_Farmacia2_FK` (`Codigo`),
  ADD KEY `IdProducto_FK` (`IdProducto`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`IdProducto`);

--
-- Indices de la tabla `ventas`
--
ALTER TABLE `ventas`
  ADD PRIMARY KEY (`nVentas`),
  ADD KEY `IdProducto2_FK` (`IdProducto`),
  ADD KEY `nEmpleado_FK` (`nEmpleado`);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `empleados`
--
ALTER TABLE `empleados`
  ADD CONSTRAINT `Codigo_Farmacia_FK` FOREIGN KEY (`Codigo`) REFERENCES `farmacias` (`Codigo`) ON DELETE SET NULL;

--
-- Filtros para la tabla `inventarios`
--
ALTER TABLE `inventarios`
  ADD CONSTRAINT `Codigo_Farmacia2_FK` FOREIGN KEY (`Codigo`) REFERENCES `farmacias` (`Codigo`) ON DELETE SET NULL,
  ADD CONSTRAINT `IdProducto_FK` FOREIGN KEY (`IdProducto`) REFERENCES `productos` (`IdProducto`) ON DELETE SET NULL;

--
-- Filtros para la tabla `ventas`
--
ALTER TABLE `ventas`
  ADD CONSTRAINT `IdProducto2_FK` FOREIGN KEY (`IdProducto`) REFERENCES `productos` (`IdProducto`) ON DELETE SET NULL,
  ADD CONSTRAINT `nEmpleado_FK` FOREIGN KEY (`nEmpleado`) REFERENCES `empleados` (`nEmpleado`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
