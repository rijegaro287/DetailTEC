using System.Data;
using System.Data.SqlClient;
using DetailTEC.Models;

namespace DetailTEC.Data
{

    // manejo de productos comprados por clientes en la base de datos
    public class ProductosCompradosData
    {

        // inserta un producto comprado en la base de datos
        public static bool Registrar(ProductosComprados productosComprados)
        {
            using (SqlConnection oConexion = new SqlConnection(Conexion.rutaConexion))
            {
                int edad = DateTime.Today.AddTicks(-productosComprados.fechaNacimiento.Ticks).Year - 1;

                SqlCommand cmd = new SqlCommand("insert into " +
                    "TRABAJADOR(Cedula,NombreT,Apellido1,Apellido2,Fecha_nacimiento,Fecha_ingreso,Edad,PasswordT,Rol,Tipo_pago)" +
                    " values(" + productosComprados.id +"," +productosComprados.nombre+ "," + productosComprados.apellido1+ "," + productosComprados.apellido2+ "," +
                    productosComprados.email+","+productosComprados.fechaNacimiento +"," +productosComprados.fechaInicio+","+edad+ "," + productosComprados.password+
                    "," + productosComprados.puesto+ "," + productosComprados.frecuenciaPago+")", oConexion);

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

        // cambia valores determinados de producto comprado 

        public static bool Modificar(ProductosComprados productosComprados)
        {
            using (SqlConnection oConexion = new SqlConnection(Conexion.rutaConexion))
            {
                int edad = DateTime.Today.AddTicks(-productosComprados.fechaNacimiento.Ticks).Year - 1;
                SqlCommand cmd = new SqlCommand("update TRABAJADOR set " +
                    "Cedula = "+ productosComprados.id + ",NombreT =" + productosComprados.nombre + ",Apellido1=" + productosComprados.apellido1 +
                    ",Apellido2=" + productosComprados.apellido2 + ",Email=" +
                    productosComprados.email + ",Fecha_nacimiento=" + productosComprados.fechaNacimiento 
                    + ",Fecha_ingreso=" + productosComprados.fechaInicio + ",Edad=" + edad + ",PasswordT=" + productosComprados.password +
                    ",Rol=" + productosComprados.puesto + ",Tipo_pago=" + productosComprados.frecuenciaPago+
                    "where Cedula = "+productosComprados.id + ")", oConexion);

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

        // lista todos los productos comprados
        public static List<ProductosCompradosForGet> Listar()
        {
            List<ProductosCompradosForGet> oListaUsuario = new List<ProductosCompradosForGet>();
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
                            oListaUsuario.Add(new ProductosCompradosForGet()
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


        // obtiene un producto comprado segun la cedula del cliente
        public static ProductosCompradosForGet Obtener(string cedula)
        {
            ProductosCompradosForGet productosComprados = new ProductosCompradosForGet();
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
                            productosComprados = new ProductosCompradosForGet()
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



                    return productosComprados;
                }
                catch (Exception ex)
                {
                    return productosComprados;
                }
            }
        }

        // elimina un producto comprado segun la cedula del cliente
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
