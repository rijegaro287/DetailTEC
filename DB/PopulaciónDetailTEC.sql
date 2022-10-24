

USE DetailTEC


INSERT INTO TRABAJADOR (
    Cedula, 
    NombreT, 
    Apellido1, 
    Apellido2, 
	Email,
    Fecha_nacimiento, 
    Fecha_ingreso, 
    Edad, 
    PasswordT, 
    Rol, 
    Tipo_pago) 

VALUES 
    ('118460116', 'Adriana', 'Calderon', 'Barboza', 'emp@gmail.com','2000-12-12', '2000-12-12', '20', 'contrasena01', 'Pulidor', 'Semanal'),
    ('118460126', 'Yordi', 'Brenes', 'Roda', 'emp@gmail.com', '2000-12-12', '2000-12-12', '20', 'contrasena01', 'Lavador', 'Bisemanal'),
    ('118420116', 'Ricardo', 'Gatgens', 'Rodriguz', 'emp@gmail.com', '2000-12-12', '2000-12-12', '20', 'contrasena01', 'Pulidor', 'Bisemanal'),
    ('112410116', 'Anthony', 'Chaves', 'Achoy', 'emp@gmail.com', '2000-12-12', '2000-12-12', '20', 'contrasena01', 'Pulidor', 'Semanal'),
    ('305230771', 'Julian', 'Rodriguez', 'Casas', 'emp@gmail.com', '2000-12-12', '2000-12-12', '40', 'juasjuas', 'Lavador', 'Bisemanal' )

insert into TRABAJADOR(Cedula,NombreT,Apellido1,Apellido2,Email,Fecha_nacimiento,Fecha_ingreso,Edad,PasswordT,Rol,Tipo_pago)
values('255654856', 'Joel', 'Sequeira', 'Hernandez', 'jsh@gmail.com', '22/10/2022 0:00:00', '22/11/2002 0:00:00', '0', 'string1234', 'lavador', 'semanal') 

INSERT INTO SUCURSAL (ID, Nombre, Provincia, Canton, Distrito, Telefono, Cedula_Gerente, Fecha_apertura, Fecha_gerente)
VALUES
    ('01','Sucursal del Atlántico', 'Cartago', 'Turrialba', 'Jimenez', '25310808', '118460126','2000-12-12', '2000-12-12'),
    ('02','Sucursal del Pacífico', 'Puntarenas', 'Jacó', 'Jacó', '25317076', '118460126','2000-12-12', '2000-12-12'),
    ('03','Sucursal Chorotega', 'Guanacaste', 'Nicoya', 'Santa Cruz', '2538133','118460126' ,'2000-12-12', '2000-12-12')


INSERT INTO PROVEEDOR (
    Cedula_juridica, 
    Nombre, 
    Direccion, 
    Correo_electronico)
VALUES
    ('3101101010', 'Lavado de Autos', 'San José, San José, San José', 'lavadoAutos@gmail.com'),
    ('3101101011', 'Limpiadores SA', 'Cartago, Cartago, Cartago', 'limpiautos@hotmail.com')


INSERT INTO CONTACTO_PROVEEDOR(Ced_prov, Telefono)
VALUES
    ('3101101010', '22222222'),
    ('3101101011', '33333333'),
    ('3101101011', '44444444')



INSERT INTO PRODUCTO(ID,NombreP, Marca, Costo, Precio, Ced_prov)
VALUES
    ('01','Cera Genérica', 'Duracel', '1500', '2000', '3101101010'),
    ('02','Nice', 'Handyman', '1000', '2000', '3101101010'),
    ('03','Esponja', 'Shopwise', '300', '500', '3101101010'),
    ('04','Abrillantador', 'PureGold', '3000', '7000', '3101101010'),
    ('05','Jabon', 'WashiShine', '1000', '1500', '3101101011')




INSERT INTO LAVADO (
	ID,
    Nombre, 
    Comision_trabajador, 
    Precio,
	Costo,
    Duracion_en_minutos, 
    Puntos_otorgados, 
    Trabajadores_necesarios)

VALUES
    ('01','Lavado y aspirado', '2000', '3000', '500', '30', '1000', '2'),
    ('02','Lavado y encerado', '3000', '4000', '500', '45', '5000', '2'),
    ('03','Lavado premium y pulido', '5000', '6000', '500', '60', '2000', '2')


INSERT INTO PRODUCTO_LAVADO (ID_Lavado, ID_Producto)
VALUES
    ('01','01'),
    ('01','02'),
	('02','03'),
	('01','03')

insert into Cliente(
    Cedula,
    Nombre, 
    Apellido1, 
    Apellido2, 
    Correo, 
    PasswordC, 
    Puntos_actuales,
    Puntos_totales,
    Puntos_usados)

