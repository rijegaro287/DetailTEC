using DetailTEC.Data;
using DetailTEC.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;



namespace DetailTEC.Controllers
{
    [ApiController]
    [Route("product")]
    public class ProductoController : Controller
    {
        [HttpGet]
        [Route("get_all")]

        public List<Producto> Get()
        {
            return ProductoData.Listar();
        }
        public IActionResult Index()
        {
            return View();
        }
    }
}



namespace DetailTEC.Controllers
{
   
    public class LavadoController : Controller
    {
        [HttpGet]
        [Route("get_all")]
        public List<Lavado> Get()
        {
            return LavadoData.Listar();
        }

        [HttpGet]
        [Route("get/{id}")]
        public Lavado Get(string nombre)
        {
            return LavadoData.Obtener(nombre);
        }

        [HttpPost]
        [Route("add")]
        public bool Post([FromBody] Lavado lavado)
        {
            return LavadoData.Registrar(lavado);
        }
        [HttpPatch]
        [Route("update/{id}")]
        public bool Put([FromBody] Lavado lavado)
        {
            return LavadoData.Modificar(lavado);
        }

        [HttpDelete]
        [Route("delete/{id}")]
        public bool Delete(string nombre)
        {
            return LavadoData.Eliminar(nombre);

        }
    }
}

