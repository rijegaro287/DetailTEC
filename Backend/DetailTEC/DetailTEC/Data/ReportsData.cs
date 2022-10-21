using System.Data;
using System.Data.SqlClient;
using DetailTEC.Models;
namespace DetailTEC.Data;

public class ReportsData
{
    private static string PUNTOS_GASTADOS_POR_CLIENTE_QUERY =
        @"select C.Nombre, C.Apellido1, C.Apellido2, C.Puntos_usados
        from Cliente as C
        order by Puntos_usados DESC
        ";
    
    private static string PLANTILLA_QUERY =
        @"SELECT T.Cedula, T.NombreT, T.Apellido1, T.Tipo_pago, T.Apellido2, L.Nombre, COUNT(L.Nombre) as CantidadDeLavados, SUM(L.Comision_trabajador) MontoGanadoPorLavados
        FROM (((Cita AS C JOIN LAVADO AS L ON C.Nombre_lavado=L.Nombre)
        JOIN TRABAJADORES_POR_CITA AS TpC ON Tpc.ID_Cita=C.ID)
        JOIN TRABAJADOR AS T ON Tpc.Cedula_Trabajador=T.Cedula)
        GROUP BY T.Cedula, T.NombreT, T.Apellido1, T.Apellido2, L.Nombre, T.Tipo_pago
        Order by T.Cedula";

    
    // ----------------- Plantilla -----------------


    // Extrae el nombre completo de los trabajadores y cuanto
    // dinero ha ganado por la cantidad de lavados.
    // de la base de datos.
    // Salida:
    //      Plantilla[]: Lista de objetos Plantilla
    public static Plantilla[] reportePlantilla(){
        DataTable dt = new DataTable();
        try{
            ConexionAux oConexion = new ConexionAux();
            SqlCommand cmd = new SqlCommand(PLANTILLA_QUERY, oConexion.conectar());
            SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection); // ExecuteReader se usa para SELECT. 
            dt.Load(dr);
            oConexion.desconectar();
        }catch (Exception){}
        return procesarDatosReportePlantilla(dt);
    }

    // Procesa los datos de la consulta de reportePlantilla.
    // Pasa los datos de una DataTable a un arreglo de objetos Plantilla[].
    private static Plantilla[] procesarDatosReportePlantilla(DataTable dt){
        Plantilla[] plantilla = new Plantilla[dt.Rows.Count];
        for (int i = 0; i < dt.Rows.Count; i++){
            plantilla[i] = new Plantilla();
            plantilla[i].cedula = int.Parse(dt.Rows[i]["Cedula"].ToString());
            plantilla[i].nombreTrabajador = dt.Rows[i]["NombreT"].ToString();
            plantilla[i].apellido1Trabajador = dt.Rows[i]["Apellido1"].ToString();
            plantilla[i].apellido2Trabajador = dt.Rows[i]["Apellido2"].ToString();
            plantilla[i].tipoDePago =dt.Rows[i]["Tipo_pago"].ToString();
            plantilla[i].nombreDeLavado = dt.Rows[i]["Nombre"].ToString();
            plantilla[i].cantidadLavados = int.Parse(dt.Rows[i]["CantidadDeLavados"].ToString());
            plantilla[i].montoGanadoPorLavados = int.Parse(dt.Rows[i]["MontoGanadoPorLavados"].ToString());
        }
        return plantilla;
        
    }





    // ----------------- Cantidad de lavados de un cliente -----------------


    // Extrae el nombre completo y la cantidad de lavados que ha comprado, 
    // de la base de datos.
    // Entrada:
    //      id: id del cliente
    // Salida:
    //      lavadoPorCliente: Lista de objetos LavadoPorCliente
    public static  LavadoPorCliente[] reporteLavadoPorCliente(int id){
        DataTable dt = new DataTable();
        string LAVADO_POR_CLIENTE_QUERY = 
            @"SELECT Cl.Nombre, Cl.Apellido1, Cl.Apellido2, L.Nombre, COUNT(L.Nombre) as CantidadDeLavados
            FROM ((Cliente Cl JOIN CITA AS Ci on Cl.Cedula = Ci.Cedula_cliente)
            JOIN LAVADO as L on Ci.Nombre_lavado = L.Nombre)
            WHERE Cl.Cedula = " + id + @"
            GROUP BY Cl.Nombre, Cl.Apellido1, Cl.Apellido2, L.Nombre
            ORDER By CantidadDeLavados DESC";
        try{
            ConexionAux oConexion = new ConexionAux();
            SqlCommand cmd = new SqlCommand(LAVADO_POR_CLIENTE_QUERY, oConexion.conectar());
            SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection); // ExecuteReader se usa para SELECT. 
            dt.Load(dr);
            oConexion.desconectar();
        }catch (Exception){}
        return procesarDatosReporteLavados(dt);
    }

    
    // Procesa los datos de la consulta de reporteLavadoPorCliente.
    // Pasa los datos de una DataTable a un arreglo de objetos LavadoPorCliente.
    private static LavadoPorCliente[] procesarDatosReporteLavados(DataTable dt){
        LavadoPorCliente[] lavadoPorCliente = new LavadoPorCliente[dt.Rows.Count];
        for (int i = 0; i < dt.Rows.Count; i++){
            lavadoPorCliente[i] = new LavadoPorCliente();
            lavadoPorCliente[i].nombre = dt.Rows[i]["Nombre"].ToString();
            lavadoPorCliente[i].apellido1 = dt.Rows[i]["Apellido1"].ToString();
            lavadoPorCliente[i].apellido2 = dt.Rows[i]["Apellido2"].ToString();
            lavadoPorCliente[i].nombreDeLavado = dt.Rows[i]["Nombre"].ToString();
            lavadoPorCliente[i].cantidadLavados = int.Parse(dt.Rows[i]["CantidadDeLavados"].ToString());
        }
        return lavadoPorCliente;
    }

    // ----------------- Puntos gastados por cliente -----------------

    // Extrae una lista de los clientes, y la cantidad de puntos que han gastado, 
    // de la base de datos.
    // Salida:
    //      puntosGastados: Lista de objetos PuntosGastados
    public static PuntosGastados[] reportePuntosGastadosPorClientes(){
        DataTable dt = new DataTable();
        try{
            ConexionAux oConexion = new ConexionAux();
            SqlCommand cmd = new SqlCommand(PUNTOS_GASTADOS_POR_CLIENTE_QUERY, oConexion.conectar());
            SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection);
            dt.Load(dr);
            oConexion.desconectar();
        }catch (Exception ex){}
        return procesarDatosReportePuntos(dt);
    }

    // Procesa los datos de la consulta de reportePuntosGastadosPorClientes.
    // Pasa los datos de una DataTable a un arreglo de objetos PuntosGastados.
    private static PuntosGastados[] procesarDatosReportePuntos(DataTable dt){
        PuntosGastados[] puntosGastados = new PuntosGastados[dt.Rows.Count];
        for (int i = 0; i < dt.Rows.Count; i++){
            puntosGastados[i] = new PuntosGastados();
            puntosGastados[i].nombre = dt.Rows[i]["Nombre"].ToString();
            puntosGastados[i].apellido1 = dt.Rows[i]["Apellido1"].ToString();
            puntosGastados[i].apellido2 = dt.Rows[i]["Apellido2"].ToString();
            puntosGastados[i].puntosGastados = int.Parse(dt.Rows[i]["Puntos_usados"].ToString());
        }
        return puntosGastados;
    }

}

