

using DetailTEC.Data;
using DetailTEC.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;

namespace DetailTEC.Controllers
{
    [ApiController]
    [Route("trabajador")]
    //[EnableCors("AllowAllOrigins")]
    public class TrabajadorController : ControllerBase
    {

        [HttpGet]
        [Route("get_all")]
        public List<Trabajador> Get()
        {   
            return TrabajadorData.Listar();
        }

        [HttpGet]
        [Route("get/{id}")]
        public Trabajador Get(string cedula)
        {
            return TrabajadorData.Obtener(cedula);
        }

        [HttpPost]
        [Route("add")]
        public bool Post([FromBody] Trabajador trabajador)
        {
            return TrabajadorData.Registrar(trabajador);
        }
        [HttpPatch]
        [Route("update/{id}")]
        public bool Put([FromBody] Trabajador trabajador)
        {
            return TrabajadorData.Modificar(trabajador);
        }

        [HttpDelete]
        [Route("delete/{id}")]
        public bool Delete(string cedula)
        {
            return TrabajadorData.Eliminar(cedula);

        }
    }
}
