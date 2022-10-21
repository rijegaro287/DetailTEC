select Cl.Nombre, Cl.Apellido1, Cl.Apellido2, L.Nombre, COUNT(L.Nombre) as CantidadDeLavados
from ((Cliente Cl join Cita as Ci on Cl.Cedula = Ci.Cedula_cliente)
Join Lavado as L on Ci.Nombre_lavado = L.Nombre)
WHERE Cl.Cedula = 25325241
GROUP BY Cl.Nombre, Cl.Apellido1, Cl.Apellido2, L.Nombre
ORDER By CantidadDeLavados DESC

select C.Nombre, C.Apellido1, C.Apellido2, C.Puntos_usados
from Cliente as C
order by Puntos_usados DESC

SELECT T.Cedula, T.NombreT, T.Apellido1, T.Tipo_pago, T.Apellido2, L.Nombre, COUNT(L.Nombre) as CantidadDeLavados, SUM(L.Comision_trabajador) MontoGanadoPorLavados
FROM (((Cita AS C JOIN LAVADO AS L ON C.Nombre_lavado=L.Nombre)
JOIN TRABAJADORES_POR_CITA AS TpC ON Tpc.ID_Cita=C.ID)
JOIN TRABAJADOR AS T ON Tpc.Cedula_Trabajador=T.Cedula)
GROUP BY T.Cedula, T.NombreT, T.Apellido1, T.Apellido2, L.Nombre, T.Tipo_pago
Order by T.Cedula

SELECT Ci.id, Cl.Cedula AS CedulaCliente, TpC.Cedula_trabajador as CedulaTrabajador, F.total, TP.id as IdTipoDePago
from ((((CITA as Ci join CLIENTE as Cl on Ci.Cedula_cliente = Cl.Cedula)
JOIN FACTURA AS F on Ci.Id = F.Id)
JOIN TRABAJADORES_POR_CITA as TpC on Ci.ID = TpC.ID_cita)
JOIN TIPO_DE_PAGO as TP on F.medio_pago = TP.Id)
WHERE Ci.id = 1