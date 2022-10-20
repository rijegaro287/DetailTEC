

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
    ('118460126', 'Yordi', 'Brenes', 'emp@gmail.com', 'Roda', '2000-12-12', '2000-12-12', '20', 'contrasena01', 'Lavador', 'Bisemanal'),
    ('118420116', 'Ricardo', 'Gatgens', 'Rodriguz', 'emp@gmail.com', '2000-12-12', '2000-12-12', '20', 'contrasena01', 'Pulidor', 'Bisemanal'),
    ('112410116', 'Anthony', 'Chaves', 'Achoy', 'emp@gmail.com', '2000-12-12', '2000-12-12', '20', 'contrasena01', 'Pulidor', 'Semanal'),
    ('305230771', 'Julian', 'Rodriguez', 'Casas', 'emp@gmail.com', '2000-12-12', '2000-12-12', '40', 'juasjuas', 'Lavador', 'Bisemanal' )


INSERT INTO SUCURSAL (Nombre, Provincia, Canton, Distrito, Telefono, Cedula_Gerente, Fecha_apertura, Fecha_gerente)
VALUES
    ('Sucursal del Atlántico', 'Cartago', 'Turrialba', 'Jimenez', '25310808', '118460126','2000-12-12', '2000-12-12'),
    ('Sucursal del Pacífico', 'Puntarenas', 'Jacó', 'Jacó', '25317076', '118460126','2000-12-12', '2000-12-12'),
    ('Sucursal Chorotega', 'Guanacaste', 'Nicoya', 'Santa Cruz', '2538133','118460126' ,'2000-12-12', '2000-12-12')

INSERT INTO SUCURSAL_TRABAJADOR (Cedula_trabajador, Nombre_sucursal)
VALUES
    ('118460116', 'Sucursal del Atlántico'),
    ('118460126', 'Sucursal del Pacífico'),
    ('118420116', 'Sucursal Chorotega'),
    ('112410116', 'Sucursal del Atlántico'),
    ('305230771', 'Sucursal del Pacífico')


INSERT INTO GERENTE_SUCURSAL (Trabajador_Cedula, Sucursal_Nombre, Fecha_inicio, Fecha_fin)
VALUES
    ('118460116', 'Sucursal del Atlántico', '2000-12-12', '2000-12-12'),
    ('118460126', 'Sucursal del Pacífico', '2000-12-12', '2000-12-12'),
    ('118420116', 'Sucursal Chorotega', '2000-12-12', '2000-12-12')


INSERT INTO PROVEEDOR (
    Cedula_juridica, 
    Nombre, 
    Direccion, 
    Correo_electronico)
VALUES
    ('3-101-101010', 'Lavado de Autos', 'San José, San José, San José', 'lavadoAutos@gmail.com'),
    ('3-101-101011', 'Limpiadores SA', 'Cartago, Cartago, Cartago', 'limpiautos@hotmail.com')


INSERT INTO CONTACTO_PROVEEDOR(Ced_prov, Telefono)
VALUES
    ('3-101-101010', '22222222'),
    ('3-101-101011', '33333333'),
    ('3-101-101011', '44444444')


INSERT INTO PRODUCTO(Nombre, Marca, Costo, Precio, Ced_prov)
VALUES
    ('Cera Genérica', 'Duracel', '1500', '2000', '3-101-101010'),
    ('Nice', 'Handyman', '1000', '2000', '3-101-101010'),
    ('Esponja', 'Shopwise', '300', '500', '3-101-101010'),
    ('Abrillantador', 'PureGold', '3000', '7000', '3-101-101010'),
    ('Jabon', 'WashiShine', '1000', '1500', '3-101-101011')


INSERT INTO LAVADO (
    Nombre, 
    Comision_trabajador, 
    Precio, 
    Duracion_en_minutos, 
    Puntos_otorgados, 
    Trabajadores_necesarios)

VALUES
    ('Lavado y aspirado', '2000', '3000', '30', '1000', '2'),
    ('Lavado y encerado', '3000', '4000', '45', '5000', '2'),
    ('Lavado premium y pulido', '5000', '6000', '60', '2000', '2')


