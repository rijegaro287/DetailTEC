

using DetailTEC.Data;
using DetailTEC.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;

namespace DetailTEC.Controllers
{
    [ApiController]
    [Route("cita")]
    //[EnableCors("AllowAllOrigins")]
    public class CitaController : ControllerBase
    {
        [HttpGet]
        [Route("get_all")]
        public List<CitaForGet> Get()
        {
            return CitaData.Listar();
        }

        [HttpGet]
        [Route("get/{id}")]
        public CitaForGet Get(string cedula)
        {
            return CitaData.Obtener(cedula);
        }

        [HttpPost]
        [Route("add")]
        public bool Post([FromBody] Cita cita)
        {
            return CitaData.Registrar(cita);
        }
        [HttpPatch]
        [Route("update/{id}")]
        public bool Put([FromBody] Cita cita)
        {
            return CitaData.Modificar(cita);
        }

        [HttpDelete]
        [Route("delete/{id}")]
        public bool Delete(string id)
        {
            return CitaData.Eliminar(id);

        }
    }
}
