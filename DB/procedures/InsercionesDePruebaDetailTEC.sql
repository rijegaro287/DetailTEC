USE DetailTEC
GO

INSERT [dbo].[TRABAJADOR] ([Cedula], [Nombre], [Apellido1], [Apellido2], [Fecha_nacimiento], [Fecha_ingreso], [Edad], [PasswordT], [Rol], [Tipo_pago]) VALUES (N'118460116', N'Adriana', N'	Calderon', N'Barboza', N'2002-06-06', N'2002-06-06', N'20', N'contrasena01', N'Manager', N'Dolares')
INSERT [dbo].[TRABAJADOR] ([Cedula], [Nombre], [Apellido1], [Apellido2], [Fecha_nacimiento], [Fecha_ingreso], [Edad], [PasswordT], [Rol], [Tipo_pago]) VALUES (N'118460126', N'Yordi', N'Brenes', N'Roda', N'2002-06-06', N'2002-06-06', N'20', N'contrasena01', N'Manager', N'Dolares')
INSERT [dbo].[TRABAJADOR] ([Cedula], [Nombre], [Apellido1], [Apellido2], [Fecha_nacimiento], [Fecha_ingreso], [Edad], [PasswordT], [Rol], [Tipo_pago]) VALUES (N'118420116', N'Ricardo', N'Gatgens', N'Rodriguz', N'2002-06-06', N'2002-06-06', N'20', N'contrasena01', N'Manager', N'Dolares')
INSERT [dbo].[TRABAJADOR] ([Cedula], [Nombre], [Apellido1], [Apellido2], [Fecha_nacimiento], [Fecha_ingreso], [Edad], [PasswordT], [Rol], [Tipo_pago]) VALUES (N'112410116', N'Anthony', N'	Chaves', N'Achoy', N'2002-06-06', N'2002-06-06', N'20', N'contrasena01', N'Manager', N'Dolares')


SELECT * FROM TRABAJADOR