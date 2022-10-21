go

use DetailTEC

go

--***************  VERIFICACION DE EXISTENCIA DE PROCEDIMIENTOS PARA PRODUCTO **************--

IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'productos_registrar')
DROP PROCEDURE productos_registrar

go

IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'productos_modificar')
DROP PROCEDURE productos_modificar

go

IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'productos_obtener')
DROP PROCEDURE productos_obtener

go

IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'productos_listar')
DROP PROCEDURE productos_listar

go

IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'producto_eliminar')
DROP PROCEDURE productos_eliminar

go


--************* CREACION DE PROCEDIMIENTOS PARA PRODUCTO ***************--
create procedure productos_registrar(
@Nombre varchar(20),
@Marca varchar(20), 
@Costo int,
@Ced_prov char(9)
)

as
begin

insert into PRODUCTO(Nombre, Marca, Costo, Ced_prov)
values
(
@Nombre,
@Marca, 
@Costo,
@Ced_prov
)

end

go

create procedure productos_modificar(
@Nombre varchar(20),
@Marca varchar(20), 
@Costo int,
@Ced_prov char(9) 
)
as
begin

update PRODUCTO set 
Nombre = @Nombre,
Marca = @Marca, 
Costo = @Costo,
Ced_prov = @Ced_prov

end

go

create procedure productos_obtener(@Nombre varchar(20))
as
begin

select * from PRODUCTO where Nombre = @Nombre
end

go

create procedure productos_listar
as
begin

select * from PRODUCTO
end


go

go

create procedure productos_eliminar(
@Nombre varchar(20)
)
as
begin

delete from PRODUCTO where  Nombre = @Nombre

end

go

