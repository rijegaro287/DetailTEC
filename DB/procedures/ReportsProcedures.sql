-- go 
-- use DetailTEC
-- go

-- if EXISTS (
--     SELECT *
--     FROM sys.objects 
--     where type = "P" and name = "staffReport"
-- )
-- DROP PROCEDURE staffReport

-- GO

-- if EXISTS (
--     SELECT *
--     FROM sys.objects 
--     where type = "P" and name = "washingReport"
-- )
-- DROP PROCEDURE washingReport

-- GO

-- if EXISTS (
--     SELECT *
--     FROM sys.objects 
--     where type = "P" and name = "pointsReport"
-- )
-- DROP PROCEDURE pointsReport

-- GO

-- CREATE PROCEDURE staffReport() as 
-- BEGIN
--     Select T.Cedula, T.Nombre, T.Apellido1, T.Apellido2, 
--     From ((Cita as C JOIN Trabajador as T on C.Atendido_por=T.Cedula)
--     JOIN Lavado as L on C.Nombre_lavado=L.Nombre)
--     Where 

GO 

create PROCEDURE washingReport(@cedulaCliente char(9)) as 
Begin
    select Cl.Nombre, Cl.Apellido1, Cl.Apellido2, L.Nombre, COUNT(L.Nombre) as CantidadDeLavados
    from ((Cliente Cl join Cita as Ci on Cl.Cedula = Ci.Cedula_cliente)
    Join Lavado as L on Ci.Nombre_lavado = L.Nombre)
    WHERE Cl.Cedula = @cedulaCliente
    GROUP BY Cl.Nombre, Cl.Apellido1, Cl.Apellido2, L.Nombre
    ORDER By CantidadDeLavados DESC
End

GO

create PROCEDURE pointsReport AS
BEGIN
    select C.Nombre, C.Apellido1, C.Apellido2, C.Puntos_usados
    from Cliente as C
    GROUP By C.Nombre, C.Apellido1, C.Apellido2
    order by PuntosGastados DESC
END

GO
SELECT T.Nombre, T.Apellido1, T.Apellido2, L.Nombre, COUNT(L.Nombre) as CantidadDeLavados, SUM(L.Comision_trabajador) MontoGanadoPorLavados
FROM (((Cita AS C JOIN LAVADO AS L ON C.Nombre_lavado=L.Nombre)
JOIN TRABAJADORES_POR_CITA AS TpC ON Tpc.ID_Cita=C.ID)
JOIN TRABAJADOR AS T ON Tpc.Cedula_Trabajador=T.Cedula)
GROUP BY T.Nombre, T.Apellido1, T.Apellido2, L.Nombre