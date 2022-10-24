using DetailTEC.Data;
using DetailTEC.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DetailTEC.Controllers
{
    [ApiController]
    [Route("lavado")]
    public class LavadoController : Controller
    {
        [HttpGet]
        [Route("get_all")]
        public List<LavadoForGet> Get()
        {
            return LavadoData.Listar();
        }

        [HttpGet]
        [Route("get/{id}")]
        public LavadoForGet Get(string nombre)
        {
            return LavadoData.Obtener(nombre);
        }

        [HttpPost]
        [Route("add")]
        public bool Post([FromBody] Lavado lavado)
        {
            return LavadoData.Registrar(lavado);
        }
        [HttpPatch]
        [Route("update/{id}")]
        public bool Put([FromBody] Lavado lavado)
        {
            return LavadoData.Modificar(lavado);
        }

        [HttpDelete]
        [Route("delete/{id}")]
        public bool Delete(string nombre)
        {
            return LavadoData.Eliminar(nombre);

        }
    }
}
