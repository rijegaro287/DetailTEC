using System.Data;
using System.Data.SqlClient;
using DetailTEC.Models;

namespace DetailTEC.Data
{
    public class CitaData
    {
        public static bool Registrar(Cita cita)
        {
            using (SqlConnection oConexion = new SqlConnection(Conexion.rutaConexion))
            {
                SqlCommand cmd1 = new SqlCommand("insert into CITA(ID, Placa, ID_Sucursal, ID_Lavado" +
                    ", Cedula_cliente, Fecha, Hora ,Medio_pago)" +
                    " values(@param1, @param2, @param3, @param4, @param5, @param6, @param7, @param8)", oConexion);
                cmd1.Parameters.Add("@param1", SqlDbType.Int).Value = cita.id;
                cmd1.Parameters.Add("@param2", SqlDbType.Char, 6).Value = cita.placaVehiculo;
                cmd1.Parameters.Add("@param3", SqlDbType.Int).Value = cita.IDSucursal;
                cmd1.Parameters.Add("@param4", SqlDbType.Int).Value =cita.tipoLavado;
                cmd1.Parameters.Add("@param5", SqlDbType.Char, 9).Value = cita.cedulaCliente;
                cmd1.Parameters.Add("@param6", SqlDbType.Date).Value = cita.fecha.Date;
                cmd1.Parameters.Add("@param7", SqlDbType.Time).Value = cita.hora;
                cmd1.Parameters.Add("@param8", SqlDbType.VarChar).Value = cita.medioPago;
                cmd1.CommandType = CommandType.Text;


                try
                {
                    oConexion.Open();
                    cmd1.ExecuteNonQuery();

                    SqlCommand cmd2 = null;
                    if (cita.idEmpleados != null)
                    {
                        for (int i = 0; i < (cita.idEmpleados.Count); i++)
                        {
                            cmd2 = new SqlCommand("insert into TRABAJADORES_POR_CITA(Cedula_trabajador,ID_cita) values(@param1, @param2)", oConexion);
                            cmd2.Parameters.Add("@param1", SqlDbType.Char, 9).Value = cita.idEmpleados[i];
                            cmd2.Parameters.Add("@param2", SqlDbType.Int).Value = cita.id;
                            cmd2.CommandType = CommandType.Text;
                            cmd2.ExecuteNonQuery();
                        }
                    }
                    SqlCommand cmd3 = new SqlCommand("Select P.ID_Producto from PRODUCTO_LAVADO AS P where P.ID_Lavado = " +cita.tipoLavado, oConexion);
                    cmd3.CommandType = CommandType.Text;
                    cmd3.ExecuteNonQuery();
                    List<int> productos = new List<int>();
                    using (SqlDataReader dr = cmd3.ExecuteReader())
                    {

                        while (dr.Read())
                        {
                            productos.Add(Convert.ToInt32(dr["ID_Producto"]));
                        }
                    }

                    if (productos != null)
                    {
                        for (int i = 0; i < (productos.Count); i++)
                        {
                            SqlCommand cmd4 = new SqlCommand("insert into PRODUCTOS_COMPRADOS(ID_Producto, ID_Factura, Cantidad) values(@param1, @param2, @param3)", oConexion);
                            cmd4.Parameters.Add("@param1", SqlDbType.Int).Value = productos[i];
                            cmd4.Parameters.Add("@param2", SqlDbType.Int).Value = cita.id;
                            cmd4.Parameters.Add("@param2", SqlDbType.Int).Value = 1;
                            cmd4.CommandType = CommandType.Text;
                            cmd4.ExecuteNonQuery();
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

        public static bool Modificar(Cita cita)
        {
            using (SqlConnection oConexion = new SqlConnection(Conexion.rutaConexion))
            {
                SqlCommand cmd1;
                cmd1 = new SqlCommand("update CITA set " +
                    "ID = @param1,Placa =@param2, ID_Sucursal=@param3," +
                    "ID_Lavado=@param4, Cedula_cliente=@param5, Fecha=@param6, Hora=@param7" +
                    " where ID = @param8", oConexion);

                cmd1.Parameters.Add("@param1", SqlDbType.Int).Value = cita.id;
                cmd1.Parameters.Add("@param2", SqlDbType.Char, 6).Value = cita.placaVehiculo;
                cmd1.Parameters.Add("@param3", SqlDbType.Int).Value = cita.IDSucursal;
                cmd1.Parameters.Add("@param4", SqlDbType.Int).Value = cita.tipoLavado;
                cmd1.Parameters.Add("@param5", SqlDbType.Char, 9).Value = cita.cedulaCliente;
                cmd1.Parameters.Add("@param6", SqlDbType.Date).Value = cita.fecha.Date;
                cmd1.Parameters.Add("@param7", SqlDbType.Time).Value = cita.hora;
                cmd1.Parameters.Add("@param8", SqlDbType.Int).Value = cita.id;
                cmd1.CommandType = CommandType.Text;

                try
                {
                    oConexion.Open();
                    cmd1.ExecuteNonQuery();
                    SqlCommand cmd2 = null;
                    if (cita.idEmpleados != null)
                    {
                        for (int i = 0; i < (cita.idEmpleados.Count); i++)
                        {
                            cmd2 = new SqlCommand("update TRABAJADORES_POR_CITA set Cedula_trabajador=@param1, ID_cita=@param2 where " +
                                " Cedula_trabajador = @param3", oConexion);
                            cmd2.Parameters.Add("@param1", SqlDbType.Char, 9).Value = cita.idEmpleados[i];
                            cmd2.Parameters.Add("@param2", SqlDbType.Int).Value = cita.id;
                            cmd2.Parameters.Add("@param3", SqlDbType.Int).Value = cita.idEmpleados[i];
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

        public static List<CitaForGet> Listar()
        {
            List<CitaForGet> oListaUsuario = new List<CitaForGet>();
            using (SqlConnection oConexion = new SqlConnection(Conexion.rutaConexion))
            {

                SqlCommand cmd = new SqlCommand("select C.*, A.Cedula_Trabajador,T.NombreT from CITA as C, TRABAJADORES_POR_CITA as A, TRABAJADOR as T " +
                    " where C.ID = A.ID_Cita AND A.Cedula_Trabajador = T.Cedula", oConexion);
                try
                {
                    oConexion.Open();
                    cmd.ExecuteNonQuery();
                    bool firstRead = true;
                    string idRef = "";
                    int i = 0;

                    List<string> nombresList = new List<string>();
                    using (SqlDataReader dr = cmd.ExecuteReader())
                    {

                        while (dr.Read())
                        {
                            if (firstRead || (idRef != dr["ID"].ToString()))
                            {
                                if (!firstRead)
                                {
                                    oListaUsuario[i].idEmpleados = nombresList;
                                    i++;
                                    nombresList = new List<string>();
                                }

                                idRef = dr["ID"].ToString();
                                oListaUsuario.Add(new CitaForGet()
                                {

                                    id = Convert.ToInt32(dr["ID"]),
                                    placaVehiculo = dr["Placa"].ToString(),
                                    IDSucursal = Convert.ToInt32(dr["ID_Sucursal"]),
                                    tipoLavado = Convert.ToInt32(dr["ID_Lavado"]),
                                    cedulaCliente = dr["Cedula_cliente"].ToString(),
                                    nombreCliente = dr["NombreT"].ToString(),
                                    fecha = Convert.ToDateTime(dr["Fecha"]),
                                    hora = TimeSpan.Parse((dr["Hora"]).ToString()),
                                    medioPago = dr["Medio_pago"].ToString()
                                   

                                });
                                firstRead = false;
                                nombresList.Add(dr["Cedula_Trabajador"].ToString());

                            }
                            else
                            {
                                nombresList.Add(dr["Cedula_Trabajador"].ToString());

                            } 

                        }


                    }

                    for (int x = 0; x < oListaUsuario.Count; x++)
                    {
                        SqlCommand cmd3 = new SqlCommand("Select SUM(P.Precio) AS Sumatoria from PRODUCTO_LAVADO AS L, PRODUCTO as" +
                            " P where L.ID_Lavado = " + oListaUsuario[x].tipoLavado.ToString() + " AND L.ID_Producto = P.ID", oConexion);
                        cmd3.CommandType = CommandType.Text;
                        cmd3.ExecuteNonQuery();
                        int monto_temp = 0;
                        using (SqlDataReader dr = cmd3.ExecuteReader())
                        {

                            while (dr.Read())
                            {
                                monto_temp = Convert.ToInt32(dr["Sumatoria"]);
                            }
                        }
                        oListaUsuario[x].montoPagado = monto_temp;
                    }

                    oListaUsuario[i].idEmpleados = nombresList;
                    return oListaUsuario;

                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex);
                    return oListaUsuario;
                }
            }
        }

        public static CitaForGet Obtener(string ID)
        {
            CitaForGet cita = new CitaForGet();
            using (SqlConnection oConexion = new SqlConnection(Conexion.rutaConexion))
            {
                SqlCommand cmd = new SqlCommand("select C.*, A.Cedula_Trabajador, T.NombreT from CITA as C, TRABAJADORES_POR_CITA as A, TRABAJADOR as T " +
                    " where C.ID = "+ ID+ " AND C.ID = A.ID_Cita AND A.Cedula_Trabajador = T.Cedula", oConexion);

                try
                {
                    oConexion.Open();
                    cmd.ExecuteNonQuery();
                    bool firstRead = true;
                    List<string> nombresList = new List<string>();

                    using (SqlDataReader dr = cmd.ExecuteReader())
                    {

                        while (dr.Read())
                        {
                            if (firstRead)
                            {
                                cita = new CitaForGet()
                                {
                                    id = Convert.ToInt32(dr["ID"]),
                                    placaVehiculo = dr["Placa"].ToString(),
                                    IDSucursal = Convert.ToInt32(dr["ID_Sucursal"]),
                                    tipoLavado = Convert.ToInt32(dr["ID_Lavado"]),
                                    cedulaCliente = dr["Cedula_cliente"].ToString(),
                                    nombreCliente = dr["NombreT"].ToString(),
                                    fecha = Convert.ToDateTime(dr["Fecha"]),
                                    hora = TimeSpan.Parse((dr["Hora"]).ToString()),
                                    medioPago = dr["Medio_pago"].ToString()

                                };

                                nombresList.Add(dr["Cedula_Trabajador"].ToString());
                                firstRead = false;
                            }
                            else
                            {
                                nombresList.Add(dr["Cedula_Trabajador"].ToString());

                            }
                        }



                    }

                    SqlCommand cmd3 = new SqlCommand("Select SUM(P.Precio) AS Sumatoria from PRODUCTO_LAVADO AS L, PRODUCTO as" +
                            " P where L.ID_Lavado = " + cita.tipoLavado + " AND L.ID_Producto = P.ID", oConexion);
                    cmd3.CommandType = CommandType.Text;
                    cmd3.ExecuteNonQuery();
                    int monto_temp = 0;
                    using (SqlDataReader dr = cmd3.ExecuteReader())
                    {

                        while (dr.Read())
                        {
                            monto_temp = Convert.ToInt32(dr["Sumatoria"]);
                        }
                    }
                    cita.montoPagado = monto_temp;

                    cita.idEmpleados = nombresList;

                    return cita;
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex);
                    return cita;
                }
            }
        }

        public static bool Eliminar(string ID)
        {
            using (SqlConnection oConexion = new SqlConnection(Conexion.rutaConexion))
            {


                try
                {
                    oConexion.Open();
                    SqlCommand cmd1 = new SqlCommand("delete from TRABAJADORES_POR_CITA where ID_cita = " + ID, oConexion);
                    cmd1.ExecuteNonQuery();
                    SqlCommand cmd2 = new SqlCommand("delete from PRODUCTOS_COMPRADOS where ID_Factura = " + ID, oConexion);
                    cmd2.ExecuteNonQuery();
                    SqlCommand cmd3 = new SqlCommand("delete from FACTURA where ID = " + ID, oConexion);
                    cmd3.ExecuteNonQuery();
                    SqlCommand cmd4 = new SqlCommand("delete from CITA where ID = " + ID, oConexion);
                    cmd4.ExecuteNonQuery();
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
