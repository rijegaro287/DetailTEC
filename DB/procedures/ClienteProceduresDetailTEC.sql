go

use DetailTEC

go

--***************  VERIFICACION DE EXISTENCIA DE PROCEDIMIENTOS PARA CLIENTE **************--

IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'cliente_registrar')
DROP PROCEDURE cliente_registrar

go

IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'cliente_modificar')
DROP PROCEDURE cliente_modificar

go

IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'cliente_obtener')
DROP PROCEDURE cliente_obtener

go

IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'cliente_listar')
DROP PROCEDURE cliente_listar

go

IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'cliente_eliminar')
DROP PROCEDURE cliente_eliminar

go


--************* CREACION DE PROCEDIMIENTOS PARA CLIENTE ***************--
create procedure cliente_registrar(
@Cedula char(9),
@Nombre varchar(20),
@Apellido1 varchar(20),
@Apellido2 varchar(20),
@Usuario varchar(20),
@Correo varchar(50),
@PasswordC varchar(20),
@Puntos int
)

as
begin

insert into CLIENTE(Cedula, Nombre, Apellido1, Apellido2, Usuario, Correo, PasswordC, Puntos)
values
(
@Cedula,
@Nombre,
@Apellido1,
@Apellido2,
@Usuario,
@Correo,
@PasswordC,
@Puntos
)

end


go

create procedure cliente_modificar(
@Cedula char(9),
@Nombre varchar(20),
@Apellido1 varchar(20),
@Apellido2 varchar(20),
@Usuario varchar(20),
@Correo varchar(50),
@PasswordC varchar(20),
@Puntos int
)
as
begin

update CLIENTE set 
Nombre = @Nombre,
Apellido1 = @Apellido1,
Apellido2 = @Apellido2,
Usuario = @Usuario,
Correo = @Correo,
PasswordC = @PasswordC,
Puntos = @Puntos
where Cedula = @Cedula

end

go

create procedure cliente_obtener(@Cedula char(9))
as
begin

select * from CLIENTE where Cedula = @Cedula
end

go

create procedure cliente_listar
as
begin

select * from CLIENTE
end


go

go

create procedure cliente_eliminar(
@Cedula char(9)
)
as
begin

delete from CLIENTE where Cedula = @Cedula

end

go

