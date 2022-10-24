using DetailTEC.Data;
using DetailTEC.Models;
using Microsoft.AspNetCore.Mvc;

namespace DetailTEC.Controllers
{
  [ApiController]
  [Route("trabajador")]
  public class TrabajadorController : ControllerBase
  {
    [HttpGet]
    [Route("get_all")]
    public Object Get()
    {
      try
      {
        List<TrabajadorForGet> trabajadores = TrabajadorData.Listar();
        return new
        {
          status = "ok",
          message = "", // Pueden no ponerlo si no hay mensaje, es más para los errores
          employees = trabajadores
        };
      }
      catch (System.Exception err)
      {
        return new
        {
          status = "error",
          message = err.Message // xd
        };
      }
    }

    [HttpGet]
    [Route("get/{id}")]
    public TrabajadorForGet Get(string cedula)
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
