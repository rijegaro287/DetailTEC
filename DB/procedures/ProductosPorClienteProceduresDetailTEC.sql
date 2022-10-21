go

use DetailTEC

go

--***************  VERIFICACION DE EXISTENCIA DE PROCEDIMIENTOS PARA PRODUCTOS POR CLIENTE **************--

IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'productos_por_cliente_registrar')
DROP PROCEDURE productos_por_cliente_registrar

go

IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'productos_por_cliente_modificar')
DROP PROCEDURE productos_por_cliente_modificar

go

IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'productos_por_cliente_obtener')
DROP PROCEDURE productos_por_cliente_obtener

go

IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'productos_por_cliente_listar')
DROP PROCEDURE productos_por_cliente_listar

go

IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'productos_por_cliente_eliminar')
DROP PROCEDURE productos_por_cliente_eliminar

go


--************* CREACION DE PROCEDIMIENTOS PARA PRODUCTOS_POR_CLIENTE ***************--
create procedure productos_por_cliente_registrar(
@Cedula_cliente char(9),
@Nombre_producto char(8)
)

as
begin

insert into PRODUCTOS_POR_CLIENTE(Cedula_cliente, Nombre_producto)
values
(
@Cedula_cliente,
@Nombre_producto
)

end

go

create procedure productos_por_cliente_modificar(
@Cedula_cliente char(9),
@Nombre_producto char(8)
)
as
begin

update PRODUCTOS_POR_CLIENTE set 
Cedula_cliente = @Cedula_cliente,
Nombre_producto = @Nombre_producto

end

go

create procedure productos_por_cliente_obtener(@Cedula_cliente char(9))
as
begin

select * from PRODUCTOS_POR_CLIENTE where Cedula_cliente = @Cedula_cliente
end

go

create procedure productos_por_cliente_listar
as
begin

select * from PRODUCTOS_POR_CLIENTE
end


go

go

create procedure productos_por_cliente_eliminar(
@Cedula_cliente char(9)
)
as
begin

delete from PRODUCTOS_POR_CLIENTE where  Cedula_cliente = @Cedula_cliente

end

go

