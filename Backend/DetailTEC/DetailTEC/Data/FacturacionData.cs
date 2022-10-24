using System.Data;
using System.Data.SqlClient;
using DetailTEC.Models;

namespace DetailTEC.Data;

public class FacturacionData
{
    // Extrae todos los valores a los que hace referencia la factura
    // y devuleve un objeto Facturacion con los datos.
    public static Facturacion generarFacturacion(int idCita){

        Factura factura = new Factura();
        factura = FacturaData.Obtener(idCita);

        Facturacion facturacion = traerDatosReferenciados(factura);
        return facturacion;

    }

    // Trae los datos a los que hace referencia la factura.
    private static Facturacion traerDatosReferenciados(Factura factura){
        Facturacion facturacion = new Facturacion(factura);

        string idCliente = factura.cedulaCliente.ToString();
        int[] idTrabajadores = factura.cedulaTrabajadores;
        int idTipoPago = factura.idTipoDePago;
        Cliente cliente = ClienteData.Obtener(idCliente);


        //Llenar factura
        facturacion.nombreCliente = cliente.nombre;
        facturacion.apellido1Cliente = cliente.apellido1;
        facturacion.apellido2Cliente = cliente.apellido2;
        facturacion.idTipoDePago = factura.idTipoDePago;

        for (int i = 0; i < idTrabajadores.Length; i++){
            TrabajadorForGet trabajador= TrabajadorData.Obtener(idTrabajadores[i].ToString());
            facturacion.trabajadores[i] = trabajador;
        }

        return facturacion;
    }
}