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
                SqlCommand cmd = new SqlCommand("insert into " + "LAVADO(Nombre, Costo, Precio, Duracion)"
                    + "values("+ lavado.nombre + lavado.costo + 
                    lavado.precio + lavado.duracion+")", oConexion);

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
                SqlCommand cmd = new SqlCommand("update LAVADO set " +
                    "Nombre" + lavado.nombre + "Costo" + lavado.costo + "Precio"
                    + lavado.precio + "Duracion" + lavado.duracion
                    , oConexion);

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
                //SqlCommand cmd = new SqlCommand("lavado_listar", oConexion);
                //cmd.CommandType = CommandType.StoredProcedure;

                SqlCommand cmd = new SqlCommand("select * from LAVADO", oConexion);

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
                SqlCommand cmd = new SqlCommand("select * from LAVADO where Nombre = " + nombre, oConexion);

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
                SqlCommand cmd = new SqlCommand("delete from LAVADO where Nombre = " + nombre, oConexion);
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
