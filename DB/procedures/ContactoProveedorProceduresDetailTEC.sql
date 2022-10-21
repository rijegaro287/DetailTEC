go

use DetailTEC

go

--***************  VERIFICACION DE EXISTENCIA DE PROCEDIMIENTOS PARA PROVEEDOR **************--

IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'contacto_proveedor_registrar')
DROP PROCEDURE contacto_proveedor_registrar

go

IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'contacto_proveedor_modificar')
DROP PROCEDURE contacto_proveedor_modificar

go

IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'contacto_proveedor_obtener')
DROP PROCEDURE contacto_proveedor_obtener

go

IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'contacto_proveedor_listar')
DROP PROCEDURE contacto_proveedor_listar

go

IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'contacto_proveedor_eliminar')
DROP PROCEDURE contacto_proveedor_eliminar

go


--************* CREACION DE PROCEDIMIENTOS PARA CONTACTO PROVEEDOR ***************--
create procedure contacto_proveedor_registrar(
@Ced_prov char(9),
@Telefono char(8)
)

as
begin

insert into CONTACTO_PROVEEDOR(Ced_prov, Telefono)
values
(
@Ced_prov,
@Telefono
)

end

go

create procedure contacto_proveedor_modificar(
@Ced_prov char(9),
@Telefono char(8)
)
as
begin

update CONTACTO_PROVEEDOR set 
Ced_prov = @Ced_prov,
Telefono = @Telefono

end

go

create procedure contacto_proveedor_obtener(@Ced_prov char(9))
as
begin

select * from CONTACTO_PROVEEDOR where Ced_prov = @Ced_prov
end

go

create procedure contacto_proveedor_listar
as
begin

select * from CONTACTO_PROVEEDOR
end


go

go

create procedure contacto_proveedor_eliminar(
@Ced_prov char(9)
)
as
begin

delete from CONTACTO_PROVEEDOR where Ced_prov = @Ced_prov

end

go

