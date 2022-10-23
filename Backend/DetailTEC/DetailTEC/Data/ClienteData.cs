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
                SqlCommand cmd = new SqlCommand("insert into " +
                  "CLIENTE(Cedula,Nombre,Apellido1,Apellido2,usuario,Correo,PasswordC,Puntos)" +
                  " values(" + cliente.cedula + "," + cliente.nombre + "," + cliente.apellido1 + "," + cliente.apellido2 + "," +
                  cliente.usuario + "," + cliente.correo + "," + cliente.password + "," + cliente.puntos + ","  + ")", oConexion);


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

                SqlCommand cmd = new SqlCommand("update TRABAJADOR set " +
                    "Cedula = " + cliente.cedula +",Nombre =" + cliente.nombre + ",Apellido1 =" + cliente.apellido1 + ",Apellido2 =" + cliente.apellido2 + ",Usuario =" +
                cliente.usuario + ",Correo =" + cliente.correo + ",PasswordC =" + cliente.password + ",Puntos =" + cliente.puntos + ")", oConexion);


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

        public static List<ClienteForGet> Listar()
        {
            List<ClienteForGet> oListaUsuario = new List<ClienteForGet>();
            using (SqlConnection oConexion = new SqlConnection(Conexion.rutaConexion))
            {
                SqlCommand cmd = new SqlCommand("select Cedula,Nombre,Apellido1,Apellido2,usuario,Correo,PasswordC,Puntos from CLIENTE", oConexion);

                try
                {
                    oConexion.Open();
                    cmd.ExecuteNonQuery();

                    using (SqlDataReader dr = cmd.ExecuteReader())
                    {

                        while (dr.Read())
                        {
                            oListaUsuario.Add(new ClienteForGet()
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

        public static ClienteForGet Obtener(string cedula)
        {
            ClienteForGet cliente = new ClienteForGet();
            using (SqlConnection oConexion = new SqlConnection(Conexion.rutaConexion))
            {
                SqlCommand cmd = new SqlCommand("select Cedula,Nombre,Apellido1,Apellido2,usuario,Correo,PasswordC,Puntos, " +
                    "from CLIENTE where Cedula = " + cedula, oConexion);


                try
                {
                    oConexion.Open();
                    cmd.ExecuteNonQuery();

                    using (SqlDataReader dr = cmd.ExecuteReader())
                    {

                        while (dr.Read())
                        {
                            cliente = new ClienteForGet()
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
                SqlCommand cmd = new SqlCommand("delete from CLIENTE where Cedula = " + cedula, oConexion);


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
