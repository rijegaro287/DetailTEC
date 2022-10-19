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
    select Cl.Nombre, Cl.Apellido1, Cl.Apellido2, SUM(F.total) as PuntosGastados
    from (((CLIENTE as CL join CITA as CI on CL.Cedula = CI.Cedula_cliente)
    join Factura as F on CI.Id=F.Id)
    join TIPO_DE_PAGO as TP on F.medio_pago=TP.Id)
    Where TP.id = '3'
    GROUP By Cl.Nombre, Cl.Apellido1, Cl.Apellido2
    order by PuntosGastados DESC
END
