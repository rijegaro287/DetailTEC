using System.Data.SqlClient;

namespace DetailTEC.Data;
// Clase que se encarga de la conexión a la base de datos
public class ConexionAux{
    private SqlConnection oConexion;
    public ConexionAux(){
        oConexion = new SqlConnection ("Data Source=DESKTOP-CODCVF6\\SQLEXPRESS;Initial Catalog=DetailTEC;Integrated Security=True");
    }

    // Abre la conexión a la base de datos
    public SqlConnection conectar(){
        try{
            oConexion.Open();
            return oConexion;
        }catch(Exception ex){
            System.Console.WriteLine("No se pudo conectar a la base de datos" + ex.Message);
            return null;
        }
    }

    // Cierra la conexión a la base de datos
    public bool desconectar(){
        try{
            oConexion.Close();
            return true;
        }catch(Exception ex){
            System.Console.WriteLine("No se pudo desconectar de la base de datos" + ex.Message);
            return false;
        }
    }
    
}