VALUES
    ('253252410', 'Catalina', 'Salas', 'Ciudad', 'catax@gmail.com','ABC123','0', '1500', '1500'),
    ('532945890', 'Jose Pablo', 'Marin', 'Mora', 'joseju@hotmail.com', 'ABC123','100', '1000', '900'),
    ('692834730', 'Juan Ignacion', 'Naranjo', 'Mora','juanis@gmail.com', 'ABC123', '234', '234', '0'),
    ('353461230', 'Maria Jose', 'Mora', 'Mora', 'maria_la_del_pueblo@hotmail.com', 'ABC123', '0', '0','0')


insert into telefonos_cliente(
    Cedula_Cli,
    Telefono)
VALUES
    ('25325241', '22222222'),
    ('53294589', '33333333'),
    ('69283473', '44444444'),
    ('35346123', '55555555'),
    ('35346123', '66666666')

insert into direcciones_cliente(
    Cedula_Cli, 
    Direccion)
VALUES
    ('25325241', 'San José, San José, San José'),
    ('53294589', 'Cartago, Cartago, Cartago'),
    ('69283473', 'Puntarenas, Puntarenas, Puntarenas'),
    ('35346123', 'Guanacaste, Nicoya, Nicoya'),
    ('35346123', 'Heredia, Heredia, Heredia')


insert into cita(
    ID, 
    Placa, 
    ID_Sucursal, 
    ID_Lavado, 
    Cedula_cliente, 
    Fecha,
    Hora)
VALUES
    ('1', 'P-1234', '01', '01', '25325241', '2000-12-12', '13:00'),
    ('2', 'P-1235', '01', '01', '25325241', '2000-12-12', '14:00'),
    ('3', 'P-1236', '01', '02', '53294589', '2000-12-12', '15:00'),
    ('4', 'P-1237', '01', '03', '35346123', '2000-12-12', '16:00'),
    ('5', 'P-1238', '02', '02', '35346123', '2000-12-12', '17:00'),
    ('6', 'P-1239', '01', '03', '25325241', '2000-12-12', '08:00'),
    ('7', 'P-1240', '02', '02', '25325241', '2000-12-12', '09:00'),
    ('8', 'P-1241', '01', '01', '53294589', '2000-12-12', '10:00'),
    ('9', 'P-1242', '02', '02', '35346123', '2000-12-12', '11:00'),
    ('10', 'P-1243', '01', '02', '35346123', '2000-12-12', '13:00'),
    ('11', 'P-1244', '02', '03', '53294589', '2000-12-12', '14:00'),
    ('12', 'P-1245', '02', '02', '25325241', '2000-12-12', '15:00')

INSERT INTO TRABAJADORES_POR_CITA(
    ID_Cita,
    Cedula_Trabajador)
VALUES  
    ('1', '118460116'),
    ('2', '118460116'),
    ('3', '118460116'),
    ('4', '118460116'),
    ('5', '118460116'),
    ('6', '305230771'),
    ('7', '305230771'),
    ('8', '305230771'),
    ('9', '305230771'),
    ('10', '118460126'),
    ('11', '118460126'),
    ('12', '118460126'),
    ('1', '118460126'),
    ('2', '118460126'),
    ('3', '118460126'),
    ('4', '118460126'),
    ('5', '118460126'),
    ('6', '118460126'),
    ('7', '112410116'),
    ('8', '112410116'),
    ('9', '112410116'),
    ('10', '112410116'),
    ('11', '112410116'),
    ('12', '112410116')

insert into TIPO_DE_PAGO(
    id,
    Nombre)
values
    ('1', 'Efectivo'),
    ('2', 'Tarjeta'),
    ('3', 'Puntos')

insert into FACTURA(
    id, 
    medio_pago, 
    total)
VALUES
    ('1', '1', '3000'),
    ('2', '2', '4000'),
    ('3', '3', '6000'),
    ('4', '1', '3000'),
    ('5', '2', '4000'),
    ('6', '1', '3000'),
    ('7', '1', '3000'),
    ('8', '2', '4000'),
    ('9', '2', '4000'),
    ('10', '1', '3000'),
    ('11', '3', '6000'),
    ('12', '3', '3000')

INSERT INTO PRODUCTOS_COMPRADOS(
    ID_Factura,
    ID_Producto,
    Cantidad)
VALUES
    ('1', '01', '2'),
    ('1', '02', '2'),
    ('2', '01', '1'),
    ('3', '02', '1'),
    ('3', '03', '3'),
    ('4', '02', '1'),
    ('5', '01', '1'),
    ('6', '02', '5')
