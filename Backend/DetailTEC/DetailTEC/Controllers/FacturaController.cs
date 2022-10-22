

using DetailTEC.Data;
using DetailTEC.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;

namespace DetailTEC.Controllers
{
    [ApiController]
    [Route("factura")]
    //[EnableCors("AllowAllOrigins")]
    public class FacturaController : ControllerBase
    {

        [HttpGet]
        [Route("get_all")]
        public List<FacturaForGet> Get()
        {   
            return FacturaData.Listar();
        }

        [HttpGet]
        [Route("get/{id}")]
        public FacturaForGet Get(string cedula)
        {
            return FacturaData.Obtener(cedula);
        }

        [HttpPost]
        [Route("add")]
        public bool Post([FromBody] Factura factura)
        {
            return FacturaData.Registrar(factura);
        }
        [HttpPatch]
        [Route("update/{id}")]
        public bool Put([FromBody] Factura factura)
        {
            return FacturaData.Modificar(factura);
        }

        [HttpDelete]
        [Route("delete/{id}")]
        public bool Delete(string cedula)
        {
            return FacturaData.Eliminar(cedula);

        }
    }
}
