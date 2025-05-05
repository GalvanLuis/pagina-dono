CREATE DATABASE LSM_academia_virtual;

USE LSM_academia_virtual;

CREATE TABLE idTipoUsuario(
    id_tipo_usuario INT NOT NULL AUTO_INCREMENT,
    tipo_usuario VARCHAR(60) NOT NULL,
    PRIMARY KEY (id_tipo_usuario)
);

INSERT INTO idTipoUsuario (tipo_usuario) VALUES ('Usuario'), ('Alumno'), ('Maestro'), ('Administrador');

CREATE TABLE idTipoNivel(
    id_tipo_nivel INT NOT NULL AUTO_INCREMENT,
    nivel_modulo VARCHAR (20) NOT NULL,
    PRIMARY KEY (id_tipo_nivel)
);

INSERT INTO idTipoNivel (nivel_modulo) VALUES ('Basico'), ('Intermedio'), ('Avanzado');

CREATE TABLE usuarios(
    id_usuario INT NOT NULL AUTO_INCREMENT,
    id_stripe VARCHAR(512) COLLATE utf8_bin NOT NULL, /*255 caracteres max.*/
    nombre VARCHAR(120) NOT NULL,
    apellido VARCHAR (120) NOT NULL,
    telefono VARCHAR (64) NOT NULL, /*tam. max. 20 caracteres*/
    correo_electronico VARCHAR (160) NOT NULL, /*tam. max. 64 caracteres*/
    contrasenha VARCHAR (160) NOT NULL, /*tam. max. 64 caracteres*/ 
    fecha_creado TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    validado BOOLEAN NOT NULL DEFAULT 0,
    token VARCHAR (64),
    id_tipo_usuario INT NOT NULL,
    FOREIGN KEY (id_tipo_usuario) REFERENCES idTipoUsuario(id_tipo_usuario),
    PRIMARY KEY (id_usuario)
);

CREATE TABLE Alumnos(
    id_alumno INT NOT NULL AUTO_INCREMENT,
    id_tipo_nivel INT NOT NULL,
    id_usuario INT NOT NULL,
    FOREIGN KEY (id_tipo_nivel) REFERENCES idTipoNivel(id_tipo_nivel),
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario),
    PRIMARY KEY (id_alumno)
);

CREATE TABLE Docentes(
    id_docente INT NOT NULL AUTO_INCREMENT,
    id_usuario INT NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario),
    PRIMARY KEY (id_docente)
);

CREATE TABLE Classrooms(
    id_classroom INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(127) NOT NULL,
    descripcion VARCHAR(255),
    fecha_creado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id_classroom)
);

CREATE TABLE maestros_classroom(
    id_maestro INT NOT NULL,
    id_classroom INT NOT NULL,
    PRIMARY KEY (id_maestro, id_classroom),
    FOREIGN KEY (id_maestro) REFERENCES Docentes (id_docente),
    FOREIGN KEY (id_classroom) REFERENCES Classrooms (id_classroom)
);

CREATE TABLE alumnos_classroom(
    id_alumno INT NOT NULL,
    id_classroom INT NOT NULL,
    PRIMARY KEY (id_alumno, id_classroom),
    FOREIGN KEY (id_alumno) REFERENCES Alumnos (id_alumno),
    FOREIGN KEY (id_classroom) REFERENCES Classrooms (id_classroom)
);

CREATE TABLE idTipoSuscripcion(
    id_tipo_suscripcion INT NOT NULL AUTO_INCREMENT,
    id_product VARCHAR(32) NOT NULL, /*id_product de stripe*/
    nombre_suscripcion VARCHAR (30) NOT NULL,
    PRIMARY KEY (id_tipo_suscripcion)
);

-- INSERT INTO idTipoSuscripcion (nombre_suscripcion) VALUES ('Presencial'), ('Virtual'), ('Autónomo');

-- Planes
CREATE TABLE Planes(
    id_precio VARCHAR(32) NOT NULL, /*id_price de stripe*/
    id_tipo_suscripcion INT NOT NULL,
    duracion_suscripcion INT NOT NULL,
    descripcion VARCHAR(1024),
    PRIMARY KEY (id_precio),
    FOREIGN KEY (id_tipo_suscripcion) REFERENCES idTipoSuscripcion (id_tipo_suscripcion)
);

-- CREATE TABLE Plan(
--     id_plan INT NOT NULL AUTO_INCREMENT, 
--     id_product VARCHAR(32), /*id_price de stripe*/
--     id_tipo_suscripcion INT,
--     PRIMARY KEY (id_plan),
--     FOREIGN KEY (id_tipo_suscripcion) REFERENCES idTipoSuscripcion (id_tipo_suscripcion)
-- );

-- CREATE TABLE Precios(
--     id_precio VARCHAR(32) NOT NULL, /*id_price de stripe*/
--     id_plan INT,
--     duracion_suscripcion INT, /*meses*/
--     descripcion VARCHAR(1024),
--     PRIMARY KEY (id_precio),
--     FOREIGN KEY (id_plan) REFERENCES Plan (id_plan)
-- );

