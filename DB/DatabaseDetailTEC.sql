
create database DetailTEC

use DetailTEC

IF OBJECT_ID(N'dbo.PRODUCTOS_COMPRADOS', N'U') IS NOT NULL  
	DROP TABLE [dbo].[PRODUCTOS_COMPRADOS];  
IF OBJECT_ID(N'dbo.FACTURA', N'U') IS NOT NULL  
	DROP TABLE [dbo].[FACTURA];  
IF OBJECT_ID(N'dbo.TIPO_DE_PAGO', N'U') IS NOT NULL  
	DROP TABLE [dbo].[TIPO_DE_PAGO];
IF OBJECT_ID(N'dbo.TRABAJADORES_POR_CITA', N'U') IS NOT NULL  
	DROP TABLE [dbo].[TRABAJADORES_POR_CITA];
IF OBJECT_ID(N'dbo.CITA', N'U') IS NOT NULL
	DROP TABLE [dbo].[CITA];
IF OBJECT_ID(N'dbo.DIRECCIONES_CLIENTE', N'U') IS NOT NULL
	DROP TABLE [dbo].[DIRECCIONES_CLIENTE];
IF OBJECT_ID(N'dbo.TELEFONOS_CLIENTE', N'U') IS NOT NULL
	DROP TABLE [dbo].[TELEFONOS_CLIENTE];
IF OBJECT_ID(N'dbo.CLIENTE', N'U') IS NOT NULL
	DROP TABLE [dbo].[CLIENTE];
IF OBJECT_ID(N'dbo.PRODUCTO_LAVADO', N'U') IS NOT NULL
	DROP TABLE [dbo].[PRODUCTO_LAVADO];
IF OBJECT_ID(N'dbo.LAVADO', N'U') IS NOT NULL
	DROP TABLE [dbo].[LAVADO];
IF OBJECT_ID(N'dbo.PRODUCTO', N'U') IS NOT NULL
	DROP TABLE [dbo].[PRODUCTO];
IF OBJECT_ID(N'dbo.CONTACTO_PROVEEDOR', N'U') IS NOT NULL
	DROP TABLE [dbo].[CONTACTO_PROVEEDOR];
IF OBJECT_ID(N'dbo.PROVEEDOR', N'U') IS NOT NULL
	DROP TABLE [dbo].[PROVEEDOR];
IF OBJECT_ID(N'dbo.GERENTE_SUCURSAL', N'U') IS NOT NULL
	DROP TABLE [dbo].[GERENTE_SUCURSAL];
IF OBJECT_ID(N'dbo.SUCURSAL_TRABAJADOR', N'U') IS NOT NULL
	DROP TABLE [dbo].[SUCURSAL_TRABAJADOR];
IF OBJECT_ID(N'dbo.SUCURSAL', N'U') IS NOT NULL
	DROP TABLE [dbo].[SUCURSAL];
IF OBJECT_ID(N'dbo.TRABAJADOR', N'U') IS NOT NULL
	DROP TABLE [dbo].[TRABAJADOR];

GO

create table TRABAJADOR(
	Cedula char(9) not null,
	NombreT varchar(20) not null,
	Apellido1 varchar(20) not null,
	Apellido2 varchar(20),
	Fecha_nacimiento date not null,
	Fecha_ingreso date,
	Email varchar(50) not null,
	Edad tinyint, --La edad se calcula en la base de datos, no se ingresa
	PasswordT varchar(20) not null,
	Rol varchar(20) not null, -- Creo que rol debería ser una tabla
	Tipo_pago varchar(10) not null, -- El tipo de pago debería ser otra tabla
	PRIMARY KEY(Cedula)
)


create table SUCURSAL(

	Nombre varchar(40) not null,
	Provincia varchar(20),
	Canton varchar(20),
	Distrito varchar(20),
	Telefono char(8) not null,
	Cedula_Gerente char(9) not null,
	Fecha_apertura date,
	Fecha_gerente date,
	PRIMARY KEY(Nombre)
)



