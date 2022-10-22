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
                    "SUCURSAL(ID, Nombre,Provincia, Canton, Distrito, Telefono," +
                    "Fecha_apertura, Fecha_gerente, Cedula_gerente) " +
                    "values(@param1, @param2, @param3, @param4, @param5, @param6, @param7, @param8, @param9)", oConexion);
                cmd.Parameters.Add("@param1", SqlDbType.Int).Value = sucursal.id;
                cmd.Parameters.Add("@param2", SqlDbType.VarChar, 40).Value = sucursal.nombre;
                cmd.Parameters.Add("@param3", SqlDbType.VarChar, 20).Value = sucursal.provincia;
                cmd.Parameters.Add("@param4", SqlDbType.VarChar, 20).Value = sucursal.canton;
                cmd.Parameters.Add("@param5", SqlDbType.VarChar, 20).Value = sucursal.distrito;
                cmd.Parameters.Add("@param6", SqlDbType.Char, 8).Value = sucursal.telefono;
                cmd.Parameters.Add("@param7", SqlDbType.Char, 9).Value = sucursal.idGerente;
                cmd.Parameters.Add("@param8", SqlDbType.Date).Value = sucursal.fechaApertura;
                cmd.Parameters.Add("@param9", SqlDbType.Date).Value = sucursal.fechaInicioGerente;
                cmd.CommandType = CommandType.Text;
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
                SqlCommand cmd = new SqlCommand("update SUCURSAL set Nombre ="+sucursal.nombre
                    + ",Provincia =" + sucursal.provincia + ", Canton =" + sucursal.canton +
                    ",Distrito = "+sucursal.distrito+
                    ", Telefono =" + sucursal.telefono +",Cedula_Gerente="+ sucursal.idGerente
                    +", Fecha_apertura =" + sucursal.fechaApertura +
                    ", Fecha_gerente =" + sucursal.fechaInicioGerente+"where Nombre = "+sucursal.nombre, oConexion);

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
                    "S.Fecha_apertura, S.Fecha_gerente from SUCURSAL as S, TRABJADOR AS T Where T.Cedula = S.Cedula_Gerente AND S.Nombre ="+nombre, oConexion);

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
