using System.Data;
using System.Data.SqlClient;
using DetailTEC.Models;

namespace DetailTEC.Data
{
    public class TrabajadorData
    {
        public static bool Registrar(Trabajador trabajador)
        {
            using (SqlConnection oConexion = new SqlConnection(Conexion.rutaConexion))
            {
                int edad = DateTime.Today.AddTicks(-trabajador.fechaNacimiento.Ticks).Year - 1;

                Console.WriteLine("insert into " +
                    "TRABAJADOR(Cedula,NombreT,Apellido1,Apellido2,Email,Fecha_nacimiento,Fecha_ingreso,Edad,PasswordT,Rol,Tipo_pago)" +
                    " values(" + trabajador.id + ", " + trabajador.nombre + ", " + trabajador.apellido1 + ", " + trabajador.apellido2 + ", " + trabajador.email +
                    ", " + trabajador.fechaNacimiento.Date + ", " + trabajador.fechaInicio.Date + ", " + edad + ", " + trabajador.password +
                    ", " + trabajador.puesto + ", " + trabajador.frecuenciaPago + ")");


                SqlCommand cmd = new SqlCommand("insert into " +
                    "TRABAJADOR(Cedula,NombreT,Apellido1,Apellido2,Fecha_nacimiento,Fecha_ingreso,Email,Edad,PasswordT,Rol,Tipo_pago)" +
                    " values(@param1, @param2, @param3, @param4, @param5, @param6, @param7, @param8, @param9, @param10, @param11)", oConexion);
                cmd.Parameters.Add("@param1", SqlDbType.Char, 9).Value = trabajador.id;
                cmd.Parameters.Add("@param2", SqlDbType.VarChar, 20).Value = trabajador.nombre;
                cmd.Parameters.Add("@param3", SqlDbType.VarChar, 20).Value = trabajador.apellido1;
                cmd.Parameters.Add("@param4", SqlDbType.VarChar, 20).Value = trabajador.apellido2;
                cmd.Parameters.Add("@param5", SqlDbType.Date).Value = trabajador.fechaNacimiento;
                cmd.Parameters.Add("@param6", SqlDbType.Date).Value = trabajador.fechaInicio;
                cmd.Parameters.Add("@param7", SqlDbType.VarChar, 50).Value = trabajador.email;
                cmd.Parameters.Add("@param8", SqlDbType.TinyInt).Value = edad;
                cmd.Parameters.Add("@param9", SqlDbType.VarChar, 20).Value = trabajador.password;
                cmd.Parameters.Add("@param10", SqlDbType.VarChar, 20).Value = trabajador.puesto;
                cmd.Parameters.Add("@param11", SqlDbType.VarChar, 10).Value = trabajador.frecuenciaPago;
                cmd.CommandType = CommandType.Text;
                try
                {
                    oConexion.Open();
                    cmd.ExecuteNonQuery();
                    return true;
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.ToString());
                    return false;
                }
            }
        }

