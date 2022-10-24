


namespace DetailTEC.Models
{
    public class Factura
    {
        public string id { get; set; }
        public string placaVehiculo { get; set; }
        public string nombreSucursal { get; set; }
        public string idCliente { get; set; }
        public string nombreCliente { get; set; }
        public int tipoLavado { get; set; }
        public DateTime? fecha { get; set; }
        public DateTime? hora { get; set; }
        public string montoPagado { get; set; }
        public string puntosUtilizados { get; set; }

    }
}
