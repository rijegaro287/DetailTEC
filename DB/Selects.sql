select Cl.Nombre, Cl.Apellido1, Cl.Apellido2, L.Nombre, COUNT(L.Nombre) as CantidadDeLavados
from ((Cliente Cl join Cita as Ci on Cl.Cedula = Ci.Cedula_cliente)
Join Lavado as L on Ci.ID_Lavado = L.ID)
WHERE Cl.Cedula = 25325241
GROUP BY Cl.Nombre, Cl.Apellido1, Cl.Apellido2, L.Nombre
ORDER By CantidadDeLavados DESC

--Puntos de un cliente
select C.Nombre, C.Apellido1, C.Apellido2, C.Puntos_usados
from Cliente as C
order by Puntos_usados DESC

--Plantilla
SELECT T.Cedula, T.NombreT, T.Apellido1, T.Tipo_pago, T.Apellido2, L.Nombre, COUNT(L.Nombre) as CantidadDeLavados, SUM(L.Comision_trabajador) MontoGanadoPorLavados
FROM (((Cita AS C JOIN LAVADO AS L ON C.ID_Lavado=L.ID)
JOIN TRABAJADORES_POR_CITA AS TpC ON Tpc.ID_Cita=C.ID)
JOIN TRABAJADOR AS T ON Tpc.Cedula_Trabajador=T.Cedula)
GROUP BY T.Cedula, T.NombreT, T.Apellido1, T.Apellido2, L.Nombre, T.Tipo_pago
Order by T.Cedula

-- Select de factuaracion
select F.ID, F.medio_pago, F.total, Cl.Cedula as Cedula_cliente, TpC.Cedula_trabajador, L.Nombre as Nombre_lavado, Ci.Fecha, Ci.Hora
from ((((Cita as Ci join Factura as F on Ci.ID = F.ID)
Join TRABAJADORES_POR_CITA TpC ON Ci.ID = TpC.ID_cita)
join Cliente as Cl on Cl.Cedula = Ci.Cedula_cliente)
join Lavado AS L on Ci.ID_Lavado = L.ID)
where F.ID = 1

-- VER TABLAS

Select * FROM CITA
SELECT * FROM CLIENTE