        public static bool Modificar(Trabajador trabajador)
        {
            using (SqlConnection oConexion = new SqlConnection(Conexion.rutaConexion))
            {
                int edad = DateTime.Today.AddTicks(-trabajador.fechaNacimiento.Ticks).Year - 1;
                SqlCommand cmd = new SqlCommand("update TRABAJADOR set " +
                    "Cedula = @param1,NombreT = @param2,Apellido1=@param3,Apellido2=@param4,Email=@param5,Fecha_nacimiento=@param6,Fecha_ingreso=@param7"+
                    ",Edad=@param8,PasswordT=@param9,Rol=@param10,Tipo_pago=@param11 where Cedula = @param12", oConexion);
                cmd.Parameters.Add("@param1", SqlDbType.Char, 9).Value = trabajador.id;
                cmd.Parameters.Add("@param2", SqlDbType.VarChar, 20).Value = trabajador.nombre;
                cmd.Parameters.Add("@param3", SqlDbType.VarChar, 20).Value = trabajador.apellido1;
                cmd.Parameters.Add("@param4", SqlDbType.VarChar, 20).Value = trabajador.apellido2;
                cmd.Parameters.Add("@param5", SqlDbType.VarChar, 50).Value = trabajador.email;
                cmd.Parameters.Add("@param6", SqlDbType.Date).Value = trabajador.fechaNacimiento;
                cmd.Parameters.Add("@param7", SqlDbType.Date).Value = trabajador.fechaInicio;
                cmd.Parameters.Add("@param8", SqlDbType.TinyInt).Value = edad;
                cmd.Parameters.Add("@param9", SqlDbType.VarChar, 20).Value = trabajador.password;
                cmd.Parameters.Add("@param10", SqlDbType.VarChar, 20).Value = trabajador.puesto;
                cmd.Parameters.Add("@param11", SqlDbType.VarChar, 10).Value = trabajador.frecuenciaPago;
                cmd.Parameters.Add("@param12", SqlDbType.Char, 9).Value = trabajador.id;
                cmd.CommandType = CommandType.Text;
                try
                {
                    oConexion.Open();
                    cmd.ExecuteNonQuery();
                    return true;
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex);
                    return false;
                }
            }
        }

        public static List<TrabajadorForGet> Listar()
        {
            List<TrabajadorForGet> oListaUsuario = new List<TrabajadorForGet>();
            using (SqlConnection oConexion = new SqlConnection(Conexion.rutaConexion))
            {

                SqlCommand cmd = new SqlCommand("select Cedula,NombreT,Apellido1, Apellido2, Email, Fecha_nacimiento, Fecha_ingreso, Edad, Rol, Tipo_pago from TRABAJADOR", oConexion);
                try
                {
                    oConexion.Open();
                    cmd.ExecuteNonQuery();

                    using (SqlDataReader dr = cmd.ExecuteReader())
                    {

                        while (dr.Read())
                        {
                            oListaUsuario.Add(new TrabajadorForGet()
                            {
                                id = dr["Cedula"].ToString(),
                                nombre = dr["NombreT"].ToString(),
                                apellido1 = dr["Apellido1"].ToString(),
                                apellido2 = dr["Apellido2"].ToString(),
                                email = dr["Email"].ToString(),
                                fechaInicio = Convert.ToDateTime(dr["Fecha_nacimiento"].ToString()),
                                fechaNacimiento = Convert.ToDateTime(dr["Fecha_ingreso"].ToString()),
                                edad = Convert.ToInt32(dr["Edad"]),
                                puesto = dr["Rol"].ToString(),
                                frecuenciaPago = dr["Tipo_pago"].ToString()
                            });
                            
                        }

                    }



                    return oListaUsuario;
                }
                catch (Exception ex)
                {
                    return oListaUsuario;
                }
            }
        }

        public static TrabajadorForGet Obtener(string cedula)
        {
            TrabajadorForGet trabajador = new TrabajadorForGet();
            using (SqlConnection oConexion = new SqlConnection(Conexion.rutaConexion))
            {
                SqlCommand cmd = new SqlCommand("select Cedula,NombreT,Apellido1, Apellido2, Email, Fecha_nacimiento, Fecha_ingreso, Edad, Rol, " +
                    "Tipo_pago from TRABAJADOR where Cedula = " + cedula, oConexion);

                try
                {
                    oConexion.Open();
                    cmd.ExecuteNonQuery();

                    using (SqlDataReader dr = cmd.ExecuteReader())
                    {

                        while (dr.Read())
                        {
                            trabajador = new TrabajadorForGet()
                            {
                                id = dr["Cedula"].ToString(),
                                nombre = dr["NombreT"].ToString(),
                                apellido1 = dr["Apellido1"].ToString(),
                                apellido2 = dr["Apellido2"].ToString(),
                                email = dr["Email"].ToString(),
                                fechaInicio = Convert.ToDateTime(dr["Fecha_nacimiento"].ToString()),
                                fechaNacimiento = Convert.ToDateTime(dr["Fecha_ingreso"].ToString()),
                                edad = Convert.ToInt32(dr["Edad"]),
                                puesto = dr["Rol"].ToString(),
                                frecuenciaPago = dr["Tipo_pago"].ToString()
                            };
                        }

                    }



                    return trabajador;
                }
                catch (Exception ex)
                {
                    return trabajador;
                }
            }
        }

        public static bool Eliminar(string cedula)
        {
            using (SqlConnection oConexion = new SqlConnection(Conexion.rutaConexion))
            {
                SqlCommand cmd1 = new SqlCommand("delete from TRABAJADOR where Cedula = " + cedula, oConexion);
                SqlCommand cmd2 = new SqlCommand("delete from TRABAJADORES_POR_CITA where Cedula_trabajador = " + cedula, oConexion);

                try
                {
                    oConexion.Open();
                    cmd1.ExecuteNonQuery();
                    cmd2.ExecuteNonQuery();
                    return true;
                }
                catch (Exception ex)
                {
                    return false;
                }
            }
        }
    }
}
