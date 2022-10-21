using DetailTEC.Data;
using DetailTEC.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DetailTEC.Controllers;

[ApiController]
[Route("cliente")]
public class FacturacionController : Controller{
    [HttpGet]
    [Route("facturacion/{id}")]
    public Facturacion[] GetFacturacion(int id)
    {   
        return FacturacionData.facturar(id);
    }
}