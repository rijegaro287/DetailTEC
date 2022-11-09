using DetailTEC.Data;
using DetailTEC.Models;
using Microsoft.AspNetCore.Mvc;

namespace DetailTEC.Controllers
{

  [ApiController]
  [Route("producto")]

  // controlador de producto: get all, get one, post, put, delete
  public class ProductoController : Controller
  {
    [HttpGet]
    [Route("get_all")]
    public Object Get()
    {
      try
      {
        List<ProductoForGet> productos = ProductoData.Listar();
        return new
        {
          status = "ok",
          products = productos
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
    public Object Get(string ID)

    {
      try
      {
        ProductoForGet producto = ProductoData.Obtener(ID);
        return new
        {
          status = "ok",
          product = producto
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
    public Object Post([FromBody] Producto producto)
    {
      bool ok = ProductoData.Registrar(producto);
      if (ok)
      {
        return new
        {
          status = "ok",
          message = "Producto registrado correctamente"
        };
      }
      else
      {
        return new
        {
          status = "error",
          message = "No se pudo registrar el producto"
        };
      }
    }

    [HttpPatch]
    [Route("update/{id}")]
    public Object Put([FromBody] Producto producto, string id)
    {
      bool ok = ProductoData.Modificar(producto, id);
      if (ok)
      {
        return new
        {
          status = "ok",
          message = "Producto modificado correctamente"
        };
      }
      else
      {
        return new
        {
          status = "error",
          message = "No se pudo modificar el producto"
        };
      }
    }

    [HttpDelete]
    [Route("delete/{id}")]
    public Object Delete(string id)
    {
      bool ok = ProductoData.Eliminar(id);
      if (ok)
      {
        return new
        {
          status = "ok",
          message = "Producto eliminado correctamente"
        };
      }
      else
      {
        return new
        {
          status = "error",
          message = "No se pudo eliminar el producto"
        };
      }

    }
  }
}