using DetailTEC.Data;
using DetailTEC.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DetailTEC.Controllers
{
    [ApiController]
    [Route("cliente")]
    public class ClienteController : Controller
    {
        [HttpGet]
        [Route("get_all")]
        public List<ClienteForGet> Get()
        {
            return ClienteData.Listar();
        }

        [HttpGet]
        [Route("get/{id}")]
        public ClienteForGet Get(string cedula)
        {
            return ClienteData.Obtener(cedula);
        }

        [HttpPost]
        [Route("add")]
        public bool Post([FromBody] Cliente cliente)
        {
            return ClienteData.Registrar(cliente);
        }
        [HttpPatch]
        [Route("update/{id}")]
        public bool Put([FromBody] Cliente cliente)
        {
            return ClienteData.Modificar(cliente);
        }

        [HttpDelete]
        [Route("delete/{id}")]
        public bool Delete(string cedula)
        {
            return ClienteData.Eliminar(cedula);

        }
    }
}
