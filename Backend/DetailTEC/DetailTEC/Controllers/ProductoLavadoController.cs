

using DetailTEC.Data;
using DetailTEC.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;

namespace DetailTEC.Controllers
{
    [ApiController]
    [Route("productoLavado")]
    //[EnableCors("AllowAllOrigins")]
    public class ProductoLavadoController : ControllerBase
    {

        [HttpGet]
        [Route("get_all")]
        public List<ProductoLavadoForGet> Get()
        {   
            return ProductoLavadoData.Listar();
        }

        [HttpGet]
        [Route("get/{id}")]
        public ProductoLavadoForGet Get(string cedula)
        {
            return ProductoLavadoData.Obtener(cedula);
        }

        [HttpPost]
        [Route("add")]
        public bool Post([FromBody] ProductoLavado productoLavado)
        {
            return ProductoLavadoData.Registrar(productoLavado);
        }
        [HttpPatch]
        [Route("update/{id}")]
        public bool Put([FromBody] ProductoLavado productoLavado)
        {
            return ProductoLavadoData.Modificar(productoLavado);
        }

        [HttpDelete]
        [Route("delete/{id}")]
        public bool Delete(string cedula)
        {
            return ProductoLavadoData.Eliminar(cedula);

        }
    }
}