--CREATE TABLE SUCURSAL_TRABAJADOR(
--	Cedula_trabajador char(9) not null,
--	Nombre_sucursal varchar(40) not null,
--	PRIMARY KEY(Cedula_trabajador,Nombre_sucursal)
--)

--CREATE TABLE GERENTE_SUCURSAL(
--	Trabajador_Cedula char(9) not null,
--	Sucursal_Nombre varchar(40) not null,
--	Fecha_inicio date,
--	Fecha_fin date,
--	PRIMARY KEY(Trabajador_Cedula, Sucursal_Nombre)
--)

CREATE TABLE PROVEEDOR 
(
	Cedula_juridica char(20) not null,
	Nombre varchar(20) not null,
	Direccion varchar(100),
	Correo_electronico varchar(50) not null,
	PRIMARY KEY (Cedula_juridica)
);

CREATE TABLE CONTACTO_PROVEEDOR
(
	Ced_prov char(20) not null,
	Telefono char(8),
);

CREATE TABLE PRODUCTO
(
	Nombre varchar(20) not null,
	Marca varchar(20) not null, 
	Costo int not null,
	Precio int not null,
	Ced_prov char(20) not null,
	PRIMARY KEY (Nombre),
); 

CREATE TABLE LAVADO
(
	Nombre varchar(40) not null,
	Comision_trabajador int not null,
	Precio int not null,
	Duracion_en_minutos int,
	Puntos_otorgados int,
	Trabajadores_necesarios int,
	PRIMARY KEY (Nombre)
)

CREATE TABLE PRODUCTO_LAVADO(
	Nombre_producto varchar(20) not null,
	Nombre_lavado varchar(40) not null,
	PRIMARY KEY (Nombre_producto, Nombre_lavado)
)

create table CLIENTE(

	Cedula char(9) not null,
	Nombre varchar(20) not null,
	Apellido1 varchar(20) not null,
	Apellido2 varchar(20),
	Usuario varchar(20) not null,
	Correo varchar(50) not null,
	PasswordC varchar(20) not null, -- Hay que hacer que no de pueda ver la contraseña
	Puntos_actuales int ,
	Puntos_totales int, 
	Puntos_usados int,
	PRIMARY KEY(Cedula)
)

create table TELEFONOS_CLIENTE(
	
	Cedula_Cli char(9) not null,
	Telefono char(8) not null
	
)

create table DIRECCIONES_CLIENTE(
	
	Cedula_Cli char(9) not null,
	Direccion varchar(100) not null
	
)

create table CITA(

	ID int not null, -- el id se debería de generar automáticamente
	Placa char(6) not null,
	Nombre_sucursal varchar(40) not null,
	Nombre_lavado varchar(40) not null,
	Cedula_cliente char(9) not null,
	Fecha date not null, 
	Hora time not null,
	PRIMARY KEY(ID)
)

create table TRABAJADORES_POR_CITA(
	
	Cedula_trabajador char(9) not null,
	ID_cita int not null
)

CREATE TABLE TIPO_DE_PAGO( 
	ID int not null,
	Nombre varchar(20) not null,
	PRIMARY KEY (ID)
);

CREATE TABLE FACTURA( 
	ID int not null,
	medio_pago int not NULL,
	total int not null, -- se debe calcular solo
	PRIMARY KEY(ID)
);

CREATE TABLE PRODUCTOS_COMPRADOS(
	Nombre_producto varchar(20) not null,
	ID_Factura INT NOT NULL,
	Cantidad int not null
);

GO 

-- LLaves foráneas
--ALTER TABLE GERENTE_SUCURSAL
--ADD CONSTRAINT Fk_GERENTE_SUCURSAL_SUCURSAL FOREIGN KEY (Sucursal_Nombre) REFERENCES SUCURSAL(Nombre);
--ALTER TABLE GERENTE_SUCURSAL
--ADD CONSTRAINT FK_GERENTE_SUCURSAL_TRABAJADOR FOREIGN KEY (Trabajador_Cedula) REFERENCES TRABAJADOR(Cedula);

