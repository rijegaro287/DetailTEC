using System.Data;
using System.Data.SqlClient;
using DetailTEC.Models;

namespace DetailTEC.Data
{
    public class FacturaData
    {
        public static bool Registrar(Factura factura)
        {
            using (SqlConnection oConexion = new SqlConnection(Conexion.rutaConexion))
            {

                SqlCommand cmd = new SqlCommand("insert into " +
                    "FACTURA(id, placaVehiculo, nombreSucursal, idCliente, nombreCliente, tipoLavado, fecha, hora, montoPagado, puntosUtilizados)" +
                    " values(" + factura.id +"," +factura.placaVehiculo+ "," + factura.nombreSucursal+ "," + factura.idCliente+ "," +
                    factura.nombreCliente+","+factura.tipoLavado +"," +factura.fecha+"," + factura.hora+
                    "," + factura.montoPagado+ "," + factura.puntosUtilizados+")", oConexion);

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

        public static bool Modificar(Factura factura)
        {
            using (SqlConnection oConexion = new SqlConnection(Conexion.rutaConexion))
            {
              
                SqlCommand cmd = new SqlCommand("update FACTURA set " +
                    "Id = "+ factura.id + ",PlacaVehiculo =" + factura.placaVehiculo + ",NombreSucursal=" + factura.nombreSucursal +
                    ",IdCliente=" + factura.idCliente + ",NombreCliente=" +
                    factura.nombreCliente + ",TipoLavado=" + factura.tipoLavado 
                    + ",Fecha=" + factura.fecha + ",Hora=" + factura.hora +
                    ",MontoPagado=" + factura.montoPagado + ",PuntosUtilizados=" + factura.puntosUtilizados+
                    "where Id = "+factura.id + ")", oConexion);

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

        public static List<FacturaForGet> Listar()
        {
            List<FacturaForGet> oListaUsuario = new List<FacturaForGet>();
            using (SqlConnection oConexion = new SqlConnection(Conexion.rutaConexion))
            {

                SqlCommand cmd = new SqlCommand("select Id,PlacaVehiculo,NombreSucursal, IdCliente, NombreCliente, Fecha, TipoLavado, Edad, MontoPagado, PuntosUtilizados from FACTURA", oConexion);
                try
                {
                    oConexion.Open();
                    cmd.ExecuteNonQuery();

                    using (SqlDataReader dr = cmd.ExecuteReader())
                    {

                        while (dr.Read())
                        {
                            oListaUsuario.Add(new FacturaForGet()
                            {
                                id = Convert.ToInt32(dr["Id"]),
                                placaVehiculo = dr["PlacaVehiculo"].ToString(),
                                apellido1 = dr["NombreSucursal"].ToString(),
                                idCliente = Convert.ToInt32(dr["IdCliente"]),
                                nombreCliente = dr["NombreCliente"].ToString(),
                                fecha = Convert.ToDateTime(dr["Fecha"].ToString()),
                                hora = Convert.ToDateTime(dr["Hora"].ToString()),
                                tipoLavado = dr["TipoLavado".ToString()],
                                montoPagado = Convert.ToInt32(dr["MontoPagado"]),
                                puntosUtilizados = Convert.ToInt32(dr["PuntosUtilizados"])
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

        public static FacturaForGet Obtener(string id)
        {
            FacturaForGet factura = new FacturaForGet();
            using (SqlConnection oConexion = new SqlConnection(Conexion.rutaConexion))
            {
                SqlCommand cmd = new SqlCommand("select Id,PlacaVehiculo,NombreSucursal, IdCliente, NombreCliente, Fecha, TipoLavado, Edad, MontoPagado, " +
                    "PuntosUtilizados from FACTURA where Id = " + id, oConexion);

                try
                {
                    oConexion.Open();
                    cmd.ExecuteNonQuery();

                    using (SqlDataReader dr = cmd.ExecuteReader())
                    {

                        while (dr.Read())
                        {
                            factura = new FacturaForGet()
                            {
                                id = Convert.ToInt32(dr["Id"]),
                                placaVehiculo = dr["PlacaVehiculo"].ToString(),
                                apellido1 = dr["NombreSucursal"].ToString(),
                                idCliente = Convert.ToInt32(dr["IdCliente"]),
                                nombreCliente = dr["NombreCliente"].ToString(),
                                fecha = Convert.ToDateTime(dr["Fecha"].ToString()),
                                hora = Convert.ToDateTime(dr["Hora"].ToString()),
                                tipoLavado = dr["TipoLavado".ToString()],
                                montoPagado = Convert.ToInt32(dr["MontoPagado"]),
                                puntosUtilizados = Convert.ToInt32(dr["PuntosUtilizados"])
                            };
                        }

                    }



                    return factura;
                }
                catch (Exception ex)
                {
                    return factura;
                }
            }
        }

        public static bool Eliminar(string id)
        {
            using (SqlConnection oConexion = new SqlConnection(Conexion.rutaConexion))
            {
                SqlCommand cmd = new SqlCommand("delete from FACTURA where Id = "+id, oConexion);
                //cmd.CommandType = CommandType.StoredProcedure;
                //cmd.Parameters.AddWithValue("@Id", id);

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
