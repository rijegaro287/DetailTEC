using IronPdf;
using DetailTEC.Models;
using DetailTEC.Data;
namespace DetailTEC.Helpers;


public class HandlerPDF{
    private static string TITULO_REPORTE_PLANTILLA = "Reporte de plantilla";
    private static string TITULO_REPORTE_PUNTOS = "Reporte de puntos gastados";
    private static string TITULO_REPORTE_LAVADOS = "Reporte de lavados de cliente";
    private static string TITULO_FACTURA = "Factura #";


    private static void generarPDF(string text, string filename)
    {
        //PDF render
        var Renderer = new ChromePdfRenderer();
        using var PDF = Renderer.RenderHtmlAsPdf(text);

        PDF.SaveAs($"Reports/{filename}");
    }

    // Genera un PDF de la factura
    // Entrada:
    //     int idCita: id de la cita a la que se le generará la factura.
    public static void getPDFFacturacion(int idCita){
        Facturacion facturacion = FacturacionData.generarFacturacion(idCita);
        string facturacionHTML = montarCuerpoFacturacion(facturacion);
        generarPDF(facturacionHTML, "Factura.pdf");
    }

    //Crea un PDF con la plantilla de la empresa
    public static void getPDFPlantilla(){
        Plantilla[] plantilla = ReportsData.reportePlantilla();
        string reporteHTML = montarCuerpoReportePlantilla(plantilla);
        generarPDF(reporteHTML, "ReportePlantilla.pdf");
    }

    //Crea un PDF con los puntos gastados por los clientes
    public static void generarPDFPuntos(){
        PuntosGastados[] puntos = ReportsData.reportePuntosGastadosPorClientes();
        string reporteHTML = montarCuerpoReportePuntos(puntos);
        generarPDF(reporteHTML, "ReportePuntos.pdf");
    }

    public static void generarPDFLavados(int id){
        LavadoPorCliente[] lavados = ReportsData.reporteLavadoPorCliente(id);
        string reporteHTML = montarCuerpoReporteLavados(lavados);
        generarPDF(reporteHTML, "ReporteLavados.pdf");
    }
    // Crea un string con el cuerpo del PDF de la factura.
    // El string es un HTML.
    // Entrada:
    //     Facturacion facturacion: objeto con los datos de la factura.
    private static string montarCuerpoFacturacion(Facturacion facturacion){
        var facturaHTML = @"
            <html>
                <head>
                    <style>
                        table, th, td {
                            border: 1px solid black;
                            border-collapse: collapse;
                        }
                        th, td {
                            padding: 5px;
                            text-align: left;
                        }
                    </style>
                </head>
                    <h1><center>" + TITULO_FACTURA + facturacion.id + @"</center></h1>
        ";

        var encabezado= @"
            <p>Fecha de emision: {date}</p>
            <p><b>Cliente: " + facturacion.nombreCliente+" "+facturacion.apellido1Cliente+" "+ facturacion.apellido2Cliente + @"</b></p>
            <p>Servicio ofrecido: " + facturacion.nombreDeLavado + @"</p>
            <p>Fecha de atencion: " + facturacion.fecha+ @"</p>
            <p>A las: " + facturacion.hora + @"</p>
            <p>Tipo de pago: " + facturacion.idTipoDePago + @"</p>
            <p>Precio final: " + facturacion.total + @"</p>
            <p>Atendido por :</p>
            ";

        facturaHTML += encabezado;

        foreach  (TrabajadorForGet trabajador in facturacion.trabajadores){ 
            var datosTrabajadores = 
                string.Join("\n",
                    @"<ul>
                        <li>
                            <div>" +
                                "<p>Nombre de empleado: "+trabajador.nombre+" "+trabajador.apellido1+" "+trabajador.apellido2+@"</p>" +
                            "</div>" +
                        "</li>" +
                    "</ul>")
                + @"
            
            ";
            facturaHTML += datosTrabajadores;
        }
        return facturaHTML;
    }

