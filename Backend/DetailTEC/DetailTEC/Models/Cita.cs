namespace DetailTEC.Models
{
    public class Cita
    {
        public int id { get; set; }
        public string cedulaCliente { get; set; }
        public string placaVehiculo { get; set; }
        public int IDSucursal { get; set; }
        public int tipoLavado { get; set; }
        public DateTime fecha { get; set; }
        public string hora { get; set; }
        public string medioPago { get; set; }

        public int generada { get; set; }
        
        public List<string> idEmpleados { get; set; }
    }
}
