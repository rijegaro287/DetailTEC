using DetailTEC.Data;
using DetailTEC.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using DetailTEC.Helpers;

namespace DetailTEC.Controllers;

[ApiController]
[Route("cliente")]
// Envia los PDFs de las facturas a los clientes
public class FacturacionController : Controller{
    [HttpGet]
    [Route("facturacion/{id}")]
    
    // Entrada: id de la factura
    public async Task GetFacturacion(int id){
        HandlerPDF.getPDFFacturacion(id);
        string filePath = "Reports/Factura.pdf";
        Response.Headers.Add("Content-Disposition", "attachment; filename=Factura.pdf");
        Response.Headers.Add("Content-Type", "application/pdf");
        await Response.SendFileAsync(filePath);
    }


}