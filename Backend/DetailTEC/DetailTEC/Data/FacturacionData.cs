using System.Data;
using System.Data.SqlClient;
using DetailTEC.Models;

namespace DetailTEC.Data;

public class FacturacionData
{
    private static string FACTURA_QUERY = 
    @"SELECT Ci.id, Cl.Cedula AS CedulaCliente, TpC.Cedula_trabajador as CedulaTrabajador, F.total, TP.id as IdTipoDePago
    from ((((CITA as Ci join CLIENTE as Cl on Ci.Cedula_cliente = Cl.Cedula)
    JOIN FACTURA AS F on Ci.Id = F.Id)
    JOIN TRABAJADORES_POR_CITA as TpC on Ci.ID = TpC.ID_cita)
    JOIN TIPO_DE_PAGO as TP on F.medio_pago = TP.Id)
    WHERE Ci.id =";

    public static Facturacion[] facturar(int id){
        DataTable dt = new DataTable();
        try{
            ConexionAux oConexion = new ConexionAux();
            SqlCommand cmd = new SqlCommand(FACTURA_QUERY + id, oConexion.conectar());
            SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection); 
            dt.Load(dr);
            oConexion.desconectar();
        }catch (Exception ex){}
        return procesarDatosReporteFactura(dt);
    }

    private static Facturacion[] procesarDatosReporteFactura(DataTable dt){
        Facturacion[] factura = new Facturacion[dt.Rows.Count];
        for (int i = 0; i < dt.Rows.Count; i++){
            factura[i] = new Facturacion();
            factura[i].id = int.Parse(dt.Rows[i]["id"].ToString());
            factura[i].cedulaCliente = int.Parse(dt.Rows[i]["CedulaCliente"].ToString());
            factura[i].cedulaTrabajador = int.Parse(dt.Rows[i]["CedulaTrabajador"].ToString());
            factura[i].total = int.Parse(dt.Rows[i]["total"].ToString());
            factura[i].idTipoDePago = int.Parse(dt.Rows[i]["IdTipoDePago"].ToString());
        }
        return factura;
    }
}