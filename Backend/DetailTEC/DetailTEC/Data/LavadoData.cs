using DetailTEC.Models;
using System.Data.SqlClient;
using System.Data;

namespace DetailTEC.Data
{
    public class LavadoData
    {
        public static bool Registrar(Lavado lavado)
        {
            using (SqlConnection oConexion = new SqlConnection(Conexion.rutaConexion))
            {
                SqlCommand cmd = new SqlCommand("lavado_registrar", oConexion);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Nombre", lavado.nombre);
                cmd.Parameters.AddWithValue("@Costo", lavado.costo);
                cmd.Parameters.AddWithValue("@Precio", lavado.precio);
                cmd.Parameters.AddWithValue("@Duracion", lavado.duracion);

                try
                {
                    oConexion.Open();
                    cmd.ExecuteNonQuery();
                    return true;
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message);
                    return false;
                }
            }
        }

        public static bool Modificar(Lavado lavado)
        {
            using (SqlConnection oConexion = new SqlConnection(Conexion.rutaConexion))
            {
                SqlCommand cmd = new SqlCommand("lavado_modificar", oConexion);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Nombre", lavado.nombre);
                cmd.Parameters.AddWithValue("@Costo", lavado.costo);
                cmd.Parameters.AddWithValue("@Precio", lavado.precio);
                cmd.Parameters.AddWithValue("@Duracion", lavado.duracion);


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

        public static List<Lavado> Listar()
        {
            List<Lavado> oListaUsuario = new List<Lavado>();
            using (SqlConnection oConexion = new SqlConnection(Conexion.rutaConexion))
            {
                SqlCommand cmd = new SqlCommand("lavado_listar", oConexion);
                cmd.CommandType = CommandType.StoredProcedure;

                try
                {
                    oConexion.Open();
                    cmd.ExecuteNonQuery();

                    using (SqlDataReader dr = cmd.ExecuteReader())
                    {

                        while (dr.Read())
                        {
                            oListaUsuario.Add(new Lavado()
                            {
                                nombre = dr["Nombre"].ToString(),
                                costo = Convert.ToInt32(dr["Costo"]),
                                precio = Convert.ToInt32(dr["Precio"]),
                                duracion = Convert.ToInt32(dr["Duracion"])
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

        public static Lavado Obtener(string nombre)
        {
            Lavado lavado = new Lavado();
            using (SqlConnection oConexion = new SqlConnection(Conexion.rutaConexion))
            {
                SqlCommand cmd = new SqlCommand("lavado_obtener", oConexion);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Nombre", nombre);

                try
                {
                    oConexion.Open();
                    cmd.ExecuteNonQuery();

                    using (SqlDataReader dr = cmd.ExecuteReader())
                    {

                        while (dr.Read())
                        {
                            lavado = new Lavado()
                            {
                                nombre = dr["Nombre"].ToString(),
                                costo = Convert.ToInt32(dr["Costo"]),
                                precio = Convert.ToInt32(dr["Precio"]),
                                duracion = Convert.ToInt32(dr["Duracion"])
                            };
                        }

                    }



                    return lavado;
                }
                catch (Exception ex)
                {
                    return lavado;
                }
            }
        }

        public static bool Eliminar(string nombre)
        {
            using (SqlConnection oConexion = new SqlConnection(Conexion.rutaConexion))
            {
                SqlCommand cmd = new SqlCommand("lavado_eliminar", oConexion);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Nombre", nombre);

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
