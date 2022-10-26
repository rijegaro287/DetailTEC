using DetailTEC.Data;
using DetailTEC.Models;
using Microsoft.AspNetCore.Mvc;

namespace DetailTEC.Controllers
{
  [ApiController]
  [Route("sucursal")]
  public class SucursalController : ControllerBase
  {
    [HttpGet]
    [Route("get_all")]
    public Object Get()
    {
      try
      {
        List<SucursalForGet> sucursales = SucursalData.Listar();
        return new
        {
          status = "ok",
          branches = sucursales
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
        SucursalForGet sucursal = SucursalData.Obtener(id);
        return new
        {
          status = "ok",
          branch = sucursal
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
    public Object Post([FromBody] Sucursal sucursal)
    {
      bool ok = SucursalData.Registrar(sucursal);
      if (ok)
      {
        return new
        {
          status = "ok",
          message = "Sucursal registrada correctamente"
        };
      }
      else
      {
        return new
        {
          status = "error",
          message = "No se pudo registrar la sucursal"
        };
      }
    }

    [HttpPatch]
    [Route("update/{id}")]
    public Object Put([FromBody] Sucursal sucursal, string id)
    {
      bool ok = SucursalData.Modificar(sucursal, id);
      if (ok)
      {
        return new
        {
          status = "ok",
          message = "Sucursal modificada correctamente"
        };
      }
      else
      {
        return new
        {
          status = "error",
          message = "No se pudo modificar la sucursal"
        };
      }
    }

    [HttpDelete]
    [Route("delete/{id}")]
    public Object Delete(string id)
    {
      bool ok = SucursalData.Eliminar(id);
      if (ok)
      {
        return new
        {
          status = "ok",
          message = "Sucursal eliminada correctamente"
        };
      }
      else
      {
        return new
        {
          status = "error",
          message = "No se pudo eliminar la sucursal"
        };
      }

    }
  }
}
