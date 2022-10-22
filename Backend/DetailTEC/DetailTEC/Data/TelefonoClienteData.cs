using System.Data;
using System.Data.SqlClient;
using DetailTEC.Models;

namespace DetailTEC.Data
{
    public class TelefonoClienteData
    {
        public static bool Registrar(TelefonoCliente telefonoCliente)
        {
            using (SqlConnection oConexion = new SqlConnection(Conexion.rutaConexion))
            {
                int edad = DateTime.Today.AddTicks(-telefonoCliente.fechaNacimiento.Ticks).Year - 1;

                SqlCommand cmd = new SqlCommand("insert into " +
                    "TRABAJADOR(Cedula,NombreT,Apellido1,Apellido2,Fecha_nacimiento,Fecha_ingreso,Edad,PasswordT,Rol,Tipo_pago)" +
                    " values(" + telefonoCliente.id +"," +telefonoCliente.nombre+ "," + telefonoCliente.apellido1+ "," + telefonoCliente.apellido2+ "," +
                    telefonoCliente.email+","+telefonoCliente.fechaNacimiento +"," +telefonoCliente.fechaInicio+","+edad+ "," + telefonoCliente.password+
                    "," + telefonoCliente.puesto+ "," + telefonoCliente.frecuenciaPago+")", oConexion);

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

        public static bool Modificar(TelefonoCliente telefonoCliente)
        {
            using (SqlConnection oConexion = new SqlConnection(Conexion.rutaConexion))
            {
                int edad = DateTime.Today.AddTicks(-telefonoCliente.fechaNacimiento.Ticks).Year - 1;
                SqlCommand cmd = new SqlCommand("update TRABAJADOR set " +
                    "Cedula = "+ telefonoCliente.id + ",NombreT =" + telefonoCliente.nombre + ",Apellido1=" + telefonoCliente.apellido1 +
                    ",Apellido2=" + telefonoCliente.apellido2 + ",Email=" +
                    telefonoCliente.email + ",Fecha_nacimiento=" + telefonoCliente.fechaNacimiento 
                    + ",Fecha_ingreso=" + telefonoCliente.fechaInicio + ",Edad=" + edad + ",PasswordT=" + telefonoCliente.password +
                    ",Rol=" + telefonoCliente.puesto + ",Tipo_pago=" + telefonoCliente.frecuenciaPago+
                    "where Cedula = "+telefonoCliente.id + ")", oConexion);

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

        public static List<TelefonoClienteForGet> Listar()
        {
            List<TelefonoClienteForGet> oListaUsuario = new List<TelefonoClienteForGet>();
            using (SqlConnection oConexion = new SqlConnection(Conexion.rutaConexion))
            {

                SqlCommand cmd = new SqlCommand("select Cedula,NombreT,Apellido1, Apellido2, Email, Fecha_nacimiento, Fecha_ingreso, Edad, Rol, Tipo_pago from TRABAJADOR", oConexion);
                try
                {
                    oConexion.Open();
                    cmd.ExecuteNonQuery();

                    using (SqlDataReader dr = cmd.ExecuteReader())
                    {

                        while (dr.Read())
                        {
                            oListaUsuario.Add(new TelefonoClienteForGet()
                            {
                                id = dr["Cedula"].ToString(),
                                nombre = dr["NombreT"].ToString(),
                                apellido1 = dr["Apellido1"].ToString(),
                                apellido2 = dr["Apellido2"].ToString(),
                                email = dr["Email"].ToString(),
                                fechaInicio = Convert.ToDateTime(dr["Fecha_nacimiento"].ToString()),
                                fechaNacimiento = Convert.ToDateTime(dr["Fecha_ingreso"].ToString()),
                                edad = Convert.ToInt32(dr["Edad"]),
                                puesto = dr["Rol"].ToString(),
                                frecuenciaPago = dr["Tipo_pago"].ToString()
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

        public static TelefonoClienteForGet Obtener(string cedula)
        {
            TelefonoClienteForGet telefonoCliente = new TelefonoClienteForGet();
            using (SqlConnection oConexion = new SqlConnection(Conexion.rutaConexion))
            {
                SqlCommand cmd = new SqlCommand("select Cedula,NombreT,Apellido1, Apellido2, Email, Fecha_nacimiento, Fecha_ingreso, Edad, Rol, " +
                    "Tipo_pago from TRABAJADOR where Cedula = " + cedula, oConexion);

                try
                {
                    oConexion.Open();
                    cmd.ExecuteNonQuery();

                    using (SqlDataReader dr = cmd.ExecuteReader())
                    {

                        while (dr.Read())
                        {
                            telefonoCliente = new TelefonoClienteForGet()
                            {
                                id = dr["Cedula"].ToString(),
                                nombre = dr["NombreT"].ToString(),
                                apellido1 = dr["Apellido1"].ToString(),
                                apellido2 = dr["Apellido2"].ToString(),
                                email = dr["Email"].ToString(),
                                fechaInicio = Convert.ToDateTime(dr["Fecha_nacimiento"].ToString()),
                                fechaNacimiento = Convert.ToDateTime(dr["Fecha_ingreso"].ToString()),
                                edad = Convert.ToInt32(dr["Edad"]),
                                puesto = dr["Rol"].ToString(),
                                frecuenciaPago = dr["Tipo_pago"].ToString()
                            };
                        }

                    }



                    return telefonoCliente;
                }
                catch (Exception ex)
                {
                    return telefonoCliente;
                }
            }
        }

        public static bool Eliminar(string cedula)
        {
            using (SqlConnection oConexion = new SqlConnection(Conexion.rutaConexion))
            {
                SqlCommand cmd = new SqlCommand("delete from TRABAJADOR where Cedula = "+cedula, oConexion);
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
                    return false;
                }
            }
        }
    }
}
