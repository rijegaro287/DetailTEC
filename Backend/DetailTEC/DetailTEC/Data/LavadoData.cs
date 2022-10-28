using DetailTEC.Models;
using System.Data.SqlClient;
using System.Data;
using DetailTEC.Data;

namespace DetailTEC.Data
{
  public class LavadoData
  {

    public static bool Registrar(Lavado lavado)
    {
      using (SqlConnection oConexion = new SqlConnection(Conexion.rutaConexion))
      {
        SqlCommand cmd1 = new SqlCommand("insert into LAVADO(ID, Nombre, Comision_trabajador, Precio" +
            ", Costo, Duracion_en_minutos, Puntos_otorgados, Trabajadores_necesarios)" +
            " values(@param1, @param2, @param3, @param4, @param5, @param6, @param7, @param8)", oConexion);
        cmd1.Parameters.Add("@param1", SqlDbType.Int).Value = lavado.id;
        cmd1.Parameters.Add("@param2", SqlDbType.VarChar, 40).Value = lavado.nombre;
        cmd1.Parameters.Add("@param3", SqlDbType.Int).Value = lavado.comisionEmpleado;
        cmd1.Parameters.Add("@param4", SqlDbType.Int).Value = lavado.precio;
        cmd1.Parameters.Add("@param5", SqlDbType.Int).Value = lavado.costo;
        cmd1.Parameters.Add("@param6", SqlDbType.Int).Value = lavado.duracionMinutos;
        cmd1.Parameters.Add("@param7", SqlDbType.Int).Value = lavado.puntuacion;
        cmd1.Parameters.Add("@param8", SqlDbType.Int).Value = lavado.cantidadEmpleados;
        cmd1.CommandType = CommandType.Text;


        try
        {
          oConexion.Open();
          cmd1.ExecuteNonQuery();

          SqlCommand cmd2 = null;
          if (lavado.idProductos != null)
          {
            for (int i = 0; i < (lavado.idProductos.Count); i++)
            {
              cmd2 = new SqlCommand("insert into PRODUCTO_LAVADO(ID_Producto, ID_Lavado) values(@param1, @param2)", oConexion);
              cmd2.Parameters.Add("@param1", SqlDbType.Int).Value = lavado.idProductos[i];
              cmd2.Parameters.Add("@param2", SqlDbType.Int).Value = lavado.id;
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

    public static bool Modificar(Lavado lavado, string id)
    {
      using (SqlConnection oConexion = new SqlConnection(Conexion.rutaConexion))
      {
        SqlCommand cmd1;
        cmd1 = new SqlCommand("update LAVADO set " +
            "ID = @param1,Nombre =@param2,Comision_trabajador=@param3," +
            "Precio=@param4, Costo=@param5, Duracion_en_minutos=@param6, Puntos_otorgados=@param7," +
            "Trabajadores_necesarios=@param8 where ID = @param9", oConexion);
        cmd1.Parameters.Add("@param1", SqlDbType.Int).Value = lavado.id;
        cmd1.Parameters.Add("@param2", SqlDbType.VarChar, 40).Value = lavado.nombre;
        cmd1.Parameters.Add("@param3", SqlDbType.Int).Value = lavado.comisionEmpleado;
        cmd1.Parameters.Add("@param4", SqlDbType.Int).Value = lavado.precio;
        cmd1.Parameters.Add("@param5", SqlDbType.Int).Value = lavado.costo;
        cmd1.Parameters.Add("@param6", SqlDbType.Int).Value = lavado.duracionMinutos;
        cmd1.Parameters.Add("@param7", SqlDbType.Int).Value = lavado.puntuacion;
        cmd1.Parameters.Add("@param8", SqlDbType.Int).Value = lavado.cantidadEmpleados;
        cmd1.Parameters.Add("@param9", SqlDbType.Int).Value = Convert.ToInt32(id);
        cmd1.CommandType = CommandType.Text;



        try
        {
          oConexion.Open();
          cmd1.ExecuteNonQuery();
          SqlCommand cmd2 = null;
          if (lavado.idProductos != null)
          {
            for (int i = 0; i < (lavado.idProductos.Count); i++)
            {
              cmd2 = new SqlCommand("update PRODUCTO_LAVADO set ID_Producto=@param1, ID_Lavado=@param2 where " +
                  " ID_Lavado = @param3", oConexion);
              cmd2.Parameters.Add("@param1", SqlDbType.Int).Value = lavado.idProductos[i];
              cmd2.Parameters.Add("@param2", SqlDbType.Int).Value = lavado.id;
              cmd2.Parameters.Add("@param3", SqlDbType.Int).Value = Convert.ToInt32(id);
              cmd2.CommandType = CommandType.Text;
              cmd2.ExecuteNonQuery();
            }
          }

          return true;
        }
        catch (Exception ex)
        {
          Console.WriteLine(ex.Message);
          return false;
        }
      }
    }

    public static List<LavadoForGet> Listar()
    {
      List<LavadoForGet> oListaUsuario = new List<LavadoForGet>();
      using (SqlConnection oConexion = new SqlConnection(Conexion.rutaConexion))
      {

        SqlCommand cmd = new SqlCommand("select L.*, T.ID_Producto, P.nombreP from LAVADO as L, PRODUCTO_LAVADO as T, PRODUCTO as P " +
            " where L.ID = T.ID_Lavado AND T.ID_Producto = P.ID", oConexion);
        try
        {
          oConexion.Open();
          cmd.ExecuteNonQuery();
          bool firstRead = true;
          string idRef = "";
          int i = 0;

          List<string> nombresList = new List<string>();
          List<int> idList = new List<int>();

          using (SqlDataReader dr = cmd.ExecuteReader())
          {

            while (dr.Read())
            {
              if (firstRead || (idRef != dr["ID"].ToString()))
              {
                if (!firstRead)
                {
                  oListaUsuario[i].idProductos = idList;
                  oListaUsuario[i].nombresProductos = nombresList;
                  i++;
                  nombresList = new List<string>();
                  idList = new List<int>();
                }

                idRef = dr["ID"].ToString();
                oListaUsuario.Add(new LavadoForGet()
                {

                  id = Convert.ToInt32(dr["ID"]),
                  nombre = dr["Nombre"].ToString(),
                  comisionEmpleado = Convert.ToInt32(dr["Comision_trabajador"]),
                  precio = Convert.ToInt32(dr["Precio"]),
                  costo = Convert.ToInt32(dr["Costo"]),
                  duracionMinutos = Convert.ToInt32(dr["Duracion_en_minutos"]),
                  puntuacion = Convert.ToInt32(dr["Puntos_otorgados"]),
                  cantidadEmpleados = Convert.ToInt32(dr["Trabajadores_necesarios"])

                });
                firstRead = false;
                idList.Add(Convert.ToInt16(dr["ID_Producto"]));
                nombresList.Add(dr["NombreP"].ToString());

              }
              else
              {

                idList.Add(Convert.ToInt32(dr["ID_Producto"]));
                nombresList.Add(dr["NombreP"].ToString());

              }

            }



          }
          oListaUsuario[i].nombresProductos = nombresList;
          oListaUsuario[i].idProductos = idList;
          return oListaUsuario;

        }
        catch (Exception ex)
        {
          Console.WriteLine(ex);
          return oListaUsuario;
        }
      }
    }

    public static LavadoForGet Obtener(string ID)
    {
      LavadoForGet lavado = new LavadoForGet();
      using (SqlConnection oConexion = new SqlConnection(Conexion.rutaConexion))
      {
        SqlCommand cmd = new SqlCommand("select L.*, T.ID_Producto, P.nombreP from LAVADO as L, PRODUCTO_LAVADO as T, PRODUCTO as P " +
            " where L.ID = " + ID + " AND L.ID = T.ID_Lavado AND T.ID_Producto = P.ID", oConexion);

        try
        {
          oConexion.Open();
          cmd.ExecuteNonQuery();
          bool firstRead = true;
          List<string> nombresList = new List<string>();
          List<int> idList = new List<int>();
          using (SqlDataReader dr = cmd.ExecuteReader())
          {

            while (dr.Read())
            {
              if (firstRead)
              {
                lavado = new LavadoForGet()
                {
                  id = Convert.ToInt32(dr["ID"]),
                  nombre = dr["Nombre"].ToString(),
                  comisionEmpleado = Convert.ToInt32(dr["Comision_trabajador"]),
                  precio = Convert.ToInt32(dr["Precio"]),
                  costo = Convert.ToInt32(dr["Costo"]),
                  duracionMinutos = Convert.ToInt32(dr["Duracion_en_minutos"]),
                  puntuacion = Convert.ToInt32(dr["Puntos_otorgados"]),
                  cantidadEmpleados = Convert.ToInt32(dr["Trabajadores_necesarios"])

                };

                nombresList.Add(dr["NombreP"].ToString());
                idList.Add(Convert.ToInt32(dr["ID_Producto"]));
                firstRead = false;
              }
              else
              {
                idList.Add(Convert.ToInt32(dr["ID_Producto"]));
                nombresList.Add(dr["NombreP"].ToString());

              }
            }

          }

          lavado.idProductos = idList;
          lavado.nombresProductos = nombresList;

          return lavado;
        }
        catch (Exception ex)
        {
          return lavado;
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
          SqlCommand cmd1 = new SqlCommand("delete from PRODUCTO_LAVADO where ID_Lavado = " + ID, oConexion);
          cmd1.ExecuteNonQuery();
          SqlCommand cmd2 = new SqlCommand("delete from LAVADO where ID = " + ID, oConexion);
          cmd2.ExecuteNonQuery();
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


