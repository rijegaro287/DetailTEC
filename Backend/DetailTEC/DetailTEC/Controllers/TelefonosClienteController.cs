

using DetailTEC.Data;
using DetailTEC.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;

namespace DetailTEC.Controllers
{
    [ApiController]
    [Route("telefonoCliente")]
    //[EnableCors("AllowAllOrigins")]
    public class TelefonoClienteController : ControllerBase
    {

        [HttpGet]
        [Route("get_all")]
        public List<TelefonoClienteForGet> Get()
        {   
            return TelefonoClienteData.Listar();
        }

        [HttpGet]
        [Route("get/{id}")]
        public TelefonoClienteForGet Get(string cedula)
        {
            return TelefonoClienteData.Obtener(cedula);
        }

        [HttpPost]
        [Route("add")]
        public bool Post([FromBody] TelefonoCliente telefonoCliente)
        {
            return TelefonoClienteData.Registrar(telefonoCliente);
        }
        [HttpPatch]
        [Route("update/{id}")]
        public bool Put([FromBody] TelefonoCliente telefonoCliente)
        {
            return TelefonoClienteData.Modificar(telefonoCliente);
        }

        [HttpDelete]
        [Route("delete/{id}")]
        public bool Delete(string cedula)
        {
            return TelefonoClienteData.Eliminar(cedula);

        }
    }
}
