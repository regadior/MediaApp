drop database if exists mediaapp;

create database mediaapp;

use mediaapp;

#CREACIÓN DE UNA TABLA USUARIO CON ID_ROL COMO FK
create table usuario(
    user_id int auto_increment primary key,
    name varchar(50) not null,
    apells varchar(100) not null,
    nick varchar(50) not null unique,
    email varchar(256) not null unique,
    contraseña varchar(3000) not null,
    descripcion varchar(3000),
    img_perfil varchar(500),
    img_banner varchar(500),
    id_rol int
);

#CREACIÓN DE UNA TABLA ROL_USUARIO
create table rol_usuario(
    id_rol int auto_increment primary key,
    name varchar(50) not null,
    descripcion varchar(100) not null
);

#CREACIÓN DE UNA TABLA ALMACENADO_JUEGO
-- create table almacenado_juego(
--     id_juego_almacenado int auto_increment primary key,
--     id_juego int not null,
--     id_usuario int not null,
--     nombre_juego varchar(100) not null,
--     tipo varchar(50) not null,
--     estado varchar(50) not null,
--     puntuacion decimal not null,
--     veces_pasado int,
--     fecha_de_finalizacion date
-- );

-- #CREACIÓN DE UNA TABLA JUEGO
-- create table juego(
--     id_juego int auto_increment primary key,
--     nombre varchar(100) not null
-- );

ALTER TABLE
    usuario
ADD
    CONSTRAINT fk_rol_usuario FOREIGN KEY (id_rol) REFERENCES rol_usuario(id_rol);

-- ALTER TABLE
--     almacenado_juego
-- ADD
--     CONSTRAINT fk_usuario FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario);

-- ALTER TABLE
--     almacenado_juego
-- ADD
--     CONSTRAINT fk_juego FOREIGN KEY (id_juego) REFERENCES juego(id_juego);

#INSERTADOS TODOS LOS TIPOS DE USUARIO QUE EXISTEN Y UNA DESCRIPCIÓN
INSERT INTO
    `mediaapp`.`rol_usuario` (`id_rol`, `name`, `descripcion`)
VALUES
    ('1', 'admin', 'Tiene todos los permisos');

INSERT INTO
    `mediaapp`.`rol_usuario` (`id_rol`, `name`, `descripcion`)
VALUES
    (
        '2',
        'moderador',
        'Solo tiene permisos especiales'
    );

INSERT INTO
    `mediaapp`.`rol_usuario` (`id_rol`, `name`, `descripcion`)
VALUES
    ('3', 'user', 'Usuario normal');