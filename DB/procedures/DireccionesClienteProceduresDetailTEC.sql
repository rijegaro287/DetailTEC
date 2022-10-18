go

use DetailTEC

go

--***************  VERIFICACION DE EXISTENCIA DE PROCEDIMIENTOS PARA CLIENTE **************--

IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'direcciones_cliente_registrar')
DROP PROCEDURE direcciones_cliente_registrar

go

IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'direcciones_cliente_modificar')
DROP PROCEDURE direcciones_cliente_modificar

go

IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'direcciones_cliente_obtener')
DROP PROCEDURE direcciones_cliente_obtener

go

IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'direcciones_cliente_listar')
DROP PROCEDURE direcciones_cliente_listar

go

IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'direcciones_cliente_eliminar')
DROP PROCEDURE direcciones_cliente_eliminar

go


--************* CREACION DE PROCEDIMIENTOS PARA CLIENTE ***************--
create procedure direcciones_cliente_registrar(
@Cedula_Cli char(9),
@Direccion varchar(100)
)

as
begin

insert into DIRECCIONES_CLIENTE(Cedula_Cli, Direccion)
values
(
@Cedula_Cli,
@Direccion
)

end


go

create procedure direcciones_cliente_modificar(
@Cedula_Cli char(9),
@Direccion varchar(100)
)
as
begin

update DIRECCIONES_CLIENTE set 
Direccion = @Direccion
where Cedula_Cli = @Cedula_Cli

end

go

create procedure direcciones_cliente_obtener(@Cedula_Cli char(9))
as
begin

select * from DIRECCIONES_CLIENTE where Cedula_Cli = @Cedula_Cli
end

go

create procedure direcciones_cliente_listar
as
begin

select * from DIRECCIONES_CLIENTE
end


go

go

create procedure direcciones_cliente_eliminar(
@Cedula_Cli char(9)
)
as
begin

delete from DIRECCIONES_CLIENTE where Cedula_Cli = @Cedula_Cli

end

go

