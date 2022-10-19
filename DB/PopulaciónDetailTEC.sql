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



-- select * from TRABAJADOR