INSERT INTO PRODUCTO_LAVADO (Nombre_producto, Nombre_lavado)
VALUES
    ('Nice', 'Lavado y aspirado'),
    ('Esponja', 'Lavado y aspirado'),
    ('Jabon', 'Lavado y aspirado'),
    ('Cera Genérica', 'Lavado y encerado'),
    ('Nice', 'Lavado y encerado'),
    ('Esponja', 'Lavado y encerado'),
    ('Jabon', 'Lavado y encerado'),
    ('Cera Genérica', 'Lavado premium y pulido'),
    ('Nice', 'Lavado premium y pulido'),
    ('Esponja', 'Lavado premium y pulido'),
    ('Abrillantador', 'Lavado premium y pulido'),
    ('Jabon', 'Lavado premium y pulido')

insert into Cliente(
    Cedula,
    Nombre, 
    Apellido1, 
    Apellido2, 
    Usuario, 
    Correo, 
    PasswordC, 
    Puntos_actuales,
    Puntos_totales,
    Puntos_usados)

VALUES
    ('25325241', 'Catalina', 'Salas', 'Ciudad','catax', 'catax@gmail.com','ABC123','0', '1500', '1500'),
    ('53294589', 'Jose Pablo', 'Marin', 'Mora','joseju', 'joseju@hotmail.com', 'ABC123','100', '1000', '900'),
    ('69283473', 'Juan Ignacion', 'Naranjo', 'Tulipa','juanis', 'juanis@gmail.com', 'ABC123', '234', '234', '0'),
    ('35346123', 'Maria Jose', 'Mora', 'Mora','maria_la_del_pueblo', 'maria_la_del_pueblo@hotmail.com', 'ABC123', '0', '0','0')


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
    Nombre_sucursal, 
    Nombre_lavado, 
    Cedula_cliente, 
    Fecha,
    Hora)
VALUES
    ('1', 'P-1234', 'Sucursal del Atlántico', 'Lavado y aspirado', '25325241', '2000-12-12', '13:00'),
    ('2', 'P-1235', 'Sucursal del Pacífico', 'Lavado y encerado', '25325241', '2000-12-12', '14:00'),
    ('3', 'P-1236', 'Sucursal Chorotega', 'Lavado premium y pulido', '53294589', '2000-12-12', '15:00'),
    ('4', 'P-1237', 'Sucursal del Atlántico', 'Lavado y aspirado', '35346123', '2000-12-12', '16:00'),
    ('5', 'P-1238', 'Sucursal del Pacífico', 'Lavado y encerado', '35346123', '2000-12-12', '17:00'),
    ('6', 'P-1239', 'Sucursal del Atlántico', 'Lavado y aspirado', '25325241', '2000-12-12', '08:00'),
    ('7', 'P-1240', 'Sucursal del Atlántico', 'Lavado y aspirado', '25325241', '2000-12-12', '09:00'),
    ('8', 'P-1241', 'Sucursal del Atlántico', 'Lavado y encerado', '53294589', '2000-12-12', '10:00'),
    ('9', 'P-1242', 'Sucursal del Atlántico', 'Lavado y encerado', '35346123', '2000-12-12', '11:00'),
    ('10', 'P-1243', 'Sucursal del Atlántico', 'Lavado y aspirado', '35346123', '2000-12-12', '13:00'),
    ('11', 'P-1244', 'Sucursal del Atlántico', 'Lavado premium y pulido', '53294589', '2000-12-12', '14:00'),
    ('12', 'P-1245', 'Sucursal del Atlántico', 'Lavado premium y pulido', '25325241', '2000-12-12', '15:00')

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
    Nombre_producto,
    Cantidad)
VALUES
    ('1', 'Esponja', '2'),
    ('1', 'Jabon', '2'),
    ('2', 'Abrillantador', '1'),
    ('3', 'Jabon', '1'),
    ('3', 'Abrillantador', '3'),
    ('4', 'Esponja', '1'),
    ('5', 'Jabon', '1'),
    ('6', 'Abrillantador', '5')
    

