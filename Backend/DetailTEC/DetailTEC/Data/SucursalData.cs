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
                    "values(" + sucursal.nombre+ "," + sucursal.provincia +"," + sucursal.canton +","+ sucursal.distrito +","+
                    sucursal.telefono+"," + sucursal.idGerente+"," + sucursal.fechaApertura+"," + sucursal.fechaInicioGerente +")", oConexion);
       
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
                SqlCommand cmd = new SqlCommand("update SUCURSAL set "+"Nombre ="+sucursal.nombre
                    + ",Provincia =" + sucursal.provincia + ", Canton =" + sucursal.canton +
                    ",Distrito = "+sucursal.distrito+
                    ", Telefono =" + sucursal.telefono +",Cedula_Gerente="+ sucursal.idGerente
                    +", Fecha_apertura =" + sucursal.fechaApertura +
                    ", Fecha_gerente =" + sucursal.fechaInicioGerente+"where Nombre = "+sucursal.nombre +")", oConexion);
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

        public static List<SucursalForGet> Listar()
        {
            List<SucursalForGet> oListaUsuario = new List<SucursalForGet>();
            using (SqlConnection oConexion = new SqlConnection(Conexion.rutaConexion))
            {
                //SqlCommand cmd = new SqlCommand("sucursal_listar", oConexion);
                //cmd.CommandType = CommandType.StoredProcedure;

                SqlCommand cmd = new SqlCommand("select S.Nombre, S.Provincia, S.Canton, S.Distrito, S.Telefono," +
                    "S.Cedula_Gerente, T.NombreT, T.Apellido1,"+
                    "S.Fecha_apertura, S.Fecha_gerente from SUCURSAL as S, TRABAJADOR AS T Where T.Cedula = S.Cedula_Gerente", 
                    oConexion);

                try
                {
                    oConexion.Open();
                    cmd.ExecuteNonQuery();

                    using (SqlDataReader dr = cmd.ExecuteReader())
                    {

                        while (dr.Read())
                        {
                            oListaUsuario.Add(new SucursalForGet()
                            {
                                nombre = dr["Nombre"].ToString(),
                                provincia = dr["Provincia"].ToString(),
                                canton = dr["Canton"].ToString(),
                                distrito = dr["Distrito"].ToString(),
                                telefono = dr["Telefono"].ToString(),
                                idGerente = dr["Cedula_gerente"].ToString(),
                                nombreGerente = dr["NombreT"].ToString(),
                                apellidoGerente = dr["Apellido1"].ToString(),
                                fechaApertura = Convert.ToDateTime(dr["Fecha_apertura"].ToString()),
                                fechaInicioGerente = Convert.ToDateTime(dr["Fecha_gerente"].ToString())
                                
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

        public static SucursalForGet Obtener(string nombre)
        {
            SucursalForGet sucursal = new SucursalForGet();
            using (SqlConnection oConexion = new SqlConnection(Conexion.rutaConexion))
            {
                //SqlCommand cmd = new SqlCommand("sucursal_obtener", oConexion);
                //cmd.CommandType = CommandType.StoredProcedure;
                //cmd.Parameters.AddWithValue("@Nombre", nombre);
                SqlCommand cmd = new SqlCommand("select S.Nombre, S.Provincia, S.Canton, S.Distrito, S.Telefono, " +
                    "S.Cedula_Gerente, T.NombreT, T.Apellido1 "+
                    "S.Fecha_apertura, S.Fecha_gerente from SUCURSAL as S, TRABJADOR AS T Where T.Cedula = S.Cedula_Gerente" + nombre +"AND S.Nombre ="+nombre, oConexion);

                try
                {
                    oConexion.Open();
                    cmd.ExecuteNonQuery();

                    using (SqlDataReader dr = cmd.ExecuteReader())
                    {

                        while (dr.Read())
                        {
                            sucursal = new SucursalForGet()
                            {
                                nombre = dr["S.Nombre"].ToString(),
                                provincia = dr["S.Provincia"].ToString(),
                                canton = dr["S.Canton"].ToString(),
                                distrito = dr["S.Distrito"].ToString(),
                                telefono = dr["S.Telefono"].ToString(),
                                idGerente = dr["S.Cedula_gerente"].ToString(),
                                nombreGerente = dr["T.NombreT"].ToString(),
                                apellidoGerente = dr["T.Apellido1"].ToString(),
                                fechaApertura = Convert.ToDateTime(dr["S.Fecha_apertura"].ToString()),
                                fechaInicioGerente = Convert.ToDateTime(dr["S.Fecha_gerente"].ToString())
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
                //cmd.CommandType = CommandType.StoredProcedure;
                //cmd.Parameters.AddWithValue("@Nombre", nombre);

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
