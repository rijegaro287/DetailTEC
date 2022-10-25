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
    [Route("update/{cedula}")]
    // Si hay passwordVieja y password, se cambia la contraseña
    // Si passwordVieja y password estan vacias, no se cambia la contraseña
    // Hay que validar que la password vieja sea correcta, si no, mandar status="error" y un mensaje para mostrarlo en el front
    public Object Put([FromBody] Trabajador trabajador, string cedula)
    {
      bool ok = TrabajadorData.Modificar(trabajador, cedula);
      if (ok)
      {
        return new
        {
          status = "ok",
          message = "Trabajador modificado correctamente"
        };
      }
      else
      {
        return new
        {
          status = "error",
          message = "No se pudo modificar el trabajador"
        };
      }
    }

    [HttpDelete]
    [Route("delete/{cedula}")]
    public Object Delete(string cedula)
    {
      bool ok = TrabajadorData.Eliminar(cedula);
      if (ok)
      {
        return new
        {
          status = "ok",
          message = "Trabajador eliminado correctamente"
        };
      }
      else
      {
        return new
        {
          status = "error",
          message = "No se pudo eliminar el trabajador"
        };
      }
    }
  }
}
