go

use DetailTEC

go

--***************  VERIFICACION DE EXISTENCIA DE PROCEDIMIENTOS PARA TRABAJADOR ****************--

IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'trabajador_registrar')
DROP PROCEDURE trabajador_registrar

go

IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'trabajador_modificar')
DROP PROCEDURE trabajador_modificar

go

IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'trabajador_obtener')
DROP PROCEDURE trabajador_obtener

go

IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'trabajador_listar')
DROP PROCEDURE trabajador_listar

go

IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'trabajador_eliminar')
DROP PROCEDURE trabajador_eliminar

go


--************* CREACION DE PROCEDIMIENTOS PARA TRABAJADOR ***************--
create procedure trabajador_registrar(
@Cedula char(9),
@Nombre varchar(20),
@Apellido1 varchar(20),
@Apellido2 varchar(20),
@Fecha_nacimiento date,
@Fecha_ingreso date,
@Edad tinyint,
@PasswordT varchar(20),
@Rol varchar(20),
@Tipo_pago varchar(10)
)

as
begin

insert into TRABAJADOR(Cedula,Nombre,Apellido1,Apellido2,Fecha_nacimiento,
Fecha_ingreso,Edad,PasswordT,Rol,Tipo_pago)
values
(
@Cedula,
@Nombre,
@Apellido1,
@Apellido2,
@Fecha_nacimiento,
@Fecha_ingreso,
@Edad,
@PasswordT,
@Rol,
@Tipo_pago
)

end


go

create procedure trabajador_modificar(
@Cedula char(9),
@Nombre varchar(20),
@Apellido1 varchar(20),
@Apellido2 varchar(20),
@Fecha_nacimiento date,
@Fecha_ingreso date,
@Edad tinyint,
@PasswordT varchar(20),
@Rol varchar(20),
@Tipo_pago varchar(10)
)
as
begin

update TRABAJADOR set 
Nombre = @Nombre,
Apellido1 = @Apellido1,
Apellido2 = @Apellido2,
Fecha_nacimiento = @Fecha_nacimiento,
Fecha_ingreso = @Fecha_ingreso,
Edad = @Edad,
PasswordT = @PasswordT,
Rol = @Rol,
Tipo_pago = @Tipo_pago
where Cedula = @Cedula

end

go

create procedure trabajador_obtener(@Cedula char(9))
as
begin

select * from TRABAJADOR where Cedula = @Cedula
end

go


create procedure trabajador_listar
as
begin

select * from TRABAJADOR
end


go

go

create procedure trabajador_eliminar(
@Cedula char(9)
)
as
begin

delete from TRABAJADOR where Cedula = @Cedula

end

go

