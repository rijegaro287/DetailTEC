go

use DetailTEC

go

--***************  VERIFICACION DE EXISTENCIA DE PROCEDIMIENTOS PARA LAVADO **************--

IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'lavado_registrar')
DROP PROCEDURE lavado_registrar

go

IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'lavado_modificar')
DROP PROCEDURE lavado_modificar

go

IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'lavado_obtener')
DROP PROCEDURE lavado_obtener

go

IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'lavado_listar')
DROP PROCEDURE lavado_listar

go

IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'lavado_eliminar')
DROP PROCEDURE lavado_eliminar

go


--************* CREACION DE PROCEDIMIENTOS PARA LAVADO ***************--
create procedure lavado_registrar(
@Nombre varchar(20),
@Costo int, 
@Precio int, 
@Duracion int
)

as
begin

insert into LAVADO(Nombre, Costo, Precio, Duracion)
values
(
@Nombre,
@Costo, 
@Precio, 
@Duracion
)

end


go

create procedure lavado_modificar(
@Nombre varchar(20),
@Costo int, 
@Precio int, 
@Duracion int
)
as
begin

update LAVADO set 
Costo = @Costo, 
Precio = @Precio, 
Duracion = @Duracion
where Nombre = @Nombre

end

go

create procedure lavado_obtener(@Nombre varchar(20))
as
begin

select * from LAVADO where Nombre = @Nombre
end

go

create procedure lavado_listar
as
begin

select * from LAVADO
end


go

go

create procedure lavado_eliminar(
@Nombre varchar(20)
)
as
begin

delete from LAVADO where Nombre = @Nombre

end

go

