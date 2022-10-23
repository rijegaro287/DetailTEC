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
                    " values(@param1, @param2, @param3, @param4)", oConexion);
                cmd1.Parameters.Add("@param1", SqlDbType.Char, 10).Value = proveedor.id;
                cmd1.Parameters.Add("@param2", SqlDbType.VarChar, 20).Value = proveedor.nombre;
                cmd1.Parameters.Add("@param3", SqlDbType.VarChar, 100).Value = proveedor.direccion;
                cmd1.Parameters.Add("@param4", SqlDbType.VarChar, 50).Value = proveedor.email;
                cmd1.CommandType = CommandType.Text;


                try
                {
                    oConexion.Open();
                    cmd1.ExecuteNonQuery();

                    SqlCommand cmd2 = null;
                    if (proveedor.telefonos != null)
                    {
                        for (int i = 0; i < (proveedor.telefonos.Count); i++)
                        {
                            cmd2 = new SqlCommand("insert into CONTACTO_PROVEEDOR(Ced_prov, Telefono) values(@param1, @param2)", oConexion);
                            cmd2.Parameters.Add("@param2", SqlDbType.Char, 8).Value = proveedor.telefonos[i];
                            cmd2.Parameters.Add("@param1", SqlDbType.Char, 10).Value = proveedor.id;
                            cmd2.CommandType = CommandType.Text;
                            cmd2.ExecuteNonQuery();
                        }
                    }


                    return true;
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex);
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
                    "Cedula_juridica = @param1,Nombre =@param2,Direccion=@param3," +
                    "Correo_electronico=@param4)", oConexion);
                cmd1.Parameters.Add("@param1", SqlDbType.Char, 9).Value = proveedor.id;
                cmd1.Parameters.Add("@param2", SqlDbType.VarChar, 20).Value = proveedor.nombre;
                cmd1.Parameters.Add("@param3", SqlDbType.VarChar, 100).Value = proveedor.direccion;
                cmd1.Parameters.Add("@param4", SqlDbType.VarChar, 50).Value = proveedor.email;
                cmd1.CommandType = CommandType.Text;

                try
                {
                    oConexion.Open();
                    cmd1.ExecuteNonQuery();
                    SqlCommand cmd2 = null;
                    if (proveedor.telefonos != null)
                    {
                        for (int i = 0; i < (proveedor.telefonos.Count - 1); i++)
                        {
                            cmd2 = new SqlCommand("update CONTACTO_PROVEEDOR set Cedula_juridica=@param1, Telefono=@param2)", oConexion);
                            cmd1.Parameters.Add("@param2", SqlDbType.Char, 8).Value = proveedor.telefonos[i];
                            cmd1.Parameters.Add("@param1", SqlDbType.Char, 8).Value = proveedor.id;
                            cmd2.CommandType = CommandType.Text;
                            cmd2.ExecuteNonQuery();
                        }
                    }
                   
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

                    List<string> telefonosList = new List<string>();
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

                        

                    }


                    Console.WriteLine(oListaUsuario);
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
                            if (firstRead)
                            {
                            proveedor = new Proveedor()
                            {

                                id = dr["Cedula_juridica"].ToString(),
                                nombre = dr["Nombre"].ToString(),
                                direccion = dr["Direccion"].ToString(),
                                email = dr["Correo_electronico"].ToString()

                            };

                            telefonosList.Add(dr["Telefono"].ToString());
                            firstRead = false;
                            }
                            else
                            {
                                telefonosList.Add(dr["Telefono"].ToString());

                            }
                        }

                    }

                    proveedor.telefonos = telefonosList;

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
                SqlCommand cmd1 = new SqlCommand("delete from CONTACTO_PROVEEDOR where Ced_prov = " + cedula, oConexion);
                SqlCommand cmd2= new SqlCommand("delete from PROVEEDOR where Cedula_juridica = " + cedula, oConexion);
                //cmd.CommandType = CommandType.StoredProcedure;
                //cmd.Parameters.AddWithValue("@Cedula", cedula);

                try
                {
                    oConexion.Open();
                    cmd1.ExecuteNonQuery();
                    cmd2.ExecuteNonQuery();
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