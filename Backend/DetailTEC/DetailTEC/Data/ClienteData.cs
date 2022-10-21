using DetailTEC.Models;
using System.Data.SqlClient;
using System.Data;

namespace DetailTEC.Data
{
    public class ClienteData
    {
        public static bool Registrar(Cliente cliente)
        {
            using (SqlConnection oConexion = new SqlConnection(Conexion.rutaConexion))
            {
                SqlCommand cmd = new SqlCommand("cliente_registrar", oConexion);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Cedula", cliente.cedula);
                cmd.Parameters.AddWithValue("@Nombre", cliente.nombre);
                cmd.Parameters.AddWithValue("@Apellido1", cliente.apellido1);
                cmd.Parameters.AddWithValue("@Apellido2", cliente.apellido2);
                cmd.Parameters.AddWithValue("@Usuario", cliente.usuario);
                cmd.Parameters.AddWithValue("@Correo", cliente.correo);
                cmd.Parameters.AddWithValue("@PasswordC", cliente.password);
                cmd.Parameters.AddWithValue("@Puntos", cliente.puntos);
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

        public static bool Modificar(Cliente cliente)
        {
            using (SqlConnection oConexion = new SqlConnection(Conexion.rutaConexion))
            {
                SqlCommand cmd = new SqlCommand("cliente_modificar", oConexion);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Cedula", cliente.cedula);
                cmd.Parameters.AddWithValue("@Nombre", cliente.nombre);
                cmd.Parameters.AddWithValue("@Apellido1", cliente.apellido1);
                cmd.Parameters.AddWithValue("@Apellido2", cliente.apellido2);
                cmd.Parameters.AddWithValue("@Usuario", cliente.usuario);
                cmd.Parameters.AddWithValue("@Correo", cliente.correo);
                cmd.Parameters.AddWithValue("@PasswordC", cliente.password);
                cmd.Parameters.AddWithValue("@Puntos", cliente.puntos);

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

        public static List<Cliente> Listar()
        {
            List<Cliente> oListaUsuario = new List<Cliente>();
            using (SqlConnection oConexion = new SqlConnection(Conexion.rutaConexion))
            {
                SqlCommand cmd = new SqlCommand("cliente_listar", oConexion);
                cmd.CommandType = CommandType.StoredProcedure;

                try
                {
                    oConexion.Open();
                    cmd.ExecuteNonQuery();

                    using (SqlDataReader dr = cmd.ExecuteReader())
                    {

                        while (dr.Read())
                        {
                            oListaUsuario.Add(new Cliente()
                            {
                                cedula = dr["Cedula"].ToString(),
                                nombre = dr["Nombre"].ToString(),
                                apellido1 = dr["Apellido1"].ToString(),
                                apellido2 = dr["Apellido2"].ToString(),
                                usuario = dr["Usuario"].ToString(),
                                correo = dr["Correo"].ToString(),
                                password = dr["PasswordC"].ToString(),
                                puntos = Convert.ToInt32(dr["Puntos"])
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

        public static Cliente Obtener(string cedula)
        {
            Cliente cliente = new Cliente();
            using (SqlConnection oConexion = new SqlConnection(Conexion.rutaConexion))
            {
                SqlCommand cmd = new SqlCommand("cliente_obtener", oConexion);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Cedula", cedula);

                try
                {
                    oConexion.Open();
                    cmd.ExecuteNonQuery();

                    using (SqlDataReader dr = cmd.ExecuteReader())
                    {

                        while (dr.Read())
                        {
                            cliente = new Cliente()
                            {
                                cedula = dr["Cedula"].ToString(),
                                nombre = dr["Nombre"].ToString(),
                                apellido1 = dr["Apellido1"].ToString(),
                                apellido2 = dr["Apellido2"].ToString(),
                                usuario = dr["Usuario"].ToString(),
                                correo = dr["Correo"].ToString(),
                                password = dr["PasswordC"].ToString(),
                                puntos = Convert.ToInt32(dr["Puntos"])
                            };
                        }

                    }



                    return cliente;
                }
                catch (Exception ex)
                {
                    return cliente;
                }
            }
        }

        public static bool Eliminar(string cedula)
        {
            using (SqlConnection oConexion = new SqlConnection(Conexion.rutaConexion))
            {
                SqlCommand cmd = new SqlCommand("cliente_eliminar", oConexion);
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
