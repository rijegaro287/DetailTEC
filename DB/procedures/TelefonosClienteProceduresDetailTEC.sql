go

use DetailTEC

go

--***************  VERIFICACION DE EXISTENCIA DE PROCEDIMIENTOS PARA CLIENTE **************--

IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'telefonos_cliente_registrar')
DROP PROCEDURE telefonos_cliente_registrar

go

IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'telefonos_cliente_modificar')
DROP PROCEDURE telefonos_cliente_modificar

go

IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'telefonos_cliente_obtener')
DROP PROCEDURE telefonos_cliente_obtener

go

IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'telefonos_cliente_listar')
DROP PROCEDURE telefonos_cliente_listar

go

IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'telefonos_cliente_eliminar')
DROP PROCEDURE telefonos_cliente_eliminar

go


--************* CREACION DE PROCEDIMIENTOS PARA CLIENTE ***************--
create procedure telefonos_cliente_registrar(
@Cedula_Cli char(9),
@Telefono char(8)
)

as
begin

insert into TELEFONOS_CLIENTE(Cedula_Cli, Telefono)
values
(
@Cedula_Cli,
@Telefono
)

end


go

create procedure telefonos_cliente_modificar(
@Cedula_Cli char(9),
@Telefono char(8)
)
as
begin

update TELEFONOS_CLIENTE set 
Telefono = @Telefono
where Cedula_Cli = @Cedula_Cli

end

go

create procedure telefonos_cliente_obtener(@Cedula_Cli char(9))
as
begin

select * from TELEFONOS_CLIENTE where Cedula_Cli = @Cedula_Cli
end

go

create procedure telefonos_cliente_listar
as
begin

select * from TELEFONOS_CLIENTE
end


go

go

create procedure telefonos_cliente_eliminar(
@Cedula_Cli char(9)
)
as
begin

delete from TELEFONOS_CLIENTE where Cedula_Cli = @Cedula_Cli

end

go

