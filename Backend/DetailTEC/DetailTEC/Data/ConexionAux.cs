using System.Data.SqlClient;

namespace DetailTEC.Data;
public class ConexionAux{
    private SqlConnection oConexion;
    public ConexionAux(){
        oConexion = new SqlConnection ("Data Source=DESKTOP-CODCVF6\\SQLEXPRESS;Initial Catalog=DetailTEC;Integrated Security=True");
    }

    public SqlConnection conectar(){
        try{
            oConexion.Open();
            return oConexion;
        }catch(Exception ex){
            System.Console.WriteLine("No se pudo conectar a la base de datos" + ex.Message);
            return null;
        }
    }

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
