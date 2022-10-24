namespace DetailTEC.Models
{
    public class Factura{
        public int id { get; set; }
        public int cedulaCliente { get; set; }
        public int[] cedulaTrabajadores { get; set; }
        public int idTipoDePago { get; set; }
        public int total { get; set; }
        public string nombreDeLavado { get; set; }
        public string fecha { get; set; }
        public string hora { get; set; }
        

        public Factura(){
            cedulaTrabajadores = new int[2];
        }
    }
}
