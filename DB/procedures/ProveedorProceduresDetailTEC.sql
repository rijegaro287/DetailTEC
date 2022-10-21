go

use DetailTEC

go

--***************  VERIFICACION DE EXISTENCIA DE PROCEDIMIENTOS PARA PROVEEDOR **************--

IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'proveedor_registrar')
DROP PROCEDURE proveedor_registrar

go

IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'proveedor_modificar')
DROP PROCEDURE proveedor_modificar

go

IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'proveedor_obtener')
DROP PROCEDURE proveedor_obtener

go

IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'proveedor_listar')
DROP PROCEDURE proveedor_listar

go

IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'proveedor_eliminar')
DROP PROCEDURE proveedor_eliminar

go


--************* CREACION DE PROCEDIMIENTOS PARA PROVEEDOR ***************--
create procedure proveedor_registrar(
@Cedula_juridica char(9),
@Nombre varchar(20),
@Direccion varchar(100),
@Correo_electronico varchar(50)
)

as
begin

insert into PROVEEDOR(Cedula_juridica, Nombre, Direccion, Correo_electronico)
values
(
@Cedula_juridica,
@Nombre,
@Direccion,
@Correo_electronico
)

end

go

create procedure proveedor_modificar(
@Cedula_juridica char(9),
@Nombre varchar(20),
@Direccion varchar(100),
@Correo_electronico varchar(50)
)
as
begin

update PROVEEDOR set 
Cedula_juridica = @Cedula_juridica,
Nombre = @Nombre,
Direccion = @Direccion,
Correo_electronico = @Correo_electronico
where Cedula_juridica = @Cedula_juridica

end

go

create procedure proveedor_obtener(@Cedula_juridica char(9))
as
begin

select * from PROVEEDOR where Cedula_juridica = @Cedula_juridica
end

go

create procedure proveedor_listar
as
begin

select * from PROVEEDOR
end


go

go

create procedure proveedor_eliminar(
@Cedula_juridica char(9)
)
as
begin

delete from PROVEEDOR where Cedula_juridica = @Cedula_juridica

end

go

