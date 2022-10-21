using DetailTEC.Data;
using DetailTEC.Models;
using DetailTEC.Helpers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DetailTEC.Controllers;

[ApiController]
[Route("cliente")]
public class RepoerteController : Controller{
    [HttpGet]
    [Route("reporte/puntos")]
    public async Task GetReportePuntos(){   

        HandlerPDF.generarPDFPuntos();
        string filePath = "Reports/ReportePuntos.pdf";
        Response.Headers.Add("Content-Disposition", "attachment; filename=ReportePuntos.pdf");
        Response.Headers.Add("Content-Type", "application/pdf");
        await Response.SendFileAsync(filePath);
    }

    [HttpGet]
    [Route("reporte/lavados/{id}")]
    public async Task GetReporteLavados(int id)
    {   
        HandlerPDF.generarPDFLavados(id);
        string filePath = "Reports/ReporteLavados.pdf";
        Response.Headers.Add("Content-Disposition", "attachment; filename=ReporteLavados.pdf");
        Response.Headers.Add("Content-Type", "application/pdf");
        await Response.SendFileAsync(filePath);
    }

    [HttpGet]
    [Route("reporte/plantilla")]
    public async Task GetReportePlantilla(){   
        HandlerPDF.getPDFPlantilla();
        string filePath = "Reports/ReportePlantilla.pdf";
        Response.Headers.Add("Content-Disposition", "attachment; filename=ReportePlantilla.pdf");
        Response.Headers.Add("Content-Type", "application/pdf");
        await Response.SendFileAsync(filePath);

    }
}

       