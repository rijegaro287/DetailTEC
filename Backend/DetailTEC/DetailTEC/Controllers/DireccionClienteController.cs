

using DetailTEC.Data;
using DetailTEC.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;

namespace DetailTEC.Controllers
{
    [ApiController]
    [Route("direccionesCliente")]
    //[EnableCors("AllowAllOrigins")]
    public class DireccionClienteController : ControllerBase
    {

        [HttpGet]
        [Route("get_all")]
        public List<DireccionClienteForGet> Get()
        {   
            return DireccionClienteData.Listar();
        }

        [HttpGet]
        [Route("get/{id}")]
        public DireccionClienteForGet Get(string cedula)
        {
            return DireccionClienteData.Obtener(cedula);
        }

        [HttpPost]
        [Route("add")]
        public bool Post([FromBody] DireccionCliente direccionesCliente)
        {
            return DireccionClienteData.Registrar(direccionesCliente);
        }
        [HttpPatch]
        [Route("update/{id}")]
        public bool Put([FromBody] DireccionCliente direccionesCliente)
        {
            return DireccionClienteData.Modificar(direccionesCliente);
        }

        [HttpDelete]
        [Route("delete/{id}")]
        public bool Delete(string cedula)
        {
            return DireccionClienteData.Eliminar(cedula);

        }
    }
}
