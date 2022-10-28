

using DetailTEC.Data;
using DetailTEC.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;

namespace DetailTEC.Controllers
{
    [ApiController]
    [Route("productosComprados")]
    //[EnableCors("AllowAllOrigins")]
    // controlador de productos comprados: get all, get one, post, put, delete
    public class ProductosCompradosController : ControllerBase
    {

        [HttpGet]
        [Route("get_all")]
        public List<ProductosCompradosForGet> Get()
        {   
            return ProductosCompradosData.Listar();
        }

        [HttpGet]
        [Route("get/{id}")]
        public ProductosCompradosForGet Get(string cedula)
        {
            return ProductosCompradosData.Obtener(cedula);
        }

        [HttpPost]
        [Route("add")]
        public bool Post([FromBody] ProductosComprados productosComprados)
        {
            return ProductosCompradosData.Registrar(productosComprados);
        }
        [HttpPatch]
        [Route("update/{id}")]
        public bool Put([FromBody] ProductosComprados productosComprados)
        {
            return ProductosCompradosData.Modificar(productosComprados);
        }

        [HttpDelete]
        [Route("delete/{id}")]
        public bool Delete(string cedula)
        {
            return ProductosCompradosData.Eliminar(cedula);

        }
    }
}
