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
                SqlCommand cmd = new SqlCommand("trabajador_registrar", oConexion);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Cedula", trabajador.cedula);
                cmd.Parameters.AddWithValue("@Nombre", trabajador.nombre);
                cmd.Parameters.AddWithValue("@Apellido1", trabajador.apellido1);
                cmd.Parameters.AddWithValue("@Apellido2", trabajador.apellido2);
                cmd.Parameters.AddWithValue("@Fecha_nacimiento", trabajador.fechaNacimiento);
                cmd.Parameters.AddWithValue("@Fecha_ingreso", trabajador.fechaIngreso);
                cmd.Parameters.AddWithValue("@Edad", trabajador.edad);
                cmd.Parameters.AddWithValue("@PasswordT", trabajador.password);
                cmd.Parameters.AddWithValue("@Rol", trabajador.rol);
                cmd.Parameters.AddWithValue("@Tipo_pago", trabajador.tipoPago);

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
                SqlCommand cmd = new SqlCommand("trabajador_modificar", oConexion);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Cedula", trabajador.cedula);
                cmd.Parameters.AddWithValue("@Nombre", trabajador.nombre);
                cmd.Parameters.AddWithValue("@Apellido1", trabajador.apellido1);
                cmd.Parameters.AddWithValue("@Apellido2", trabajador.apellido2);
                cmd.Parameters.AddWithValue("@Fecha_nacimiento", trabajador.fechaNacimiento);
                cmd.Parameters.AddWithValue("@Fecha_ingreso", trabajador.fechaIngreso);
                cmd.Parameters.AddWithValue("@Edad", trabajador.edad);
                cmd.Parameters.AddWithValue("@PasswordT", trabajador.password);
                cmd.Parameters.AddWithValue("@Rol", trabajador.rol);
                cmd.Parameters.AddWithValue("@Tipo_pago", trabajador.tipoPago);

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

        public static List<Trabajador> Listar()
        {
            List<Trabajador> oListaUsuario = new List<Trabajador>();
            using (SqlConnection oConexion = new SqlConnection(Conexion.rutaConexion))
            {
                SqlCommand cmd = new SqlCommand("trabajador_listar", oConexion);
                cmd.CommandType = CommandType.StoredProcedure;

                try
                {
                    oConexion.Open();
                    cmd.ExecuteNonQuery();

                    using (SqlDataReader dr = cmd.ExecuteReader())
                    {

                        while (dr.Read())
                        {
                            oListaUsuario.Add(new Trabajador()
                            {
                                cedula = dr["Cedula"].ToString(),
                                nombre = dr["Nombre"].ToString(),
                                apellido1 = dr["Apellido1"].ToString(),
                                apellido2 = dr["Apellido2"].ToString(),
                                fechaIngreso = Convert.ToDateTime(dr["Fecha_nacimiento"].ToString()),
                                fechaNacimiento = Convert.ToDateTime(dr["Fecha_ingreso"].ToString()),
                                edad = Convert.ToInt32(dr["Edad"]),
                                password = dr["PasswordT"].ToString(),
                                rol = dr["Rol"].ToString(),
                                tipoPago = dr["Tipo_pago"].ToString()
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

        public static Trabajador Obtener(string cedula)
        {
            Trabajador trabajador = new Trabajador();
            using (SqlConnection oConexion = new SqlConnection(Conexion.rutaConexion))
            {
                SqlCommand cmd = new SqlCommand("trabajador_obtener", oConexion);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@cedula", cedula);

                try
                {
                    oConexion.Open();
                    cmd.ExecuteNonQuery();

                    using (SqlDataReader dr = cmd.ExecuteReader())
                    {

                        while (dr.Read())
                        {
                            trabajador = new Trabajador()
                            {
                                cedula = dr["Cedula"].ToString(),
                                nombre = dr["Nombre"].ToString(),
                                apellido1 = dr["Apellido1"].ToString(),
                                apellido2 = dr["Apellido2"].ToString(),
                                fechaIngreso = Convert.ToDateTime(dr["Fecha_nacimiento"].ToString()),
                                fechaNacimiento = Convert.ToDateTime(dr["Fecha_ingreso"].ToString()),
                                edad = Convert.ToInt32(dr["Edad"]),
                                password = dr["PasswordT"].ToString(),
                                rol = dr["Rol"].ToString(),
                                tipoPago = dr["Tipo_pago"].ToString()
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
                SqlCommand cmd = new SqlCommand("trabajador_eliminar", oConexion);
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
