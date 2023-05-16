drop database if exists mediaapp;

create database mediaapp;

use mediaapp;

#CREACIÓN DE UNA TABLA ROL_USUARIO
create table user_rol(
    rolId int auto_increment primary key,
    name varchar(50) not null,
    description varchar(100) not null
);
#CREACIÓN DE UNA TABLA USUARIO CON ID_ROL COMO FK
create table user(
    userId int auto_increment primary key,
    name varchar(50) not null,
    surenames varchar(100) not null,
    username varchar(50) not null unique,
    email varchar(256) not null unique,
    password varchar(3000) not null,
    description varchar(3000),
    imgPerfil varchar(500),
    imgBanner varchar(500),
    sigupdate datetime not null,
    rolId int,
    foreign key (rolId) references user_rol(rolId)
);

#CREACIÓN DE UNA TABLA GAMESTATE
create table game_state(
    gameStateId int auto_increment primary key,
    name varchar(50) not null,
    description varchar(100) not null
);

#CREACIÓN DE UNA TABLA ALMACENADO_JUEGO
CREATE TABLE game (
    gameId int auto_increment primary key,
    idInRawg int not null,
    slug varchar(255) not null,
    name varchar(255) not null,
    gameReleased date not null,
    background_image varchar(500) not null,
    rating_page decimal(3,2),
    metacritic int not null,
    avgPlaytime int not null,
    gameUpdated date
);
#TABLA QUE SE CREA PARA ALAMCENAR DATOS UNICOS DE USUARIO Y GAME
CREATE TABLE user_game_data(
    userId int,
    gameId int,
    wishlist boolean,
    punctuation decimal(3,2),
    primary key (userId, gameId),
    foreign key (userId) references user(userId),
    foreign key (gameId) references game(gameId)
);
#TABLA QUE SE CREA PARA ALAMCENAR DATOS MULTIPLES DE USUARIO Y GAME
CREATE TABLE game_savegame(
	userGameSave int auto_increment,
    userId int,
    gameId int,
    savegameName varchar(255),
    saveDate date,
    gameStateId int,
    description varchar(500),
    primary key (userGameSave),
    foreign key (userId) references user_game_data(userId),
    foreign key (gameId) references user_game_data(gameId),
    foreign key (gameStateId) references game_state(gameStateId)
);

#CREACIÓN DE UNA TABLA PLATAFORMAS
CREATE TABLE platform (
    platformId int auto_increment primary key,
    platformIdRawg int,
    platformName varchar(50),
    requirementsMinimum varchar(2000)
);
#TABLA QUE SE CREA AL UNIR GAME CON PLATFORM
CREATE TABLE game_platform (
    gameId int,
    platformId int,
    primary key (gameId, platformId),
    foreign key (gameId) references game(gameId),
    foreign key (platformId) references platform(platformId)
);
#CREACIÓN DE UNA TABLA GENEROS
CREATE TABLE gender (
    genderId int auto_increment primary key,
    genderIdRawg int,
    genderName varchar(50),
    genderImg varchar(500)
);

#TABLA QUE SE CREA AL UNIR GAME CON GENDER
CREATE TABLE game_gender (
    gameId int,
    genderId int,
    primary key (gameId, genderId),
    foreign key (gameId) references game(gameId),
    foreign key (genderId) references gender(genderId)
);


#INSERTADOS TODOS LOS TIPOS DE USUARIO QUE EXISTEN Y UNA DESCRIPCIÓN
INSERT INTO`mediaapp`.`user_rol` (`rolId`, `name`, `description`)VALUES('1', 'admin', 'It has all the permissions');
INSERT INTO`mediaapp`.`user_rol` (`rolId`, `name`, `description`)VALUES('2','moderador','It only has special permissions');
INSERT INTO`mediaapp`.`user_rol` (`rolId`, `name`, `description`)VALUES('3', 'user', 'It is normal user');
#Insertar datos de todos los estado del juego
INSERT INTO `mediaapp`.`game_state` (`gameStateId`, `name`, `description`) VALUES ('1', 'uncategorized', 'I will choose the category later');
INSERT INTO `mediaapp`.`game_state` (`gameStateId`, `name`, `description`) VALUES ('2', 'playing', 'I play the game regularly');
INSERT INTO `mediaapp`.`game_state` (`gameStateId`, `name`, `description`) VALUES ('3', 'completed', 'I reached my goal in the game');
INSERT INTO `mediaapp`.`game_state` (`gameStateId`, `name`, `description`) VALUES ('4', 'played', 'I played the game but I didn\'t reach my goal');
INSERT INTO `mediaapp`.`game_state` (`gameStateId`, `name`, `description`) VALUES ('5', 'not played', 'I\'m going to play later');
INSERT INTO `mediaapp`.`game_state` (`gameStateId`, `name`, `description`) VALUES ('6', 'abandoned', 'I\'m not going to play anymore');

#Inserts para hacer pruebas
INSERT INTO `mediaapp`.`user` (`userId`, `name`, `surenames`, `username`, `email`, `password`, `description`, `imgPerfil`, `imgBanner`, `sigupdate`, `rolId`) VALUES ('0', 'prueba1', 'aa', 'aa', 'aa', '12312312', 'asasd', 'aas', 'asd', '2023-04-04', '1');
INSERT INTO `mediaapp`.`game` (`idInRawg`, `slug`, `name`, `gameReleased`, `background_image`, `rating_page`, `metacritic`, `avgPlaytime`, `gameUpdated`) VALUES ('1', 'sada', 'dasd', '2023-03-03', 'sdasdasd', '1', '2', '12', '2023-03-03');

INSERT INTO `mediaapp`.`user_game_data` (`userId`, `gameId`, `wishlist`, `punctuation`) VALUES ('1', '1', '0', '7');

INSERT INTO `mediaapp`.`game_savegame` (`userId`, `gameId`, `savegameName`, `saveDate`, `gameStateId`, `description`) VALUES ('1', '1', 'Prueba 1', '2023-02-02', '1', 'prueba1');
INSERT INTO `mediaapp`.`game_savegame` (`userId`, `gameId`, `savegameName`, `saveDate`, `gameStateId`, `description`) VALUES ('1', '1', 'Prueba 2', '2023-02-02', '2', 'prueba2');
INSERT INTO `mediaapp`.`game_savegame` (`userId`, `gameId`, `savegameName`, `saveDate`, `gameStateId`, `description`) VALUES ('1', '1', 'Prueba 3', '2023-02-02', '3', 'prueba3');


    