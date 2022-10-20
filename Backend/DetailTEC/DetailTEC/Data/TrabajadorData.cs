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

                SqlCommand cmd = new SqlCommand("insert into " +
                    "TRABAJADOR(Cedula,Nombre,Apellido1,Apellido2,Fecha_nacimiento,Fecha_ingreso,Edad,PasswordT,Rol,Tipo_pago)" +
                    "values(" + trabajador.id +"," +trabajador.nombre+ "," + trabajador.apellido1+ "," + trabajador.apellido2+ "," +
                    trabajador.email+","+trabajador.fechaNacimiento +"," +trabajador.fechaInicio+","+edad+ "," + trabajador.password+
                    "," + trabajador.puesto+ "," + trabajador.frecuenciaPago+")", oConexion);

                try
                {
                    oConexion.Open();
                    cmd.ExecuteNonQuery();
                    return true;
                }
                catch (Exception ex)
                {
                    return false;
                }
            }
        }

        public static bool Modificar(Trabajador trabajador)
        {
            using (SqlConnection oConexion = new SqlConnection(Conexion.rutaConexion))
            {
                int edad = DateTime.Today.AddTicks(-trabajador.fechaNacimiento.Ticks).Year - 1;
                SqlCommand cmd = new SqlCommand("insert into " +
                    "TRABAJADOR(Cedula,Nombre,Apellido1,Apellido2,Fecha_nacimiento,Fecha_ingreso,Edad,PasswordT,Rol,Tipo_pago)" +
                    "values(" + trabajador.id + "," + trabajador.nombre + "," + trabajador.apellido1 + "," + trabajador.apellido2 + "," +
                    trabajador.email + "," + trabajador.fechaNacimiento + "," + trabajador.fechaInicio + "," + edad + "," + trabajador.password +
                    "," + trabajador.puesto + "," + trabajador.frecuenciaPago + ")", oConexion);

                try
                {
                    oConexion.Open();
                    cmd.ExecuteNonQuery();
                    return true;
                }
                catch (Exception ex)
                {
                    return false;
                }
            }
        }

        public static List<TrabajadorForGet> Listar()
        {
            List<TrabajadorForGet> oListaUsuario = new List<TrabajadorForGet>();
            using (SqlConnection oConexion = new SqlConnection(Conexion.rutaConexion))
            {

                SqlCommand cmd = new SqlCommand("select Cedula,Nombre,Apellido1, Apellido2, Email, Fecha_nacimiento, Fecha_ingreso, Edad, Rol, Tipo_pago from TRABAJADOR", oConexion);
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
                                nombre = dr["Nombre"].ToString(),
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
                SqlCommand cmd = new SqlCommand("select Cedula,Nombre,Apellido1, Apellido2, Email, Fecha_nacimiento, Fecha_ingreso, Edad, Rol, " +
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
                                nombre = dr["Nombre"].ToString(),
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
                SqlCommand cmd = new SqlCommand("delete from TRABAJADOR where Cedula = "+cedula, oConexion);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Cedula", cedula);

                try
                {
                    oConexion.Open();
                    cmd.ExecuteNonQuery();
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
