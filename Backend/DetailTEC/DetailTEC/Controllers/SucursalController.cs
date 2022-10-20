using DetailTEC.Data;
using DetailTEC.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DetailTEC.Controllers
{
    [ApiController]
    [Route("sucursal")]
    public class SucursalController : ControllerBase
    {
        [HttpGet]
        [Route("get_all")]
        public List<Sucursal> Get()
        {
            return SucursalData.Listar();
        }

        [HttpGet]
        [Route("get/{id}")]
        public Sucursal Get(string nombre)
        {
            return SucursalData.Obtener(nombre);
        }

        [HttpPost]
        [Route("add")]
        public bool Post([FromBody] Sucursal sucursal)
        {
            return SucursalData.Registrar(sucursal);
        }
        [HttpPatch]
        [Route("update/{id}")]
        public bool Put([FromBody] Sucursal sucursal)
        {
            return SucursalData.Modificar(sucursal);
        }

        [HttpDelete]
        [Route("delete/{id}")]
        public bool Delete(string nombre)
        {
            return SucursalData.Eliminar(nombre);

        }
    }
}
