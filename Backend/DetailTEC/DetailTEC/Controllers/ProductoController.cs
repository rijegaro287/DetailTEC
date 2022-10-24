using DetailTEC.Data;
using DetailTEC.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;



namespace DetailTEC.Controllers {  

    public class ProductoController : Controller
    {
        [HttpGet]
        [Route("get_all")]
        public List<ProductoForGet> Get()
        {
            return ProductoData.Listar();
        }

        /*
        [HttpGet]
        [Route("get/{id}")]
        public ProductoForGet Get(string nombre)


        [HttpGet]
        [Route("get/{id}")]
        public Producto Get(string nombre)

        {
            return ProductoData.Obtener(nombre);
        }

        [HttpPost]
        [Route("add")]
        public bool Post([FromBody] Producto producto)
        {
            return ProductoData.Registrar(producto);
        }
        [HttpPatch]
        [Route("update/{id}")]
        public bool Put([FromBody] Producto producto)
        {
            return ProductoData.Modificar(producto);
        }

        [HttpDelete]
        [Route("delete/{id}")]
        public bool Delete(string nombre)
        {
            return ProductoData.Eliminar(nombre);

        }
        */
    }
}