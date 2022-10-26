using DetailTEC.Models;
using System.Data.SqlClient;
using System.Data;

namespace DetailTEC.Data;

public class FacturaData{
    private static string FACTURA_QUERY =
        @"select F.ID, F.medio_pago, F.total, Cl.Cedula as Cedula_cliente, TpC.Cedula_trabajador, L.Nombre as Nombre_lavado, Ci.Fecha, Ci.Hora
        from ((((Cita as Ci join Factura as F on Ci.ID = F.ID)
        Join TRABAJADORES_POR_CITA TpC ON Ci.ID = TpC.ID_cita)
        join Cliente as Cl on Cl.Cedula = Ci.Cedula_cliente)
        join Lavado AS L on Ci.ID_Lavado = L.ID)
        where F.ID = ";

    // Extrae la factura de la base de datos.
    // Entrada: id de la cita
    public static Factura Obtener(int idCita){
        DataTable dt = new DataTable();
        try{
            ConexionAux oConexion = new ConexionAux();
            SqlCommand cmd = new SqlCommand(FACTURA_QUERY + idCita, oConexion.conectar());
            SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection); // ExecuteReader se usa para SELECT. 
            dt.Load(dr);
            oConexion.desconectar();
        }catch (Exception){}

        return procesarFactura(dt);
    }

    // Asigna los datos de la consulta a un objeto Factura.
    // Entrada: tabla con los datos de la factura
    private static Factura procesarFactura(DataTable dt){
        if(dt.Rows.Count == 0){
            return null;
        }
        
        Factura factura = new Factura();
        factura.id = int.Parse(dt.Rows[0]["ID"].ToString());
        factura.cedulaCliente = int.Parse(dt.Rows[0]["Cedula_cliente"].ToString());
        factura.idTipoDePago = int.Parse(dt.Rows[0]["medio_pago"].ToString());
        factura.total = int.Parse(dt.Rows[0]["total"].ToString());
        factura.nombreDeLavado = dt.Rows[0]["nombre_lavado"].ToString();
        factura.fecha = dt.Rows[0]["fecha"].ToString();
        factura.hora = dt.Rows[0]["hora"].ToString();

        for(int i = 0; i < dt.Rows.Count; i++){
            factura.cedulaTrabajadores[i] = int.Parse(dt.Rows[i]["Cedula_trabajador"].ToString());
        }
        return factura;

    }
}
