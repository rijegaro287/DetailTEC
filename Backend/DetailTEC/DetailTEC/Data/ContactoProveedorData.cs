using System.Data;
using System.Data.SqlClient;
using DetailTEC.Models;

namespace DetailTEC.Data
{
    public class ContactoProveedorData
    {
        public static bool Registrar(ContactoProveedor contactoProveedor)
        {
            using (SqlConnection oConexion = new SqlConnection(Conexion.rutaConexion))
            {
                int edad = DateTime.Today.AddTicks(-contactoProveedor.fechaNacimiento.Ticks).Year - 1;

                SqlCommand cmd = new SqlCommand("insert into " +
                    "TRABAJADOR(Cedula,NombreT,Apellido1,Apellido2,Fecha_nacimiento,Fecha_ingreso,Edad,PasswordT,Rol,Tipo_pago)" +
                    " values(" + contactoProveedor.id +"," +contactoProveedor.nombre+ "," + contactoProveedor.apellido1+ "," + contactoProveedor.apellido2+ "," +
                    contactoProveedor.email+","+contactoProveedor.fechaNacimiento +"," +contactoProveedor.fechaInicio+","+edad+ "," + contactoProveedor.password+
                    "," + contactoProveedor.puesto+ "," + contactoProveedor.frecuenciaPago+")", oConexion);

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

        public static bool Modificar(ContactoProveedor contactoProveedor)
        {
            using (SqlConnection oConexion = new SqlConnection(Conexion.rutaConexion))
            {
                int edad = DateTime.Today.AddTicks(-contactoProveedor.fechaNacimiento.Ticks).Year - 1;
                SqlCommand cmd = new SqlCommand("update TRABAJADOR set " +
                    "Cedula = "+ contactoProveedor.id + ",NombreT =" + contactoProveedor.nombre + ",Apellido1=" + contactoProveedor.apellido1 +
                    ",Apellido2=" + contactoProveedor.apellido2 + ",Email=" +
                    contactoProveedor.email + ",Fecha_nacimiento=" + contactoProveedor.fechaNacimiento 
                    + ",Fecha_ingreso=" + contactoProveedor.fechaInicio + ",Edad=" + edad + ",PasswordT=" + contactoProveedor.password +
                    ",Rol=" + contactoProveedor.puesto + ",Tipo_pago=" + contactoProveedor.frecuenciaPago+
                    "where Cedula = "+contactoProveedor.id + ")", oConexion);

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

        public static List<ContactoProveedorForGet> Listar()
        {
            List<ContactoProveedorForGet> oListaUsuario = new List<ContactoProveedorForGet>();
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
                            oListaUsuario.Add(new ContactoProveedorForGet()
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

        public static ContactoProveedorForGet Obtener(string cedula)
        {
            ContactoProveedorForGet contactoProveedor = new ContactoProveedorForGet();
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
                            contactoProveedor = new ContactoProveedorForGet()
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



                    return contactoProveedor;
                }
                catch (Exception ex)
                {
                    return contactoProveedor;
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
