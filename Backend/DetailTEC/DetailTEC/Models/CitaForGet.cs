namespace DetailTEC.Models
{
    public class CitaForGet
    {
        public int id { get; set; }
        public string cedulaCliente { get; set; }
        public string? nombreCliente { get; set; }
        public string placaVehiculo { get; set; }
        public int IDSucursal { get; set; }
        public int tipoLavado { get; set; }
        public DateTime fecha { get; set; }
        public TimeSpan hora { get; set; }
        public string medioPago { get; set; }
        public int? montoPagado { get; set; }
        public List<string>? idEmpleados { get; set; }
    }
}
