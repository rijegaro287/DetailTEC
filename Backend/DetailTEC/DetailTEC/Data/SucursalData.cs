using DetailTEC.Models;
using System.Data.SqlClient;
using System.Data;

namespace DetailTEC.Data
{
  public class SucursalData
  {
    public static bool Registrar(Sucursal sucursal)
    {
      using (SqlConnection oConexion = new SqlConnection(Conexion.rutaConexion))
      {
        SqlCommand cmd = new SqlCommand("insert into " +
            "SUCURSAL(ID, Nombre,Provincia, Canton, Distrito, Telefono, Cedula_gerente," +
            "Fecha_apertura, Fecha_gerente) " +
            " values(@param1, @param2, @param3, @param4, @param5, @param6, @param7, @param8, @param9)", oConexion);
        cmd.Parameters.Add("@param1", SqlDbType.Int).Value = sucursal.id;
        cmd.Parameters.Add("@param2", SqlDbType.VarChar, 40).Value = sucursal.nombre;
        cmd.Parameters.Add("@param3", SqlDbType.VarChar, 20).Value = sucursal.provincia;
        cmd.Parameters.Add("@param4", SqlDbType.VarChar, 20).Value = sucursal.canton;
        cmd.Parameters.Add("@param5", SqlDbType.VarChar, 20).Value = sucursal.distrito;
        cmd.Parameters.Add("@param6", SqlDbType.Char, 8).Value = sucursal.telefono;
        cmd.Parameters.Add("@param7", SqlDbType.Char, 9).Value = sucursal.idGerente;
        cmd.Parameters.Add("@param8", SqlDbType.Date).Value = sucursal.fechaApertura;
        cmd.Parameters.Add("@param9", SqlDbType.Date).Value = sucursal.fechaInicioGerente;
        cmd.CommandType = CommandType.Text;
        try
        {
          oConexion.Open();
          cmd.ExecuteNonQuery();
          return true;
        }
        catch (Exception ex)
        {
          Console.WriteLine(ex.Message);
          return false;
        }
      }
    }

