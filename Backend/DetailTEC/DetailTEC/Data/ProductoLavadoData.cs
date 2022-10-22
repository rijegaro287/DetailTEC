using System.Data;
using System.Data.SqlClient;
using DetailTEC.Models;

namespace DetailTEC.Data
{
    public class ProductoLavadoData
    {
        public static bool Registrar(ProductoLavado productoLavado)
        {
            using (SqlConnection oConexion = new SqlConnection(Conexion.rutaConexion))
            {
                int edad = DateTime.Today.AddTicks(-productoLavado.fechaNacimiento.Ticks).Year - 1;

                SqlCommand cmd = new SqlCommand("insert into " +
                    "TRABAJADOR(Cedula,NombreT,Apellido1,Apellido2,Fecha_nacimiento,Fecha_ingreso,Edad,PasswordT,Rol,Tipo_pago)" +
                    " values(" + productoLavado.id +"," +productoLavado.nombre+ "," + productoLavado.apellido1+ "," + productoLavado.apellido2+ "," +
                    productoLavado.email+","+productoLavado.fechaNacimiento +"," +productoLavado.fechaInicio+","+edad+ "," + productoLavado.password+
                    "," + productoLavado.puesto+ "," + productoLavado.frecuenciaPago+")", oConexion);

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

        public static bool Modificar(ProductoLavado productoLavado)
        {
            using (SqlConnection oConexion = new SqlConnection(Conexion.rutaConexion))
            {
                int edad = DateTime.Today.AddTicks(-productoLavado.fechaNacimiento.Ticks).Year - 1;
                SqlCommand cmd = new SqlCommand("update TRABAJADOR set " +
                    "Cedula = "+ productoLavado.id + ",NombreT =" + productoLavado.nombre + ",Apellido1=" + productoLavado.apellido1 +
                    ",Apellido2=" + productoLavado.apellido2 + ",Email=" +
                    productoLavado.email + ",Fecha_nacimiento=" + productoLavado.fechaNacimiento 
                    + ",Fecha_ingreso=" + productoLavado.fechaInicio + ",Edad=" + edad + ",PasswordT=" + productoLavado.password +
                    ",Rol=" + productoLavado.puesto + ",Tipo_pago=" + productoLavado.frecuenciaPago+
                    "where Cedula = "+productoLavado.id + ")", oConexion);

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

        public static List<ProductoLavadoForGet> Listar()
        {
            List<ProductoLavadoForGet> oListaUsuario = new List<ProductoLavadoForGet>();
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
                            oListaUsuario.Add(new ProductoLavadoForGet()
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

        public static ProductoLavadoForGet Obtener(string cedula)
        {
            ProductoLavadoForGet productoLavado = new ProductoLavadoForGet();
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
                            productoLavado = new ProductoLavadoForGet()
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



                    return productoLavado;
                }
                catch (Exception ex)
                {
                    return productoLavado;
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
