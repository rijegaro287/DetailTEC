if EXISTS (
    SELECT *
    FROM sys.objects 
    where type = "P" and name = "billProcedure"
)
DROP PROCEDURE billProcedure

CREATE PROCEDURE billProcedure(@idCita int) AS
BEGIN
    SELECT Ci.id, Cl.Cedula AS CedulaCliente, T.Cedula as CedulaTrabajador, F.total, TP.id as IdTipoDePago
    from ((((CITA as Ci join CLIENTE as Cl on Ci.Cedula_cliente = Cl.Cedula)
    JOIN FACTURA AS F on Ci.Id = F.Id)
    JOIN TRABAJADOR as T on Ci.Atendido_por = T.Cedula)
    JOIN TIPO_DE_PAGO as TP on F.medio_pago = TP.Id)
    WHERE Ci.id = @idCita 
END