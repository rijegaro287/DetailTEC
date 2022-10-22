
using DetailTEC.Models;
using System.Data.SqlClient;
using System.Data;

namespace DetailTEC.Data
{
    public class ProductoData
    {
        public static bool Registrar(Producto producto)
        {
            using (SqlConnection oConexion = new SqlConnection(Conexion.rutaConexion))
            {


                SqlCommand cmd = new SqlCommand("insert into " +
                    "PRODUCTO(Nombre,Marca,Costo,Precio,idProveedor,nombreProveedor)" +
                    "values(" + producto.nombre + "," + producto.marca + "," + producto.costo + "," + producto.precio + "," +
                    producto.idProveedor + "," + producto.nombreProveedor + ")", oConexion);

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

        public static bool Modificar(Producto producto)
        {
            using (SqlConnection oConexion = new SqlConnection(Conexion.rutaConexion))
            {

                SqlCommand cmd = new SqlCommand("update PRODUCTO set" +
                    "Nombre = " + producto.nombre + ",Marca =" + producto.marca + ",Costo=" + producto.costo +
                    ",Precio=" + producto.precio + ",IdProveedor=" +
                    producto.idProveedor + ",NombreProveedor=" + producto.nombreProveedor
                    + ")", oConexion);

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

        public static List<ProductoForGet> Listar()
        {
            List<ProductoForGet> oListaUsuario = new List<ProductoForGet>();
            using (SqlConnection oConexion = new SqlConnection(Conexion.rutaConexion))
            {

                SqlCommand cmd = new SqlCommand("select Nombre, Marca, Costo, Precio, idProveedor, nombreProveedor from PRODUCTO", oConexion);
                try
                {
                    oConexion.Open();
                    cmd.ExecuteNonQuery();

                    using (SqlDataReader dr = cmd.ExecuteReader())
                    {

                        while (dr.Read())
                        {
                            oListaUsuario.Add(new ProductoForGet()
                            {
                                nombre = dr["Nombre"].ToString(),
                                marca = dr["Marca"].ToString(),
                                costo = Convert.ToInt32(dr["Costo"].ToString()),
                                precio = Convert.ToInt32(dr["Precio"].ToString()),
                                idProveedor = dr["idProveedor"].ToString(),
                                nombreProveedor = dr["nombreProveedor"].ToString(),

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


        public static Producto Obtener(string id)

        {
            Producto producto = new Producto();
            using (SqlConnection oConexion = new SqlConnection(Conexion.rutaConexion))
            {

                //SqlCommand cmd = new SqlCommand("producto_obtener", oConexion);
                //cmd.CommandType = CommandType.StoredProcedure;
                //cmd.Parameters.AddWithValue("@Nombre", nombre);
                SqlCommand cmd = new SqlCommand("select Nombre, Marca, Costo, Precio, idProveedor, nombreProveedor from PRODUCTO" +
                    " WHERE ID =" + id);

                SqlCommand cmd = new SqlCommand("producto_obtener", oConexion);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Nombre", nombre);


                try
                {
                    oConexion.Open();
                    cmd.ExecuteNonQuery();

                    using (SqlDataReader dr = cmd.ExecuteReader())
                    {

                        while (dr.Read())
                        {
                            producto = new Producto()
                            {
                                nombre = dr["Nombre"].ToString(),
                                marca = dr["Marca"].ToString(),
                                costo = Convert.ToInt32(dr["Costo"].ToString()),
                                precio = Convert.ToInt32(dr["Precio"].ToString()),
                                idProveedor = dr["idProveedor"].ToString(),
                                nombreProveedor = dr["nombreProveedor"].ToString(),
                            };
                        }

                    }



                    return producto;
                }
                catch (Exception ex)
                {
                    return producto;
                }
            }
        }

        public static bool Eliminar(string nombre)
        {
            using (SqlConnection oConexion = new SqlConnection(Conexion.rutaConexion))
            {
                SqlCommand cmd = new SqlCommand("producto_eliminar", oConexion);

                //cmd.CommandType = CommandType.StoredProcedure;
                //cmd.Parameters.AddWithValue("@Nombre", nombre);

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