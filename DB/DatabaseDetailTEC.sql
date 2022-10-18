
use DetailTEC
GO

create table TRABAJADOR(
	
	Cedula char(9) not null,
	Nombre varchar(20) not null,
	Apellido1 varchar(20) not null,
	Apellido2 varchar(20),
	Fecha_nacimiento date,
	Fecha_ingreso date,
	Edad tinyint,
	PasswordT varchar(20) not null,
	Rol varchar(20) not null,
	Tipo_pago varchar(10) not null,
	PRIMARY KEY(Cedula)

)


create table SUCURSAL(

	Nombre varchar(20) not null,
	Provincia varchar(20),
	Canton varchar(20),
	Distrito varchar(20),
	Telefono char(8) not null,
	Fecha_apertura date,
	Fecha_gerente date,
	Cedula_gerente char(9) not null,
	PRIMARY KEY(Nombre),
	FOREIGN KEY(Cedula_gerente) REFERENCES TRABAJADOR(Cedula)

)


CREATE TABLE LAVADO
(
	Nombre varchar(20) not null,
	Costo int not null,
	Precio int not null,
	Duracion int
	PRIMARY KEY (Nombre) 
)



create table CLIENTE(

	Cedula char(9) not null,
	Nombre varchar(20) not null,
	Apellido1 varchar(20) not null,
	Apellido2 varchar(20),
	Usuario varchar(20) not null,
	Correo varchar(50) not null,
	PasswordC varchar(20) not null,
	Puntos int not null,
	PRIMARY KEY(Cedula)

)



create table TELEFONOS_CLIENTE(
	
	Cedula_Cli char(9) not null,
	Telefono char(8) not null,
	FOREIGN KEY(Cedula_Cli) REFERENCES CLIENTE(Cedula)
	
)

create table DIRECCIONES_CLIENTE(
	
	Cedula_Cli char(9) not null,
	Direccion varchar(100) not null,
	FOREIGN KEY(Cedula_Cli) REFERENCES CLIENTE(Cedula)
	
)


create table CITA(

	ID int not null,
	Placa char(6) not null,
	Nombre_sucursal varchar(20) not null,
	Nombre_lavado varchar(20) not null,
	Cedula_cliente char(9) not null,
	PRIMARY KEY(ID),
	FOREIGN KEY(Nombre_sucursal) REFERENCES SUCURSAL(Nombre),
	FOREIGN KEY(Nombre_lavado) REFERENCES LAVADO(Nombre),
	FOREIGN KEY(Cedula_cliente) REFERENCES CLIENTE(Cedula),

)



create table TRABAJADORES_POR_CITA(
	
	Cedula_trabajador char(9) not null,
	ID_cita int not null,
	FOREIGN KEY(Cedula_trabajador) REFERENCES TRABAJADOR(Cedula),
	FOREIGN KEY(ID_Cita) REFERENCES Cita(ID)
)



CREATE TABLE PROVEEDOR 
(
	Cedula_juridica char(9) not null,
	Nombre varchar(20) not null,
	Direccion varchar(100),
	Correo_electronico varchar(50) not null,
	PRIMARY KEY (Cedula_juridica)
);

CREATE TABLE CONTACTO_PROVEEDOR
(
	Ced_prov char(9) not null,
	Telefono char(8),
	FOREIGN KEY(Ced_prov) REFERENCES PROVEEDOR(Cedula_juridica) 
);

CREATE TABLE PRODUCTO
(
	Nombre varchar(20) not null,
	Marca varchar(20) not null, 
	Costo int not null,
	Ced_prov char(9) not null,
	PRIMARY KEY (Nombre),
	FOREIGN KEY (Ced_prov) REFERENCES PROVEEDOR(Cedula_juridica)
); 

CREATE TABLE PRODUCTOS_POR_CLIENTE
(
	Cedula_cliente char(9) not null,
	Nombre_producto varchar(20) not null,
	FOREIGN KEY (Cedula_cliente) REFERENCES CLIENTE(Cedula),
	FOREIGN KEY (Nombre_producto) REFERENCES PRODUCTO(Nombre)
); 


CREATE TABLE PRODUCTOS_POR_SUCURSAL 
(
	Nombre_producto varchar(20),
	Nombre_sucursal varchar(20) 
	FOREIGN KEY (Nombre_producto) REFERENCES PRODUCTO(Nombre),
	FOREIGN KEY (Nombre_sucursal) REFERENCES SUCURSAL(Nombre)
); 




