using DetailTEC.Models;
using System.Data.SqlClient;
using System.Data;

namespace DetailTEC.Data
{
  public class ClienteData
  {
    public static bool Registrar(Cliente cliente)
    {
      using (SqlConnection oConexion = new SqlConnection(Conexion.rutaConexion))
      {
        SqlCommand cmd = new SqlCommand("insert into " +
          "CLIENTE(Cedula,Nombre,Apellido1,Apellido2,Correo,PasswordC,Puntos_actuales," +
        "Puntos_totales, Puntos_usados, Usuario)" +
          " values(@param1, @param2, @param3, @param4, @param5, @param6, " +
          "@param7, @param8, @param9, @param10)", oConexion);

        cmd.Parameters.Add("@param1", SqlDbType.Char, 9).Value = cliente.id;
        cmd.Parameters.Add("@param2", SqlDbType.VarChar, 20).Value = cliente.nombre;
        cmd.Parameters.Add("@param3", SqlDbType.VarChar, 20).Value = cliente.apellido1;
        cmd.Parameters.Add("@param4", SqlDbType.VarChar, 20).Value = cliente.apellido2;
        cmd.Parameters.Add("@param5", SqlDbType.VarChar, 50).Value = cliente.email;

        // Estos son los que puse opcionales
        cmd.Parameters.Add("@param6", SqlDbType.VarChar, 20).Value = "";
        cmd.Parameters.Add("@param7", SqlDbType.Int).Value = 0;
        cmd.Parameters.Add("@param8", SqlDbType.Int).Value = 0;
        cmd.Parameters.Add("@param9", SqlDbType.Int).Value = 0;

        // Este es el que agregué
        cmd.Parameters.Add("@param10", SqlDbType.VarChar, 20).Value = cliente.usuario;
        cmd.CommandType = CommandType.Text;

        try
        {
          oConexion.Open();
          cmd.ExecuteNonQuery();

          SqlCommand cmd1 = null;
          if (cliente.telefonos != null)
          {
            for (int i = 0; i < (cliente.telefonos.Count); i++)
            {
              if (cliente.telefonos[i] != "") // Para evitar errores
              {
                cmd1 = new SqlCommand("insert into TELEFONOS_CLIENTE(Cedula_Cli, Telefono) values(@param1, @param2)", oConexion);
                cmd1.Parameters.Add("@param1", SqlDbType.Char, 9).Value = cliente.id;
                cmd1.Parameters.Add("@param2", SqlDbType.Char, 8).Value = cliente.telefonos[i];
                cmd1.CommandType = CommandType.Text;
                cmd1.ExecuteNonQuery();
              }
            }
          }

          SqlCommand cmd2 = null;
          if (cliente.direcciones != null)
          {
            for (int i = 0; i < (cliente.direcciones.Count); i++)
            {
              if (cliente.direcciones[i] != "") // Para evitar errores
              {
                cmd2 = new SqlCommand("insert into DIRECCIONES_CLIENTE(Cedula_Cli, Direccion) values(@param1, @param2)", oConexion);
                cmd2.Parameters.Add("@param1", SqlDbType.Char, 9).Value = cliente.id;
                cmd2.Parameters.Add("@param2", SqlDbType.VarChar, 50).Value = cliente.direcciones[i];
                cmd2.CommandType = CommandType.Text;
                cmd2.ExecuteNonQuery();
              }
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

    public static bool Modificar(Cliente cliente, string cedula)
    {
      using (SqlConnection oConexion = new SqlConnection(Conexion.rutaConexion))
      {

        SqlCommand cmd = new SqlCommand("update CLIENTE set Cedula=@param1,Nombre=@param2,Apellido1=@param3," +
            "Apellido2=@param4,Correo=@param5,PasswordC=@param6," +
            "Puntos_actuales=@param7,Puntos_totales=@param8, Puntos_usados=@param9 where Cedula = @param10", oConexion);
        cmd.Parameters.Add("@param1", SqlDbType.Char, 9).Value = cliente.id;
        cmd.Parameters.Add("@param2", SqlDbType.VarChar, 20).Value = cliente.nombre;
        cmd.Parameters.Add("@param3", SqlDbType.VarChar, 20).Value = cliente.apellido1;
        cmd.Parameters.Add("@param4", SqlDbType.VarChar, 20).Value = cliente.apellido2;
        cmd.Parameters.Add("@param5", SqlDbType.VarChar, 50).Value = cliente.email;

        // Estos son los que puse opcionales
        cmd.Parameters.Add("@param6", SqlDbType.VarChar, 20).Value = "";
        cmd.Parameters.Add("@param7", SqlDbType.Int).Value = 0;
        cmd.Parameters.Add("@param8", SqlDbType.Int).Value = 0;
        cmd.Parameters.Add("@param9", SqlDbType.Int).Value = 0;
        cmd.Parameters.Add("@param10", SqlDbType.Char, 9).Value = cedula;
        cmd.CommandType = CommandType.Text;

        try
        {
          oConexion.Open();
          cmd.ExecuteNonQuery();

          SqlCommand cmd1 = null;
          if (cliente.telefonos != null)
          {
            for (int i = 0; i < (cliente.telefonos.Count); i++)
            {
              cmd1 = new SqlCommand("update TELEFONOS_CLIENTE set " +
                  "Cedula_Cli=@param1, Telefono=@param2 " +
                  "where Cedula_Cli = @param3", oConexion);
              cmd1.Parameters.Add("@param1", SqlDbType.Char, 8).Value = cliente.id;
              cmd1.Parameters.Add("@param2", SqlDbType.Char, 8).Value = cliente.telefonos[i];
              cmd1.Parameters.Add("@param3", SqlDbType.Char, 8).Value = cliente.id;
              cmd1.CommandType = CommandType.Text;
              cmd1.ExecuteNonQuery();
            }
          }

          SqlCommand cmd2 = null;
          if (cliente.telefonos != null)
          {
            for (int i = 0; i < (cliente.telefonos.Count); i++)
            {
              cmd2 = new SqlCommand("update DIRECCIONES_CLIENTE set " +
                  "Cedula_Cli=@param1, Direccion=@param2 " +
                  "where Cedula_Cli = @param3", oConexion);
              cmd2.Parameters.Add("@param1", SqlDbType.Char, 8).Value = cliente.id;
              cmd2.Parameters.Add("@param2", SqlDbType.VarChar, 50).Value = cliente.direcciones[i];
              cmd2.Parameters.Add("@param3", SqlDbType.Char, 8).Value = cliente.id;
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

    public static List<ClienteForGet> Listar()
    {
      List<ClienteForGet> oListaUsuario = new List<ClienteForGet>();
      using (SqlConnection oConexion = new SqlConnection(Conexion.rutaConexion))
      {
        SqlCommand cmd = new SqlCommand("select C.Usuario, C.Cedula, C.Nombre, C.Apellido1, C.Apellido2," +
            "C.Correo, C.Puntos_actuales, C.Puntos_totales, C.Puntos_usados," +
            "T.Telefono, D.Direccion from CLIENTE as C, TELEFONOS_CLIENTE as T, DIRECCIONES_CLIENTE as D" +
            " where C.Cedula = T.Cedula_Cli AND C.Cedula = D.Cedula_Cli", oConexion);


        try
        {
          oConexion.Open();
          cmd.ExecuteNonQuery();
          bool firstRead = true;
          string idRef = "";
          int i = 0;

          List<string> telefonoList = new List<string>();
          List<string> direccionList = new List<string>();
          using (SqlDataReader dr = cmd.ExecuteReader())
          {

            while (dr.Read())
            {
              if (firstRead || (idRef != dr["Cedula"].ToString()))
              {
                if (!firstRead)
                {
                  oListaUsuario[i].telefonos = telefonoList;
                  oListaUsuario[i].direcciones = direccionList;
                  i++;
                  telefonoList = new List<string>();
                  direccionList = new List<string>();
                }

                idRef = dr["Cedula"].ToString();
                oListaUsuario.Add(new ClienteForGet()
                {

                  id = dr["Cedula"].ToString(),
                  usuario = dr["Usuario"].ToString(),
                  nombre = dr["Nombre"].ToString(),
                  apellido1 = dr["Apellido1"].ToString(),
                  apellido2 = dr["Apellido2"].ToString(),
                  email = dr["Correo"].ToString(),
                  total = Convert.ToInt32(dr["Puntos_totales"]),
                  utilizados = Convert.ToInt32(dr["Puntos_usados"]),
                  actuales = Convert.ToInt32(dr["Puntos_actuales"])

                });
                firstRead = false;
                direccionList.Add(dr["Direccion"].ToString());
                telefonoList.Add(dr["Telefono"].ToString());

              }
              else
              {
                if (!(direccionList.Contains(dr["Direccion"].ToString())))
                {
                  direccionList.Add(dr["Direccion"].ToString());
                }

                if (!(telefonoList.Contains(dr["Telefono"].ToString())))
                {
                  telefonoList.Add(dr["Telefono"].ToString());
                }

              }

            }



          }
          oListaUsuario[i].telefonos = telefonoList;
          oListaUsuario[i].direcciones = direccionList;
          return oListaUsuario;

        }
        catch (Exception ex)
        {
          Console.WriteLine(ex);
          return oListaUsuario;
        }
      }
    }

    public static ClienteForGet Obtener(string cedula)
    {
      ClienteForGet cliente = new ClienteForGet();
      using (SqlConnection oConexion = new SqlConnection(Conexion.rutaConexion))
      {
        SqlCommand cmd = new SqlCommand("select C.Usuario, C.Cedula, C.Nombre, C.Apellido1, C.Apellido2," +
            "C.Correo, C.Puntos_actuales, C.Puntos_totales, C.Puntos_usados," +
            "T.Telefono, D.Direccion from CLIENTE as C, TELEFONOS_CLIENTE as T, DIRECCIONES_CLIENTE as D" +
            " where C.Cedula = " + cedula + " AND C.Cedula = T.Cedula_Cli AND C.Cedula = D.Cedula_Cli", oConexion);


        try
        {
          oConexion.Open();
          cmd.ExecuteNonQuery();
          bool firstRead = true;

          List<string> telefonoList = new List<string>();
          List<string> direccionList = new List<string>();
          using (SqlDataReader dr = cmd.ExecuteReader())
          {

            while (dr.Read())
            {
              if (firstRead)
              {

                cliente = new ClienteForGet()
                {

                  id = dr["Cedula"].ToString(),
                  usuario = dr["Usuario"].ToString(),
                  nombre = dr["Nombre"].ToString(),
                  apellido1 = dr["Apellido1"].ToString(),
                  apellido2 = dr["Apellido2"].ToString(),
                  email = dr["Correo"].ToString(),
                  total = Convert.ToInt32(dr["Puntos_totales"]),
                  utilizados = Convert.ToInt32(dr["Puntos_usados"]),
                  actuales = Convert.ToInt32(dr["Puntos_actuales"])

                };
                firstRead = false;
                direccionList.Add(dr["Direccion"].ToString());
                telefonoList.Add(dr["Telefono"].ToString());

              }
              else
              {
                if (!(direccionList.Contains(dr["Direccion"].ToString())))
                {
                  direccionList.Add(dr["Direccion"].ToString());
                }

                if (!(telefonoList.Contains(dr["Telefono"].ToString())))
                {
                  telefonoList.Add(dr["Telefono"].ToString());
                }

              }

            }



          }
          cliente.telefonos = telefonoList;
          cliente.direcciones = direccionList;
          return cliente;

        }
        catch (Exception ex)
        {
          return cliente;
        }
      }
    }

    public static bool Eliminar(string cedula)
    {
      using (SqlConnection oConexion = new SqlConnection(Conexion.rutaConexion))
      {


        SqlCommand cmd1 = new SqlCommand("delete from TELEFONOS_CLIENTE where Cedula_Cli = " + cedula, oConexion);
        SqlCommand cmd2 = new SqlCommand("delete from DIRECCIONES_CLIENTE where Cedula_Cli = " + cedula, oConexion);
        //SqlCommand cmd3 = new SqlCommand("delete from TRABAJADORES_POR_CITA where ID_Cita = " +
        //    "(SELECT ID FROM CITA WHERE Cedula_cliente = "+cedula+")", oConexion);
        //SqlCommand cmd4 = new SqlCommand("delete from FACTURA where ID = " +
        //    "(SELECT ID FROM CITA WHERE Cedula_cliente = " + cedula+")", oConexion);
        //SqlCommand cmd5 = new SqlCommand("delete from PRODUCTOS_COMPRADOS where ID_Factura = " +
        //    "(SELECT ID FROM CITA WHERE Cedula_cliente = " + cedula+")", oConexion);
        //SqlCommand cmd6 = new SqlCommand("delete from CITA where Cedula_Cliente = " + cedula, oConexion); 
        SqlCommand cmd7 = new SqlCommand("delete from CLIENTE where Cedula = " + cedula, oConexion);

        try
        {
          oConexion.Open();
          cmd1.ExecuteNonQuery();
          cmd2.ExecuteNonQuery();
          //cmd3.ExecuteNonQuery();
          //cmd4.ExecuteNonQuery();
          //cmd5.ExecuteNonQuery();
          // cmd6.ExecuteNonQuery();
          // cmd7.ExecuteNonQuery();
          return true;
        }
        catch (Exception ex)
        {
          Console.WriteLine(ex);
          return false;
        }
      }
    }
  }
}
