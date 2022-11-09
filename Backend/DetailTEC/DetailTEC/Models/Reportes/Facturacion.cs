namespace DetailTEC.Models
{
    public class Facturacion
    {
        public Facturacion(Factura factura){
            this.id = factura.id;
            this.total = factura.total;
            this.nombreDeLavado = factura.nombreDeLavado;
            this.fecha = factura.fecha;
            this.hora = factura.hora;
            int cantidadTrabajadores = factura.cedulaTrabajadores.Length;
            this.trabajadores = new TrabajadorForGet[2];
        }
        public int id { get; set; }
        public string nombreCliente { get; set; }
        public string apellido1Cliente { get; set; }
        public string apellido2Cliente { get; set; }
        public TrabajadorForGet[] trabajadores { get; set; }
        public int total { get; set; }
        public int idTipoDePago { get; set; } //Aquí sería nombre de lavado
        public string nombreDeLavado{ get; set; }
        public string fecha { get; set; }
        public string hora { get; set; }

    }
}