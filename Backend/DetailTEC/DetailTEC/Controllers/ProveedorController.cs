using DetailTEC.Data;
using DetailTEC.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DetailTEC.Controllers
{
    [ApiController]
    [Route("proveedor")]
    public class ProveedorController : Controller
    {
        [HttpGet]
        [Route("get_all")]
        public List<Proveedor> Get()
        {
            return ProveedorData.Listar();
        }

        [HttpGet]
        [Route("get/{id}")]
        public Proveedor Get(string nombre)
        {
            return ProveedorData.Obtener(nombre);
        }

        [HttpPost]
        [Route("add")]
        public bool Post([FromBody] Proveedor proveedor)
        {
            return ProveedorData.Registrar(proveedor);
        }
        [HttpPatch]
        [Route("update/{id}")]
        public bool Put([FromBody] Proveedor proveedor)
        {
            return ProveedorData.Modificar(proveedor);
        }

        [HttpDelete]
        [Route("delete/{id}")]
        public bool Delete(string nombre)
        {
            return ProveedorData.Eliminar(nombre);

        }
    }
}
