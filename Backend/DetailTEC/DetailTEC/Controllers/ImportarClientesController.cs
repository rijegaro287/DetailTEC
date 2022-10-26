using DetailTEC.Data;
using Microsoft.AspNetCore.Mvc;
using DetailTEC.Helpers;
namespace DetailTEC.Controllers;

[ApiController]
[Route("cliente")]
public class ImportarClientesController : Controller{
    [HttpGet]
    [Route("importar_clientes")]
    public void GetImportarClientes()
    {   
        ImportClients.insertClients();
    }
}