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
          employees = trabajadores
        };
      }
      catch (System.Exception err)
      {
        return new
        {
          status = "error",
          message = err.Message
        };
      }
    }

    [HttpGet]
    [Route("get/{cedula}")]
    public Object Get(string cedula)
    {
      try
      {
        TrabajadorForGet trabajador = TrabajadorData.Obtener(cedula);
        return new
        {
          status = "ok",
          employee = trabajador
        };
      }
      catch (System.Exception err)
      {
        return new
        {
          status = "error",
          message = err.Message
        };
      }
    }

    [HttpPost]
    [Route("add")]
    public Object Post([FromBody] Trabajador trabajador)
    {
      Console.WriteLine(trabajador);
      bool ok = TrabajadorData.Registrar(trabajador);
      if (ok)
      {
        return new
        {
          status = "ok",
          message = "Trabajador registrado correctamente"
        };
      }
      else
      {
        return new
        {
          status = "error",
          message = "No se pudo registrar el trabajador"
        };
      }
    }

    [HttpPatch]
    [Route("update/{id}")]
    public bool Put([FromBody] Trabajador trabajador)
    {
      return TrabajadorData.Modificar(trabajador);
    }

    [HttpDelete]
    [Route("delete/{cedula}")]
    public bool Delete(string cedula)
    {
      return TrabajadorData.Eliminar(cedula);

    }
  }
}
