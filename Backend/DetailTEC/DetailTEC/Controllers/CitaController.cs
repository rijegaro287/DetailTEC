

using DetailTEC.Data;
using DetailTEC.Models;
using Microsoft.AspNetCore.Mvc;

namespace DetailTEC.Controllers
{
  [ApiController]
  [Route("cita")]
  public class CitaController : ControllerBase
  {
    [HttpGet]
    [Route("get_all")]
    public Object Get()
    {
      try
      {
        List<CitaForGet> citas = CitaData.Listar();
        return new
        {
          status = "ok",
          appointments = citas
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
    [Route("facturas")]
    public Object Facturas()
    {
      try
      {
        List<CitaForGet> citas = CitaData.Facturas();
        return new
        {
          status = "ok",
          appointments = citas
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
        CitaForGet cita = CitaData.Obtener(id);
        return new
        {
          status = "ok",
          appointment = cita
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
    public Object Post([FromBody] Cita cita)
    {
      bool ok = CitaData.Registrar(cita);
      if (ok)
      {
        return new
        {
          status = "ok",
          message = "Cita registrada correctamente"
        };
      }
      else
      {
        return new
        {
          status = "error",
          message = "No se pudo registrar la cita"
        };
      }
    }
    [HttpPatch]
    [Route("update/{id}")]
    public Object Put([FromBody] Cita cita, string id)
    {
      bool ok = CitaData.Modificar(cita, id);
      if (ok)
      {
        return new
        {
          status = "ok",
          message = "Cita modificada correctamente"
        };
      }
      else
      {
        return new
        {
          status = "error",
          message = "No se pudo modificar la cita"
        };
      }
    }

    [HttpPatch]
    [Route("generar/{id}")]
    public Object Put(string id)
    {
      bool ok = CitaData.Generar(id);
      if (ok)
      {
        return new
        {
          status = "ok",
          message = "Factura generada correctamente"
        };
      }
      else
      {
        return new
        {
          status = "error",
          message = "No se pudo generar la Factura"
        };
      }
    }
    [HttpDelete]
    [Route("delete/{id}")]
    public Object Delete(string id)
    {
      bool ok = CitaData.Eliminar(id);
      if (ok)
      {
        return new
        {
          status = "ok",
          message = "Cita eliminada correctamente"
        };
      }
      else
      {
        return new
        {
          status = "error",
          message = "No se pudo eliminar la cita"
        };
      }

    }
  }
}