    public static bool Modificar(Sucursal sucursal, string id)
    {
      using (SqlConnection oConexion = new SqlConnection(Conexion.rutaConexion))
      {
        SqlCommand cmd = new SqlCommand("update SUCURSAL set ID=@param1 ,Nombre =@param2"
            + ",Provincia =@param3, Canton =@param4" +
            ",Distrito = @param5" +
            ", Telefono =@param6 ,Cedula_Gerente=@param7"
            + ", Fecha_apertura =@param8" +
            ", Fecha_gerente = @param9 where ID = @param10", oConexion);
        cmd.Parameters.Add("@param1", SqlDbType.Int).Value = sucursal.id;
        cmd.Parameters.Add("@param2", SqlDbType.VarChar, 40).Value = sucursal.nombre;
        cmd.Parameters.Add("@param3", SqlDbType.VarChar, 20).Value = sucursal.provincia;
        cmd.Parameters.Add("@param4", SqlDbType.VarChar, 20).Value = sucursal.canton;
        cmd.Parameters.Add("@param5", SqlDbType.VarChar, 20).Value = sucursal.distrito;
        cmd.Parameters.Add("@param6", SqlDbType.Char, 8).Value = sucursal.telefono;
        cmd.Parameters.Add("@param7", SqlDbType.Char, 9).Value = sucursal.idGerente;
        cmd.Parameters.Add("@param8", SqlDbType.Date).Value = sucursal.fechaApertura;
        cmd.Parameters.Add("@param9", SqlDbType.Date).Value = sucursal.fechaInicioGerente;
        cmd.Parameters.Add("@param10", SqlDbType.Int).Value = id;
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

    public static List<SucursalForGet> Listar()
    {
      List<SucursalForGet> oListaUsuario = new List<SucursalForGet>();
      using (SqlConnection oConexion = new SqlConnection(Conexion.rutaConexion))
      {
        //SqlCommand cmd = new SqlCommand("sucursal_listar", oConexion);
        //cmd.CommandType = CommandType.StoredProcedure;

        SqlCommand cmd = new SqlCommand("select S.ID, S.Nombre, S.Provincia, S.Canton, S.Distrito, S.Telefono," +
            "S.Cedula_Gerente, T.NombreT, T.Apellido1," +
            "S.Fecha_apertura, S.Fecha_gerente from SUCURSAL as S, TRABAJADOR AS T Where T.Cedula = S.Cedula_Gerente",
            oConexion);

        try
        {
          oConexion.Open();
          cmd.ExecuteNonQuery();

          using (SqlDataReader dr = cmd.ExecuteReader())
          {

            while (dr.Read())
            {
              oListaUsuario.Add(new SucursalForGet()
              {
                id = Convert.ToInt32(dr["ID"]),
                nombre = dr["Nombre"].ToString(),
                provincia = dr["Provincia"].ToString(),
                canton = dr["Canton"].ToString(),
                distrito = dr["Distrito"].ToString(),
                telefono = dr["Telefono"].ToString(),
                idGerente = dr["Cedula_gerente"].ToString(),
                nombreGerente = dr["NombreT"].ToString(),
                apellidoGerente = dr["Apellido1"].ToString(),
                fechaApertura = Convert.ToDateTime(dr["Fecha_apertura"].ToString()),
                fechaInicioGerente = Convert.ToDateTime(dr["Fecha_gerente"].ToString())

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

    public static SucursalForGet Obtener(string ID)
    {
      SucursalForGet sucursal = new SucursalForGet();
      using (SqlConnection oConexion = new SqlConnection(Conexion.rutaConexion))
      {
        //SqlCommand cmd = new SqlCommand("sucursal_obtener", oConexion);
        //cmd.CommandType = CommandType.StoredProcedure;
        //cmd.Parameters.AddWithValue("@Nombre", nombre);
        SqlCommand cmd = new SqlCommand("select S.ID, S.Nombre, S.Provincia, S.Canton, S.Distrito, S.Telefono, " +
            "S.Cedula_Gerente, T.NombreT, T.Apellido1, " +
            "S.Fecha_apertura, S.Fecha_gerente from SUCURSAL as S, TRABAJADOR AS T Where T.Cedula = S.Cedula_Gerente AND S.ID =" + ID, oConexion);

        try
        {
          oConexion.Open();
          cmd.ExecuteNonQuery();

          using (SqlDataReader dr = cmd.ExecuteReader())
          {

            while (dr.Read())
            {
              sucursal = new SucursalForGet()
              {
                id = Convert.ToInt32(dr["ID"]),
                nombre = dr["Nombre"].ToString(),
                provincia = dr["Provincia"].ToString(),
                canton = dr["Canton"].ToString(),
                distrito = dr["Distrito"].ToString(),
                telefono = dr["Telefono"].ToString(),
                idGerente = dr["Cedula_gerente"].ToString(),
                nombreGerente = dr["NombreT"].ToString(),
                apellidoGerente = dr["Apellido1"].ToString(),
                fechaApertura = Convert.ToDateTime(dr["Fecha_apertura"]),
                fechaInicioGerente = Convert.ToDateTime(dr["Fecha_gerente"])
              };
            }

          }



          return sucursal;
        }
        catch (Exception ex)
        {
          Console.WriteLine(ex);
          return sucursal;
        }
      }
    }

    public static bool Eliminar(string id)
    {
      using (SqlConnection oConexion = new SqlConnection(Conexion.rutaConexion))
      {
        SqlCommand cmd = new SqlCommand("delete from SUCURSAL where ID = " + id, oConexion);
        //cmd.CommandType = CommandType.StoredProcedure;
        //cmd.Parameters.AddWithValue("@Nombre", nombre);

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
