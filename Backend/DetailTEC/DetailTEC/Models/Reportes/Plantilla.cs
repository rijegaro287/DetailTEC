namespace DetailTEC.Models
{
    public class Plantilla
    {
        public int cedula { get; set; }
        public string nombreTrabajador { get; set; }
        public string apellido1Trabajador { get; set; }
        public string apellido2Trabajador { get; set; }
        public string tipoDePago { get; set; }
        public string nombreDeLavado { get; set; }
        public int cantidadLavados { get; set; }
        public int montoGanadoPorLavados { get; set; }
    }
}