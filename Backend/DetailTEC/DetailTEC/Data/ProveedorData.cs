using DetailTEC.Models;
using System.Data.SqlClient;
using System.Data;

namespace DetailTEC.Data
{
    public class ProveedorData
    {
        public static bool Registrar(Proveedor proveedor)
        {
            using (SqlConnection oConexion = new SqlConnection(Conexion.rutaConexion))
            {
                SqlCommand cmd1 = new SqlCommand("insert into PROVEEDOR(Cedula_juridica, Nombre, Direccion, Correo_electronico)" +
                    " values(" +
                        proveedor.id + "," + proveedor.nombre + "," +
                         proveedor.direccion + "," + proveedor.email + ")", oConexion);


                try
                {
                    oConexion.Open();
                    cmd1.ExecuteNonQuery();
                    
                    SqlCommand cmd2 = null;
                    for (int i = 0; i < (proveedor.telefonos.Count-1); i++)
                    {
                        cmd2 = new SqlCommand("insert into CONTACTO_PROVEEDOR(Ced_prov, Telefono) values(" +
                            proveedor.id + "," + proveedor.telefonos[i] + ")", oConexion);
                        cmd2.ExecuteNonQuery();
                    }
                    
                    
                    
                    return true;
                }
                catch (Exception ex)
                {
                    return false;
                }
            }
        }

        public static bool Modificar(Proveedor proveedor)
        {
            using (SqlConnection oConexion = new SqlConnection(Conexion.rutaConexion))
            {
                SqlCommand cmd1;
                cmd1 = new SqlCommand("update PROVEEDOR set " +
                    "Cedula_juridica = " + proveedor.id + ",Nombre =" + proveedor.nombre + ",Direccion=" + proveedor.direccion +
                    ",Correo_electronico=" + proveedor.email+ ")", oConexion);

                SqlCommand cmd2 = null;
                for (int i = 0; i < proveedor.telefonos.Count; i++)
                    {
                        cmd2 = new SqlCommand("update CONTACTO_PROVEEDOR set " +
                        "Ced_prov = " + proveedor.id + ",Telefono =" + proveedor.telefonos[i]+")", oConexion);
                    }

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

        public static List<Proveedor> Listar()
        {
            List<Proveedor> oListaUsuario = new List<Proveedor>();
            using (SqlConnection oConexion = new SqlConnection(Conexion.rutaConexion))
            {

                SqlCommand cmd = new SqlCommand("select P.*,C.Telefono from PROVEEDOR as P, CONTACTO_PROVEEDOR as C" +
                    " where P.Cedula_juridica=C.Ced_prov", oConexion);
                try
                {
                    oConexion.Open();
                    cmd.ExecuteNonQuery();
                    bool firstRead = true;
                    string idRef = "";
                    int i = 0;

                    List<string> telefonosList= new List<string>();
                    using (SqlDataReader dr = cmd.ExecuteReader())
                    {

                        while (dr.Read())
                        {
                            if (firstRead || (idRef != dr["Cedula_juridica"].ToString()))
                            {
                                if (!firstRead)
                                {
                                    oListaUsuario[i].telefonos = telefonosList;
                                    i++;
                                    telefonosList = new List<string>();
                                }

                                idRef = dr["Cedula_juridica"].ToString();
                                oListaUsuario.Add(new Proveedor()
                                {

                                    id = dr["Cedula_juridica"].ToString(),
                                    nombre = dr["Nombre"].ToString(),
                                    direccion = dr["Direccion"].ToString(),
                                    email = dr["Correo_electronico"].ToString()

                                });
                                firstRead = false;
                                telefonosList.Add(dr["Telefono"].ToString());

                            }
                            else
                            {
                                telefonosList.Add(dr["Telefono"].ToString());

                            }

                            

                        }
                        oListaUsuario[i].telefonos = telefonosList;

                    }



                    return oListaUsuario;
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message);
                    return oListaUsuario;
                }
            }
        }

        public static Proveedor Obtener(string cedula)
        {
            Proveedor proveedor = new Proveedor();
            using (SqlConnection oConexion = new SqlConnection(Conexion.rutaConexion))
            {
                SqlCommand cmd = new SqlCommand("select P.*,C.Telefono from PROVEEDOR as P, CONTACTO_PROVEEDOR as C" +
                    " where P.Cedula_juridica=C.Ced_prov AND P.Cedula_juridica = " + cedula, oConexion);

                try
                {
                    oConexion.Open();
                    cmd.ExecuteNonQuery();
                    bool firstRead = true;
                    List<string> telefonosList = new List<string>();

                    using (SqlDataReader dr = cmd.ExecuteReader())
                    {

                        while (dr.Read())
                        {
                            //if (firstRead)
                            //{
                                proveedor = new Proveedor()
                                {

                                    id = dr["Cedula_juridica"].ToString(),
                                    nombre = dr["Nombre"].ToString(),
                                    direccion = dr["Direccion"].ToString(),
                                    email = dr["Correo_electronico"].ToString()

                                };
                                telefonosList.Add(dr["Telefono"].ToString());
                                firstRead = false;
                            //}
                            //else
                            //{
                            //    telefonosList.Add(dr["Telefono"].ToString());

                            //}
                        }

                    }

                    //proveedor.telefonos = telefonosList;

                    return proveedor;
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message);
                    return proveedor;
                }
            }
        }

        public static bool Eliminar(string cedula)
        {
            using (SqlConnection oConexion = new SqlConnection(Conexion.rutaConexion))
            {
                SqlCommand cmd = new SqlCommand("delete from PROVEEDOR where Cedula = " + cedula, oConexion);
                //cmd.CommandType = CommandType.StoredProcedure;
                //cmd.Parameters.AddWithValue("@Cedula", cedula);

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
    }
}
