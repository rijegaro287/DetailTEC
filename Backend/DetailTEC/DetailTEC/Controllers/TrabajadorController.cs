

using DetailTEC.Data;
using DetailTEC.Models;
using Microsoft.AspNetCore.Mvc;


namespace DetailTEC.Controllers
{
    public class TrabajadorController : ControllerBase
    {

        public List<Trabajador> Get()
        {
            return TrabajadorData.Listar();
        }

        public Trabajador Get(string cedula)
        {
            return TrabajadorData.Obtener(cedula);
        }


        public bool Post([FromBody] Trabajador trabajador)
        {
            return TrabajadorData.Registrar(trabajador);
        }

        public bool Put([FromBody] Trabajador trabajador)
        {
            return TrabajadorData.Modificar(trabajador);
        }

        public bool Delete(string cedula)
        {
            return TrabajadorData.Eliminar(cedula);

        }
    }
}
