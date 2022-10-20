using DetailTEC.Models;
using System.Data.SqlClient;
using System.Data;

namespace DetailTEC.Data
{
    public class SucursalData
    {
        public static bool Registrar(Sucursal sucursal)
        {
            using (SqlConnection oConexion = new SqlConnection(Conexion.rutaConexion))
            {
                SqlCommand cmd = new SqlCommand("insert into " +
                    "SUCURSAL(Nombre,Provincia, Canton, Distrito, Telefono," +
                    "Fecha_apertura, Fecha_gerente, Cedula_gerente)" +
                    "values(" + sucursal.nombre + sucursal.provincia + sucursal.canton + sucursal.distrito +
                    sucursal.telefono + sucursal.fechaApertura + sucursal.fechaGerente +
                    sucursal.cedulaGerente + ")", oConexion);
       
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

        public static bool Modificar(Sucursal sucursal)
        {
            using (SqlConnection oConexion = new SqlConnection(Conexion.rutaConexion))
            {
                SqlCommand cmd = new SqlCommand("iupdate SUCURSAL set "
                    + ",Provincia =" + sucursal.provincia + ", Canton =" + sucursal.canton +
                    ", Telefono =" + sucursal.telefono + ", Fecha_apertura =" + sucursal.fechaApertura +
                    ", Fecha_gerente =" + sucursal.fechaGerente + 
                    ", Cedula_gerente =" + sucursal.cedulaGerente, oConexion);
                /*
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Nombre", sucursal.nombre);
                cmd.Parameters.AddWithValue("@Provincia", sucursal.provincia);
                cmd.Parameters.AddWithValue("@Canton", sucursal.canton);
                cmd.Parameters.AddWithValue("@Distrito", sucursal.distrito);
                cmd.Parameters.AddWithValue("@Telefono", sucursal.telefono);
                cmd.Parameters.AddWithValue("@Fecha_apertura", sucursal.fechaApertura);
                cmd.Parameters.AddWithValue("@Fecha_gerente", sucursal.fechaGerente);
                cmd.Parameters.AddWithValue("@Cedula_gerente", sucursal.cedulaGerente);

                */

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

        public static List<Sucursal> Listar()
        {
            List<Sucursal> oListaUsuario = new List<Sucursal>();
            using (SqlConnection oConexion = new SqlConnection(Conexion.rutaConexion))
            {
                //SqlCommand cmd = new SqlCommand("sucursal_listar", oConexion);
                //cmd.CommandType = CommandType.StoredProcedure;

                SqlCommand cmd = new SqlCommand("select * from SUCURSAL", oConexion);

                try
                {
                    oConexion.Open();
                    cmd.ExecuteNonQuery();

                    using (SqlDataReader dr = cmd.ExecuteReader())
                    {

                        while (dr.Read())
                        {
                            oListaUsuario.Add(new Sucursal()
                            {
                                nombre = dr["Nombre"].ToString(),
                                provincia = dr["Provincia"].ToString(),
                                canton = dr["Canton"].ToString(),
                                distrito = dr["Distrito"].ToString(),
                                fechaApertura = Convert.ToDateTime(dr["Fecha_apertura"].ToString()),
                                fechaGerente = Convert.ToDateTime(dr["Fecha_gerente"].ToString()),
                                cedulaGerente = dr["Cedula_gerente"].ToString()
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

        public static Sucursal Obtener(string nombre)
        {
            Sucursal sucursal = new Sucursal();
            using (SqlConnection oConexion = new SqlConnection(Conexion.rutaConexion))
            {
                //SqlCommand cmd = new SqlCommand("sucursal_obtener", oConexion);
                //cmd.CommandType = CommandType.StoredProcedure;
                //cmd.Parameters.AddWithValue("@Nombre", nombre);
                SqlCommand cmd = new SqlCommand("select * from TRABAJADOR where Nombre = " + nombre, oConexion);

                try
                {
                    oConexion.Open();
                    cmd.ExecuteNonQuery();

                    using (SqlDataReader dr = cmd.ExecuteReader())
                    {

                        while (dr.Read())
                        {
                            sucursal = new Sucursal()
                            {
                                nombre = dr["Nombre"].ToString(),
                                provincia = dr["Provincia"].ToString(),
                                canton = dr["Canton"].ToString(),
                                distrito = dr["Distrito"].ToString(),
                                fechaApertura = Convert.ToDateTime(dr["Fecha_apertura"].ToString()),
                                fechaGerente = Convert.ToDateTime(dr["Fecha_gerente"].ToString()),
                                cedulaGerente = dr["Cedula_gerente"].ToString()
                            };
                        }

                    }



                    return sucursal;
                }
                catch (Exception ex)
                {
                    return sucursal;
                }
            }
        }

        public static bool Eliminar(string nombre)
        {
            using (SqlConnection oConexion = new SqlConnection(Conexion.rutaConexion))
            {
                SqlCommand cmd = new SqlCommand("delete from SUCURSAL where Nombre = " + nombre, oConexion);
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
