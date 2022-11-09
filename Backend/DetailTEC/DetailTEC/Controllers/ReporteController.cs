using DetailTEC.Data;
using DetailTEC.Models;
using DetailTEC.Helpers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DetailTEC.Controllers;
// Controller de los PDFs de los reportes
[ApiController]
[Route("reportes")]
public class RepoerteController : Controller
{
  [HttpGet]
  [Route("puntos")]
  // Envia el PDF del reporte de puntos
  // gastados por los clientes
  public async Task GetReportePuntos()
  {

    HandlerPDF.generarPDFPuntos();
    string filePath = "Reports/ReportePuntos.pdf";
    Response.Headers.Add("Content-Disposition", "attachment; filename=ReportePuntos.pdf");
    Response.Headers.Add("Content-Type", "application/pdf");
    await Response.SendFileAsync(filePath);
  }

  [HttpGet]
  [Route("lavados/{id}")]
  // Envia el PDF del reporte de lavados que 
  // se realizaron a un cliente
  // Entrada: id del cliente
  public async Task GetReporteLavados(int id)
  {
    HandlerPDF.generarPDFLavados(id);
    string filePath = "Reports/ReporteLavados.pdf";
    Response.Headers.Add("Content-Disposition", "attachment; filename=ReporteLavados.pdf");
    Response.Headers.Add("Content-Type", "application/pdf");
    await Response.SendFileAsync(filePath);
  }

  [HttpGet]
  [Route("planilla")]
  // Envia el PDF de la planilla con sus salarios
  // y datos
  public async Task GetReportePlantilla()
  {
    HandlerPDF.getPDFPlantilla();
    string filePath = "Reports/ReportePlantilla.pdf";
    Response.Headers.Add("Content-Disposition", "attachment; filename=ReportePlantilla.pdf");
    Response.Headers.Add("Content-Type", "application/pdf");
    await Response.SendFileAsync(filePath);

  }

  [HttpGet]
  [Route("facturacion/{id}")]
  // Entrada: id de la factura
  public async Task GetFacturacion(int id)
  {
    HandlerPDF.getPDFFacturacion(id);
    string filePath = "Reports/Factura.pdf";
    Response.Headers.Add("Content-Disposition", "attachment; filename=Factura.pdf");
    Response.Headers.Add("Content-Type", "application/pdf");
    await Response.SendFileAsync(filePath);
  }
}