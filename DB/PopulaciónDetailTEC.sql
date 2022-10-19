GO

USE DetailTEC

GO

INSERT INTO TRABAJADOR (Cedula, Nombre, Apellido1, Apellido2, Fecha_nacimiento, Fecha_ingreso, Edad, PasswordT, Rol, Tipo_pago) 
VALUES 
    ('118460116', 'Adriana', 'Calderon', 'Barboza', '06/18/1935', '02/03/1950', '20', 'contrasena01', 'Pulidor', 'Semanal'),
    ('118460126', 'Yordi', 'Brenes', 'Roda', '02/25/2000', '10/16/2022', '20', 'contrasena01', 'Lavador', 'Bisemanal'),
    ('118420116', 'Ricardo', 'Gatgens', 'Rodriguz', '06/18/2002', '10/16/1999', '20', 'contrasena01', 'Pulidor', 'Bisemanal'),
    ('112410116', 'Anthony', 'Chaves', 'Achoy', '07/08/2000', '10/25/2020', '20', 'contrasena01', 'Pulidor', 'Semanal'),
    ('305230771', 'Julian', 'Rodriguez', 'Casas', '09/09/1970', '02/03/1990', '40', 'juasjuas', 'Lavador', 'Bisemanal' )

GO

INSERT INTO SUCURSAL (Nombre, Provincia, Canton, Distrito, Telefono, Fecha_apertura, Fecha_gerente, Cedula_gerente)
VALUES
    ('Sucursal del Atlántico', 'Cartago', 'Turrialba', 'Jimenez', '25310808', '02/03/1950', '02/03/1950', '118460116'),
    ('Sucursal del Pacífico', 'Puntarenas', 'Jacó', 'Jacó', '25317076', '02/03/1990', '02/03/1990', '305230771'),
    ('Sucursal Chorotega', 'Guanacaste', 'Nicoya', 'Santa Cruz', '2538133', '02/03/2020', '02/03/2020', '112410116')
GO

INSERT INTO LAVADO (Nombre, Costo, Precio, Duracion)
VALUES
    ('Lavado y aspirado', '2000', '3000', '30'),
    ('Lavado y encerado', '3000', '4000', '45'),
    ('Lavado premium y pulido', '5000', '6000', '60')
GO

insert into Cliente(Cedula, Nombre, Apellido1, Apellido2, Usuario, Correo, PasswordC, Puntos)

VALUES
    ('25325241', 'Catalina', 'Salas', 'Ciudad','catax', 'catax@gmail.com','ABC123','0'),
    ('53294589', 'Jose Pablo', 'Marin', 'Mora','joseju', 'joseju@hotmail.com', 'ABC123','100'),
    ('69283473', 'Juan Ignacion', 'Naranjo', 'Tulipa','juanis', 'juanis@gmail.com', 'ABC123', '234'),
    ('35346123', 'Maria Jose', 'Mora', 'Mora','maria_la_del_pueblo', 'maria_la_del_pueblo@hotmail.com', 'ABC123', '0')


--insert into telefonos_cliente

--insert into direcciones_cliente

insert into cita(ID, Placa, Nombre_sucursal, Nombre_lavado, Cedula_cliente, Atendido_por)
VALUES
    ('1', 'P-1234', 'Sucursal del Atlántico', 'Lavado y aspirado', '25325241', '118460116'),
    ('2', 'P-1235', 'Sucursal del Pacífico', 'Lavado y encerado', '25325241', '118460116'),
    ('3', 'P-1236', 'Sucursal Chorotega', 'Lavado premium y pulido', '53294589', '118460126'),
    ('4', 'P-1237', 'Sucursal del Atlántico', 'Lavado y aspirado', '35346123', '305230771'),
    ('5', 'P-1238', 'Sucursal del Pacífico', 'Lavado y encerado', '35346123', '305230771'),
    ('6', 'P-1239', 'Sucursal del Atlántico', 'Lavado y aspirado', '25325241', '118460116'),
    ('7', 'P-1240', 'Sucursal del Atlántico', 'Lavado y aspirado', '25325241', '118460116'),
    ('8', 'P-1241', 'Sucursal del Atlántico', 'Lavado y encerado', '53294589', '118460116'),
    ('9', 'P-1242', 'Sucursal del Atlántico', 'Lavado y encerado', '35346123', '118460116'),
    ('10', 'P-1243', 'Sucursal del Atlántico', 'Lavado y aspirado', '35346123', '118460116'),
    ('11', 'P-1244', 'Sucursal del Atlántico', 'Lavado premium y pulido', '53294589', '118460116'),
    ('12', 'P-1245', 'Sucursal del Atlántico', 'Lavado premium y pulido', '25325241', '118460116')

insert into TIPO_DE_PAGO(id, Nombre)
values
    ('1', 'Efectivo'),
    ('2', 'Tarjeta'),
    ('3', 'Puntos')

insert into FACTURA(id, medio_pago, total)
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
