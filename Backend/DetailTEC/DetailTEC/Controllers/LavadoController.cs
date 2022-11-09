using DetailTEC.Data;
using DetailTEC.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DetailTEC.Controllers
{
  [ApiController]
  [Route("lavado")]

    //  controlador para lavado: get all, get one, post, put, delete
    public class LavadoController : Controller
  {
    [HttpGet]
    [Route("get_all")]
    public Object Get()
    {
      try
      {
        List<LavadoForGet> lavados = LavadoData.Listar();
        return new
        {
          status = "ok",
          washingTypes = lavados
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
    [Route("get/{id}")]
    public Object Get(string id)
    {
      try
      {
        LavadoForGet cita = LavadoData.Obtener(id);
        return new
        {
          status = "ok",
          washingType = cita
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
    public Object Post([FromBody] Lavado lavado)
    {
      bool ok = LavadoData.Registrar(lavado);
      if (ok)
      {
        return new
        {
          status = "ok",
          message = "Lavado registrado correctamente"
        };
      }
      else
      {
        return new
        {
          status = "error",
          message = "No se pudo registrar el lavado"
        };
      }
    }

    [HttpPatch]
    [Route("update/{id}")]
    public Object Put([FromBody] Lavado lavado, string id)
    {
      bool ok = LavadoData.Modificar(lavado, id);
      if (ok)
      {
        return new
        {
          status = "ok",
          message = "Lavado modificado correctamente"
        };
      }
      else
      {
        return new
        {
          status = "error",
          message = "No se pudo modificar el lavado"
        };
      }
    }

    [HttpDelete]
    [Route("delete/{id}")]
    public Object Delete(string id)
    {
      bool ok = LavadoData.Eliminar(id);
      if (ok)
      {
        return new
        {
          status = "ok",
          message = "Lavado eliminado correctamente"
        };
      }
      else
      {
        return new
        {
          status = "error",
          message = "No se pudo eliminar el lavado"
        };
      }

    }
  }
}
