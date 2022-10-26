
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
                    "PRODUCTO(ID, NombreP,Marca,Costo,Precio,Ced_prov)" +
                    "values(@param1, @param2, @param3, @param4, @param5, @param6)", oConexion);

                cmd.Parameters.Add("@param1", SqlDbType.Int).Value = producto.id;
                cmd.Parameters.Add("@param2", SqlDbType.VarChar, 20).Value = producto.nombre;
                cmd.Parameters.Add("@param3", SqlDbType.VarChar, 20).Value = producto.marca;
                cmd.Parameters.Add("@param4", SqlDbType.Int).Value = producto.costo;
                cmd.Parameters.Add("@param5", SqlDbType.Int).Value = producto.precio;
                cmd.Parameters.Add("@param6", SqlDbType.Char, 10).Value = producto.idProveedor;
                cmd.CommandType = CommandType.Text;

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

        public static bool Modificar(Producto producto, string id)
        {
            using (SqlConnection oConexion = new SqlConnection(Conexion.rutaConexion))
            {

                SqlCommand cmd = new SqlCommand("update PRODUCTO set ID=@param1, NombreP=@param2, Marca=@param3, " +
                    " Costo=@param4, Precio=@param5, Ced_prov=@param6 where ID=@param7", oConexion);
                cmd.Parameters.Add("@param1", SqlDbType.Int).Value = producto.id;
                cmd.Parameters.Add("@param2", SqlDbType.VarChar, 20).Value = producto.nombre;
                cmd.Parameters.Add("@param3", SqlDbType.VarChar, 20).Value = producto.marca;
                cmd.Parameters.Add("@param4", SqlDbType.Int).Value = producto.costo;
                cmd.Parameters.Add("@param5", SqlDbType.Int).Value = producto.precio;
                cmd.Parameters.Add("@param6", SqlDbType.Char, 10).Value = producto.idProveedor;
                cmd.Parameters.Add("@param7", SqlDbType.Int).Value = Convert.ToInt32(id);
                cmd.CommandType = CommandType.Text;

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

                SqlCommand cmd = new SqlCommand("select P.ID, P.NombreP, P.Marca, P.Costo, P.Precio, P.Ced_prov, R.Nombre from PRODUCTO as P, PROVEEDOR as R" +
                    " where P.Ced_prov = R.Cedula_juridica", oConexion);
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
                                id = Convert.ToInt32(dr["ID"].ToString()),
                                nombre = dr["NombreP"].ToString(),
                                marca = dr["Marca"].ToString(),
                                costo = Convert.ToInt32(dr["Costo"].ToString()),
                                precio = Convert.ToInt32(dr["Precio"].ToString()),
                                idProveedor = dr["Ced_prov"].ToString(),
                                nombreProveedor = dr["Nombre"].ToString()


                            });

                        }

                    }



                    return oListaUsuario;
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex);
                    return oListaUsuario;
                }
            }
        }


        public static ProductoForGet Obtener(string id)

        {
            ProductoForGet producto = new ProductoForGet();
            using (SqlConnection oConexion = new SqlConnection(Conexion.rutaConexion))
            {

                SqlCommand cmd = new SqlCommand("select P.ID, P.NombreP, P.Marca, P.Costo, P.Precio, P.Ced_prov, R.Nombre from PRODUCTO as P, PROVEEDOR as R" +
                    " where P.ID = "+id+" AND P.Ced_prov = R.Cedula_juridica", oConexion);
                try
                {
                    oConexion.Open();
                    cmd.ExecuteNonQuery();

                    using (SqlDataReader dr = cmd.ExecuteReader())
                    {

                        while (dr.Read())
                        {
                            producto = new ProductoForGet()
                            {
                                id = Convert.ToInt32(dr["ID"].ToString()),
                                nombre = dr["NombreP"].ToString(),
                                marca = dr["Marca"].ToString(),
                                costo = Convert.ToInt32(dr["Costo"].ToString()),
                                precio = Convert.ToInt32(dr["Precio"].ToString()),
                                idProveedor = dr["Ced_prov"].ToString(),
                                nombreProveedor = dr["Nombre"].ToString()


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

        public static bool Eliminar(string id)
        {
            using (SqlConnection oConexion = new SqlConnection(Conexion.rutaConexion))
            {
                try
                {
                    oConexion.Open();
                    SqlCommand cmd1 = new SqlCommand("delete from PRODUCTO_LAVADO where ID_Producto = " + id, oConexion);
                    cmd1.ExecuteNonQuery();
                    SqlCommand cmd2 = new SqlCommand("delete from PRODUCTOS_COMPRADOS where ID_Producto = " + id, oConexion);
                    cmd2.ExecuteNonQuery();
                    SqlCommand cmd3 = new SqlCommand("delete from PRODUCTO where ID = " + id, oConexion);
                    cmd3.ExecuteNonQuery();
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