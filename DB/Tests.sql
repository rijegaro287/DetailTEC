GO

SELECT Ci.id, Cl.Cedula AS CedulaCliente, T.Cedula as CedulaTrabajador, F.total, TP.id as IdTipoDePago
from ((((CITA as Ci join CLIENTE as Cl on Ci.Cedula_cliente = Cl.Cedula)
JOIN FACTURA AS F on Ci.Id = F.Id)
JOIN TRABAJADOR as T on Ci.Atendido_por = T.Cedula)
JOIN TIPO_DE_PAGO as TP on F.medio_pago = TP.Id)
WHERE Ci.id = '1'

GO

EXEC pointsReport;

GO

EXEC  washingReport '25325241';

GO

EXEC billProcedure '1';