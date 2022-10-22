

using DetailTEC.Data;
using DetailTEC.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;

namespace DetailTEC.Controllers
{
    [ApiController]
    [Route("trabajador")]
    //[EnableCors("AllowAllOrigins")]
    public class TrabajadoresPorCitaController : ControllerBase
    {

        [HttpGet]
        [Route("get_all")]
        public List<TrabajadoresPorCitaForGet> Get()
        {   
            return TrabajadoresPorCitaData.Listar();
        }

        [HttpGet]
        [Route("get/{id}")]
        public TrabajadoresPorCitaForGet Get(string cedula)
        {
            return TrabajadoresPorCitaData.Obtener(cedula);
        }

        [HttpPost]
        [Route("add")]
        public bool Post([FromBody] TrabajadoresPorCita trabajadoresporcita)
        {
            return TrabajadoresPorCitaData.Registrar(trabajadoresporcita);
        }
        [HttpPatch]
        [Route("update/{id}")]
        public bool Put([FromBody] TrabajadoresPorCita trabajadoresporcita)
        {
            return TrabajadoresPorCitaData.Modificar(trabajadoresporcita);
        }

        [HttpDelete]
        [Route("delete/{id}")]
        public bool Delete(string cedula)
        {
            return TrabajadoresPorCitaData.Eliminar(cedula);

        }
    }
}
