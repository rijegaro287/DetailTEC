namespace DetailTEC.Models
{
    public class Facturacion
    {
        public int id { get; set; }
        public int cedulaCliente { get; set; }
        public int cedulaTrabajador { get; set; }
        public int total { get; set; }
        public int idTipoDePago { get; set; }

    }
}