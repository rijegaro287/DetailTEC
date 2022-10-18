go

use DetailTEC

go

--***************  VERIFICACION DE EXISTENCIA DE PROCEDIMIENTOS PARA SUCURSAL ****************--

IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'sucursal_registrar')
DROP PROCEDURE sucursal_registrar

go

IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'sucursal_modificar')
DROP PROCEDURE sucursal_modificar

go

IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'sucursal_obtener')
DROP PROCEDURE sucursal_obtener

go

IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'sucursal_listar')
DROP PROCEDURE sucursal_listar

go

IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'sucursal_eliminar')
DROP PROCEDURE sucursal_eliminar

go


--************* CREACION DE PROCEDIMIENTOS PARA SUCURSAL ***************--
create procedure sucursal_registrar(
@Nombre varchar(20),
@Provincia varchar(20),
@Canton varchar(20),
@Distrito varchar(20),
@Telefono char(8),
@Fecha_apertura date,
@Fecha_gerente date,
@Cedula_gerente char(9)
)

as
begin

insert into SUCURSAL(Nombre,Provincia, Canton, Distrito, Telefono,
Fecha_apertura, Fecha_gerente, Cedula_gerente)
values
(
@Nombre,
@Provincia,
@Canton,
@Distrito,
@Telefono,
@Fecha_apertura,
@Fecha_gerente,
@Cedula_gerente
)

end


go

create procedure sucursal_modificar(
@Nombre varchar(20),
@Provincia varchar(20),
@Canton varchar(20),
@Distrito varchar(20),
@Telefono char(8),
@Fecha_apertura date,
@Fecha_gerente date,
@Cedula_gerente char(9)
)
as
begin

update SUCURSAL set 
Provincia = @Provincia,
Canton = @Canton,
Distrito = @Distrito,
Telefono = @Telefono,
Fecha_apertura = @Fecha_apertura,
Fecha_gerente = @Fecha_gerente,
Cedula_gerente = @Cedula_gerente
where Nombre = @Nombre

end

go

create procedure sucursal_obtener(@Nombre varchar(20))
as
begin

select * from SUCURSAL where Nombre = @Nombre
end

go

create procedure sucursal_listar
as
begin

select * from SUCURSAL
end


go

go

create procedure sucursal_eliminar(
@Nombre varchar(20)
)
as
begin

delete from SUCURSAL where Nombre = @Nombre

end

go

