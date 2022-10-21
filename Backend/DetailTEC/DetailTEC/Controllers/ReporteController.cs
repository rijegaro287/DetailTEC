using DetailTEC.Data;
using DetailTEC.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DetailTEC.Controllers;

[ApiController]
[Route("cliente")]
public class RepoerteController : Controller{
    [HttpGet]
    [Route("reporte/puntos")]
    public PuntosGastados[] GetReportePuntos()
    {   
        return ReportsData.reportePuntosGastadosPorClientes();
    }

    [HttpGet]
    [Route("reporte/lavados/{id}")]
    public LavadoPorCliente[] GetReporteLavados(int id)
    {   
        return ReportsData.reporteLavadoPorCliente(id);
    }

    [HttpGet]
    [Route("reporte/plantilla/")]
    public Plantilla[] GetReportePlantilla()
    {   
        return ReportsData.reportePlantilla();
    }
}

       