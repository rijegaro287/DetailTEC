

using DetailTEC.Data;
using DetailTEC.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;

namespace DetailTEC.Controllers
{
    [ApiController]
    [Route("contactoProveedor")]
    //[EnableCors("AllowAllOrigins")]
    public class ContactoProveedorController : ControllerBase
    {

        [HttpGet]
        [Route("get_all")]
        public List<ContactoProveedorForGet> Get()
        {   
            return ContactoProveedorData.Listar();
        }

        [HttpGet]
        [Route("get/{id}")]
        public ContactoProveedorForGet Get(string cedula)
        {
            return ContactoProveedorData.Obtener(cedula);
        }

        [HttpPost]
        [Route("add")]
        public bool Post([FromBody] ContactoProveedor contactoProveedor)
        {
            return ContactoProveedorData.Registrar(contactoProveedor);
        }
        [HttpPatch]
        [Route("update/{id}")]
        public bool Put([FromBody] ContactoProveedor contactoProveedor)
        {
            return ContactoProveedorData.Modificar(contactoProveedor);
        }

        [HttpDelete]
        [Route("delete/{id}")]
        public bool Delete(string cedula)
        {
            return ContactoProveedorData.Eliminar(cedula);

        }
    }
}
