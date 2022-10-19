-- create database DetailTEC

go 

use DetailTEC

go

-- if not exists (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'dbo' AND TABLE_NAME = 'TRABAJADOR')
create table TRABAJADOR(
	Cedula char(9) not null,
	Nombre varchar(20) not null,
	Apellido1 varchar(20) not null,
	Apellido2 varchar(20),
	Fecha_nacimiento date,
	Fecha_ingreso date,
	Edad tinyint, --La edad se calcula en la base de datos, no se ingresa
	PasswordT varchar(20) not null,
	Rol varchar(20) not null,
	Tipo_pago varchar(10) not null, -- El tipo de pago debería ser otra tabla
	-- El trabajador debería de tener una sucursal asignada
	PRIMARY KEY(Cedula)
)


-- if not exists (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'dbo' AND TABLE_NAME = 'SUCURSAL')
create table SUCURSAL(

	Nombre varchar(40) not null,
	Provincia varchar(20),
	Canton varchar(20),
	Distrito varchar(20),
	Telefono char(8) not null,
	Fecha_apertura date,
	Fecha_gerente date, --Debería ser otra tabla
	Cedula_gerente char(9) not null, -- Va con la tabla de arriba
	PRIMARY KEY(Nombre),
	FOREIGN KEY(Cedula_gerente) REFERENCES TRABAJADOR(Cedula)

)

-- if not exists (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'dbo' AND TABLE_NAME = 'LAVADO')
CREATE TABLE LAVADO
(
	Nombre varchar(40) not null,
	Costo int not null,
	Precio int not null,
	Duracion int
	-- FALTAN LOS PRODUCTOS UTILIZADOS
	-- FALTA EL PERSONAL REQUERIDO
	-- FALTAN LOS PUNTOS QUE SE OBTIENEN
	PRIMARY KEY (Nombre) 
)


-- if not exists (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'dbo' AND TABLE_NAME = 'CLIENTE')
create table CLIENTE(

	Cedula char(9) not null,
	Nombre varchar(20) not null,
	Apellido1 varchar(20) not null,
	Apellido2 varchar(20),
	Usuario varchar(20) not null,
	Correo varchar(50) not null,
	PasswordC varchar(20) not null,
	Puntos int not null, --Al crear el usuario se le asignan 0 puntos
	PRIMARY KEY(Cedula)

)


-- if not exists (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'dbo' AND TABLE_NAME = 'TELEFONOS_CLIENTE')
create table TELEFONOS_CLIENTE(
	
	Cedula_Cli char(9) not null,
	Telefono char(8) not null,
	FOREIGN KEY(Cedula_Cli) REFERENCES CLIENTE(Cedula)
	
)

-- if not exists (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'dbo' AND TABLE_NAME = 'DIRECCIONES_CLIENTE')
create table DIRECCIONES_CLIENTE(
	
	Cedula_Cli char(9) not null,
	Direccion varchar(100) not null,
	FOREIGN KEY(Cedula_Cli) REFERENCES CLIENTE(Cedula)
	
)

-- if not exists (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'dbo' AND TABLE_NAME = 'CITA')
create table CITA(

	ID int not null, -- el id se debería de generar automáticamente, no tener que ingresarlo
	Placa char(6) not null,
	Nombre_sucursal varchar(40) not null,
	Nombre_lavado varchar(40) not null,
	Cedula_cliente char(9) not null,
	--Falta fecha
	Atendido_por char(9) not null, --Esto lo agregué de forma temporal, para probar el report
	PRIMARY KEY(ID),
	FOREIGN KEY(Nombre_sucursal) REFERENCES SUCURSAL(Nombre),
	FOREIGN KEY(Nombre_lavado) REFERENCES LAVADO(Nombre),
	FOREIGN KEY(Cedula_cliente) REFERENCES CLIENTE(Cedula),
	Foreign Key(Atendido_por) REFERENCES TRABAJADOR(Cedula)

)


-- if not exists (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'dbo' AND TABLE_NAME = 'TRABAJADORES_POR_CITA')
create table TRABAJADORES_POR_CITA(
	
	Cedula_trabajador char(9) not null,
	ID_cita int not null,
	FOREIGN KEY(Cedula_trabajador) REFERENCES TRABAJADOR(Cedula),
	FOREIGN KEY(ID_Cita) REFERENCES Cita(ID)
)


-- if not exists (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'dbo' AND TABLE_NAME = 'PROVEEDOR')
CREATE TABLE PROVEEDOR 
(
	Cedula_juridica char(9) not null,
	Nombre varchar(20) not null,
	Direccion varchar(100),
	Correo_electronico varchar(50) not null,
	PRIMARY KEY (Cedula_juridica)
);

-- if not exists (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'dbo' AND TABLE_NAME = 'CONTACTO_PROVEEDOR')
CREATE TABLE CONTACTO_PROVEEDOR
(
	Ced_prov char(9) not null,
	Telefono char(8),
	FOREIGN KEY(Ced_prov) REFERENCES PROVEEDOR(Cedula_juridica) 
);

-- if not exists (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'dbo' AND TABLE_NAME = 'PRODUCTO')
CREATE TABLE PRODUCTO
(
	Nombre varchar(20) not null,
	Marca varchar(20) not null, 
	Costo int not null,
	Ced_prov char(9) not null,
	PRIMARY KEY (Nombre),
	FOREIGN KEY (Ced_prov) REFERENCES PROVEEDOR(Cedula_juridica)
); 

-- if not exists (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'dbo' AND TABLE_NAME = 'PRODUCTOS_POR_CLIENTE')
CREATE TABLE PRODUCTOS_POR_CLIENTE
(
	Cedula_cliente char(9) not null,
	Nombre_producto varchar(20) not null,
	FOREIGN KEY (Cedula_cliente) REFERENCES CLIENTE(Cedula),
	FOREIGN KEY (Nombre_producto) REFERENCES PRODUCTO(Nombre)
); 

-- if not exists (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'dbo' AND TABLE_NAME = 'PRODUCTOS_POR_SUCURSAL')
CREATE TABLE PRODUCTOS_POR_SUCURSAL 
(
	Nombre_producto varchar(20),
	Nombre_sucursal varchar(40) 
	FOREIGN KEY (Nombre_producto) REFERENCES PRODUCTO(Nombre),
	FOREIGN KEY (Nombre_sucursal) REFERENCES SUCURSAL(Nombre)
); 

CREATE TABLE FACTURA( --Hice esta tabla solo para poder desplegar el reporte de facturas, le faltan muchas cosas
	ID int not null,
	medio_pago int not NULL,
	total int not null,
	PRIMARY KEY(ID)
);

CREATE TABLE TIPO_DE_PAGO( -- esta si está bien hecha juas juas juas
	ID int not null,
	Nombre varchar(20) not null,
	PRIMARY KEY (ID)
);

-- LLaves foráneas 


ALTER TABLE FACTURA 
ADD CONSTRAINT FK_FACTURA_TIPO_DE_PAGO FOREIGN KEY (medio_pago) REFERENCES TIPO_DE_PAGO(ID);
ALTER TABLE FACTURA
ADD CONSTRAINT FK_FACTURA_CITA FOREIGN KEY (ID) REFERENCES CITA(ID);