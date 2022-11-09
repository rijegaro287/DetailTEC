using DetailTEC.Data;
using DetailTEC.Models;
using Microsoft.AspNetCore.Mvc;

namespace DetailTEC.Controllers
{
  [ApiController]
  [Route("proveedor")]

  // controlador de proveedor: get all, get one, post, put, delete 
  public class ProveedorController : Controller
  {
    [HttpGet]
    [Route("get_all")]
    public Object Get()
    {
      try
      {
        List<Proveedor> proveedores = ProveedorData.Listar();
        return new
        {
          status = "ok",
          suppliers = proveedores
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
        Proveedor proveedor = ProveedorData.Obtener(id);
        return new
        {
          status = "ok",
          supplier = proveedor
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
    public Object Post([FromBody] Proveedor proveedor)
    {
      bool ok = ProveedorData.Registrar(proveedor);
      if (ok)
      {
        return new
        {
          status = "ok",
          message = "Proveedor registrado correctamente"
        };
      }
      else
      {
        return new
        {
          status = "error",
          message = "No se pudo registrar el proveedor"
        };
      }
    }

    [HttpPatch]
    [Route("update/{id}")]
    public Object Put([FromBody] Proveedor proveedor, string id)
    {
      bool ok = ProveedorData.Modificar(proveedor, id);
      if (ok)
      {
        return new
        {
          status = "ok",
          message = "Proveedor modificado correctamente"
        };
      }
      else
      {
        return new
        {
          status = "error",
          message = "No se pudo modificar el proveedor"
        };
      }
    }

    [HttpDelete]
    [Route("delete/{id}")]
    public Object Delete(string id)
    {
      bool ok = ProveedorData.Eliminar(id);
      if (ok)
      {
        return new
        {
          status = "ok",
          message = "Proveedor eliminado correctamente"
        };
      }
      else
      {
        return new
        {
          status = "error",
          message = "No se pudo eliminar el proveedor"
        };
      }

    }
  }
}