    //Crea un string con el cuerpo del PDF del reporte 
    // de plantilla. El string es un HTML.
    // Entrada:
    //      - Plantilla[] plantilla: arreglo de objetos Plantilla
    private static string montarCuerpoReportePlantilla(Plantilla[] plantilla){
        var plantillaHTML = @"
            <html>
                <head>
                    <style>
                        table, th, td {
                            border: 1px solid black;
                            border-collapse: collapse;
                        }
                        th, td {
                            padding: 5px;
                            text-align: left;
                        }
                    </style>
                </head>
                    <h1><center>" + TITULO_REPORTE_PLANTILLA + @"</center></h1>
        ";

        //Recorre los empleados y crea un string con los datos de cada uno.
        int ultimoEmplerado = -1;
        foreach  (Plantilla fila in plantilla){ 
            if (fila.cedula != ultimoEmplerado){ // Si el empleado es diferente al anterior, se crea un nuevo encabezado
                var encabezadoEmpleado = 
                    @" <p><b>Trabajador: " + 
                        fila.nombreTrabajador +" "+
                        fila.apellido1Trabajador+" "+
                        fila.apellido2Trabajador + @"</b></p>
                    <p><b>Tipo de pago: " + fila.tipoDePago + @"</b></p>
                    
                    ";
                plantillaHTML += encabezadoEmpleado;
                ultimoEmplerado = fila.cedula;
            }
            // Los datos de cada lavado por empleado
            var datosEmpleado = 
                string.Join("\n",
                    @"<ul>
                        <li>
                            <div>" +
                                "<p>Nombre De Lavado: "+fila.nombreDeLavado+@"</p>" +
                                "<p>Cantidad De Lavados: "+fila.cantidadLavados+@"</p>" +
                                "<p>Monto Ganado Por Lavados: "+fila.montoGanadoPorLavados+@"</p>" +
                            "</div>" +
                        "</li>" +
                    "</ul>")
                + @"
            
            ";
            plantillaHTML += datosEmpleado;
        }
        return plantillaHTML;
    }

    //Crea un string con el cuerpo del PDF del reporte para puntos gastados
    // por clientes. El string es un HTML.
    // Entrada:
    //      - PuntosGastados[] puntos: arreglo de objetos PuntosGastados
    private static string montarCuerpoReportePuntos(PuntosGastados[] puntosGastados){
        var puntosGastadosHTML = @"
            <html>
                <head>
                    <style>
                        table, th, td {
                            border: 1px solid black;
                            border-collapse: collapse;
                        }
                        th, td {
                            padding: 5px;
                            text-align: left;
                        }
                    </style>
                </head>
                    <h1><center>"+TITULO_REPORTE_PUNTOS+@"</center></h1>
        ";

        //Recorre los empleados y crea un string con los datos de cada uno.
        foreach  (PuntosGastados fila in puntosGastados){ 
            var datosPuntosGastadosPorCliente = 
                string.Join("\n",
                    @"<ul>
                        <li>
                            <div>" +
                                "<p>Nombre: "+fila.nombre+" "+fila.apellido1+" "+fila.apellido2+@"</p>" +
                                "<p>Puntos gastados: "+fila.puntosGastados+@"</p>" +
                            "</div>" +
                        "</li>" +
                    "</ul>")
                + @"
            
            ";
            puntosGastadosHTML += datosPuntosGastadosPorCliente;
        }
        return puntosGastadosHTML;
    }

    private static string montarCuerpoReporteLavados(LavadoPorCliente[] lavadoPorClientes){
        var lavadoPorClientesHTML = @"
            <html>
                <head>
                    <style>
                        table, th, td {
                            border: 1px solid black;
                            border-collapse: collapse;
                        }
                        th, td {
                            padding: 5px;
                            text-align: left;
                        }
                    </style>
                </head>
                    <h1><center>"+TITULO_REPORTE_LAVADOS+@"</center></h1>
        ";
        if(lavadoPorClientes.Length > 0){
            lavadoPorClientesHTML += @"
                <p><b>Cliente: " + lavadoPorClientes[0].nombre+" "+lavadoPorClientes[0].apellido1+" "+lavadoPorClientes[0].apellido2 + @"</b></p>
            ";
        }

        //Recorre los empleados y crea un string con los datos de cada uno.
        foreach  (LavadoPorCliente fila in lavadoPorClientes){ 
            var datosLavados = 
                string.Join("\n",
                    @"<ul>
                        <li>
                            <div>" +
                                "<p>Tipo de Lavado: "+fila.nombreDeLavado+@"</p>" +
                                "<p>Cantidad de lavados: "+fila.cantidadLavados+@"</p>" +
                            "</div>" +
                        "</li>" +
                    "</ul>")
                + @"
            
            ";
            lavadoPorClientesHTML += datosLavados;
        }
        return lavadoPorClientesHTML;
    }
}
