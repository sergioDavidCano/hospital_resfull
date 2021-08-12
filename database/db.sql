CREATE DATABASE database_hospi_;
USE database_hospi_
CREATE TABLE users (
    id INT(11) NOT NULL,
    username VARCHAR(25) NOT NULL,
    estado VARCHAR(15)  NULL DEFAULT 'ACTIVO',
    email VARCHAR(100) UNIQUE,
    role VARCHAR(30) NULL DEFAULT "USE_ROLE",
    password VARCHAR(60) NOT NULL
);

ALTER TABLE users 
    ADD PRIMARY KEY (id);

ALTER TABLE users 
    MODIFY   id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE users;

--Citas table
CREATE TABLE citas (
    id INT(11) NOT NULL,
    asunto VARCHAR(200) NOT NULL,
    administrador VARCHAR(100) NOT NULL,
    estado VARCHAR(15) NULL DEFAULT 'ACTIVO',
    especialidad VARCHAR(200) NOT NULL,
    description VARCHAR(500) NOT NULL,
    asunto_novedad VARCHAR(255) NULL,
    novedad VARCHAR(255) NULL,
    fecha VARCHAR(200) NOT NULL,
    hora VARCHAR (100) NOT NULL,
    user_id INT(11),
    create_at timestamp NOT NULL DEFAULT current_timestamp,
    create_at_cita timestamp NOT NULL DEFAULT current_timestamp,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id)
);
ALTER TABLE citas
    ADD PRIMARY KEY (id);

    ALTER TABLE citas
    MODIFY   id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;
CREATE TABLE novedad (
    id INT(11) NOT NULL,
    asunto_novedad VARCHAR(255) NULL,
    novedad VARCHAR(255) NULL,
    email VARCHAR(100) NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    user_id INT(11) NOT NULL,
    create_at timestamp NOT NULL DEFAULT current_timestamp
);
ALTER TABLE novedad
    ADD PRIMARY KEY (id);
       ALTER TABLE novedad
    MODIFY   id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;
