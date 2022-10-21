using System.Data;
using System.Data.SqlClient;
using DetailTEC.Models;
namespace DetailTEC.Data;

public class ReportsData
{
    private static string PUNTOS_GASTADOS_POR_CLIENTE_QUERY =
        @"SELECT C.Nombre, C.Apellido1, C.Apellido2, C.Puntos_usados
        FROM Cliente AS C
        GROUP By C.Nombre, C.Apellido1, C.Apellido2
        ORDER by PuntosGastados DESC
        ";


    // Genera los datos para el reporte de lavados por cliente
    // Entrada:
    //      id: id del cliente
    // Salida:
    //      lavadoPorCliente: Objeto con la info del reporte
    public static DataTable reporteLavadoPorCliente(int id){
        DataTable dt = new DataTable();
        string LAVADO_POR_CLIENTE_QUERY = 
            @"SELECT Cl.Nombre, Cl.Apellido1, Cl.Apellido2, L.Nombre, COUNT(L.Nombre) as CantidadDeLavados
            FROM ((Cliente Cl JOIN CITA AS Ci on Cl.Cedula = Ci.Cedula_cliente)
            JOIN LAVADO as L on Ci.Nombre_lavado = L.Nombre)
            WHERE Cl.Cedula = @id
            GROUP BY Cl.Nombre, Cl.Apellido1, Cl.Apellido2, L.Nombre
            ORDER By CantidadDeLavados DESC";

        // using (SqlConnection oConexion = new SqlConnection(Conexion.rutaConexion));

        
        try{
            ConexionAux oConexion = new ConexionAux();
            SqlCommand cmd = new SqlCommand(LAVADO_POR_CLIENTE_QUERY, oConexion.conectar());
            
            SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection); // ExecuteReader se usa para SELECT. 
            dt.Load(dr);

            oConexion.desconectar();

            // using (SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection)){ // ExecuteReader se usa para SELECT. 
            //     while (dr.Read()){
            //         lavadoPorCliente = new LavadoPorCliente();
            //         lavadoPorCliente.nombre = dr["Cl.Nombre"].ToString();
            //         lavadoPorCliente.apellido1 = dr["Cl.Apellido1"].ToString();
            //         lavadoPorCliente.apellido2 = dr["Cl.Apellido2"].ToString();
            //         lavadoPorCliente.nombreLavado = dr["L.Nombre"].ToString();
            //         lavadoPorCliente.cantidadLavador = int.Parse(dr["CantidadDeLavados"].ToString());

            //         infoReporte.Add(lavadoPorCliente);
            //     }
            // }


        }catch (Exception ex){}
        return dt;

    }

    public static DataTable reportePuntosGastadosPorCliente(){
        DataTable dt = new DataTable();
        try{
            ConexionAux oConexion = new ConexionAux();
            SqlCommand cmd = new SqlCommand(PUNTOS_GASTADOS_POR_CLIENTE_QUERY, oConexion.conectar());
            SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection);
            dt.Load(dr);
            //     while (dr.Read()){
            //         puntosGastados = new PuntosGastados();
            //         puntosGastados.nombre = dr["C.Nombre"].ToString();
            //         puntosGastados.apellido1 = dr["C.Apellido1"].ToString();
            //         puntosGastados.apellido2 = dr["C.Apellido2"].ToString();
            //         puntosGastados.puntosGastados = int.Parse(dr["C.Puntos_usados"].ToString());

            //         infoReporte.Add(puntosGastados);
            //     }
            // }

        }catch (Exception ex){}
        return dt;
    }

}

