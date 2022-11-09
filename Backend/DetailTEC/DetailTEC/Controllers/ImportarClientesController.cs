using DetailTEC.Data;
using Microsoft.AspNetCore.Mvc;
using DetailTEC.Helpers;
namespace DetailTEC.Controllers;

// Controller de la importación de clientes a
// la base de datos por medio de un archivo excel
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