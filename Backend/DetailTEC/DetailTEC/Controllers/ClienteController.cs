using DetailTEC.Data;
using DetailTEC.Models;
using Microsoft.AspNetCore.Mvc;

namespace DetailTEC.Controllers
{
  [ApiController]
  [Route("cliente")]
  public class ClienteController : Controller
  {
    [HttpGet]
    [Route("get_all")]
    public Object Get()
    {
      try
      {
        List<ClienteForGet> clientes = ClienteData.Listar();
        return new
        {
          status = "ok",
          clients = clientes
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
        ClienteForGet cliente = ClienteData.Obtener(cedula);
        return new
        {
          status = "ok",
          client = cliente
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
    // Se tiene que generar la contraseña registrar el cliente
    public Object Post([FromBody] Cliente cliente)
    {
      bool ok = ClienteData.Registrar(cliente);
      if (ok)
      {
        return new
        {
          status = "ok",
          message = "Cliente registrado correctamente"
        };
      }
      else
      {
        return new
        {
          status = "error",
          message = "No se pudo registrar el cliente"
        };
      }
    }

    [HttpPatch]
    [Route("update/{cedula}")]
    public Object Put([FromBody] Cliente cliente, string cedula)
    {
      bool ok = ClienteData.Modificar(cliente, cedula);
      if (ok)
      {
        return new
        {
          status = "ok",
          message = "Cliente modificado correctamente"
        };
      }
      else
      {
        return new
        {
          status = "error",
          message = "No se pudo modificar el cliente"
        };
      }
    }

    [HttpDelete]
    [Route("delete/{cedula}")]
    public Object Delete(string cedula)
    {
      bool ok = ClienteData.Eliminar(cedula);
      if (ok)
      {
        return new
        {
          status = "ok",
          message = "Cliente eliminado correctamente"
        };
      }
      else
      {
        return new
        {
          status = "error",
          message = "No se pudo eliminar el cliente"
        };
      }
    }
  }
}
