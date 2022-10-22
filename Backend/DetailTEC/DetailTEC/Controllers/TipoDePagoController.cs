

using DetailTEC.Data;
using DetailTEC.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;

namespace DetailTEC.Controllers
{
    [ApiController]
    [Route("tipoDePago")]
    //[EnableCors("AllowAllOrigins")]
    public class TipoDePagoController : ControllerBase
    {

        [HttpGet]
        [Route("get_all")]
        public List<TipoDePagoForGet> Get()
        {   
            return TipoDePagoData.Listar();
        }

        [HttpGet]
        [Route("get/{id}")]
        public TipoDePagoForGet Get(string cedula)
        {
            return TipoDePagoData.Obtener(cedula);
        }

        [HttpPost]
        [Route("add")]
        public bool Post([FromBody] TipoDePago tipoDePago)
        {
            return TipoDePagoData.Registrar(tipoDePago);
        }
        [HttpPatch]
        [Route("update/{id}")]
        public bool Put([FromBody] TipoDePago tipoDePago)
        {
            return TipoDePagoData.Modificar(tipoDePago);
        }

        [HttpDelete]
        [Route("delete/{id}")]
        public bool Delete(string cedula)
        {
            return TipoDePagoData.Eliminar(cedula);

        }
    }
}