--ALTER TABLE SUCURSAL_TRABAJADOR
--ADD CONSTRAINT FK_SUCURSAL_TRABAJADOR_SUCURSAL FOREIGN KEY (Nombre_sucursal) REFERENCES SUCURSAL(Nombre);
--ALTER TABLE SUCURSAL_TRABAJADOR
--ADD CONSTRAINT FK_SUCURSAL_TRABAJADOR_TRABAJADOR FOREIGN KEY (Cedula_trabajador) REFERENCES TRABAJADOR(Cedula);

ALTER TABLE SUCURSAL
ADD CONSTRAINT FK_CEDULA_GERENTE FOREIGN KEY (Cedula_Gerente) REFERENCES TRABAJADOR(Cedula)

ALTER TABLE CONTACTO_PROVEEDOR
ADD CONSTRAINT FK_CONTACTO_PROVEEDOR_PROVEEDOR FOREIGN KEY (Ced_prov) REFERENCES PROVEEDOR(Cedula_juridica);

ALTER TABLE PRODUCTO
ADD CONSTRAINT FK_PRODUCTO_PROVEEDOR FOREIGN KEY (Ced_prov) REFERENCES PROVEEDOR(Cedula_juridica);

ALTER TABLE PRODUCTO_LAVADO
ADD CONSTRAINT FK_PRODUCTO_LAVADO_LAVADO FOREIGN KEY (Nombre_lavado) REFERENCES LAVADO(Nombre);
ALTER TABLE PRODUCTO_LAVADO
ADD CONSTRAINT FK_PRODUCTO_LAVADO_PRODUCTO FOREIGN KEY (Nombre_producto) REFERENCES PRODUCTO(Nombre);

ALTER TABLE TELEFONOS_CLIENTE
ADD CONSTRAINT FK_TELEFONOS_CLIENTE_CLIENTE FOREIGN KEY (Cedula_Cli) REFERENCES CLIENTE(Cedula);

ALTER TABLE DIRECCIONES_CLIENTE
ADD CONSTRAINT FK_DIRECCIONES_CLIENTE_CLIENTE FOREIGN KEY (Cedula_Cli) REFERENCES CLIENTE(Cedula);

ALTER TABLE CITA
ADD CONSTRAINT FK_CITA_SUCURSAL FOREIGN KEY (Nombre_sucursal) REFERENCES SUCURSAL(Nombre);
ALTER TABLE CITA
ADD CONSTRAINT FK_CITA_LAVADO FOREIGN KEY (Nombre_lavado) REFERENCES LAVADO(Nombre);
ALTER TABLE CITA
ADD CONSTRAINT FK_CITA_CLIENTE FOREIGN KEY (Cedula_cliente) REFERENCES CLIENTE(Cedula);

ALTER TABLE TRABAJADORES_POR_CITA
ADD CONSTRAINT FK_TRABAJADORES_POR_CITA_CITA FOREIGN KEY (ID_cita) REFERENCES CITA(ID);
ALTER TABLE TRABAJADORES_POR_CITA
ADD CONSTRAINT FK_TRABAJADORES_POR_CITA_TRABAJADOR FOREIGN KEY (Cedula_trabajador) REFERENCES TRABAJADOR(Cedula);

ALTER TABLE FACTURA 
ADD CONSTRAINT FK_FACTURA_TIPO_DE_PAGO FOREIGN KEY (medio_pago) REFERENCES TIPO_DE_PAGO(ID);
ALTER TABLE FACTURA
ADD CONSTRAINT FK_FACTURA_CITA FOREIGN KEY (ID) REFERENCES CITA(ID);

ALTER TABLE PRODUCTOS_COMPRADOS
ADD CONSTRAINT FK_PRODUCTOS_COMPRADOS_FACTURA FOREIGN KEY (ID_Factura) REFERENCES FACTURA(ID);