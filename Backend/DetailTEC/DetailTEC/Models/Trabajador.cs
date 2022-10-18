


namespace DetailTEC.Models
{
    public class Trabajador
    {
        public string cedula { get; set; }
        public string nombre { get; set; }
        public string apellido1 { get; set; }
        public string? apellido2 { get; set; }
        public DateTime? fechaNacimiento { get; set; }
        public DateTime? fechaIngreso { get; set; }
        public int? edad { get; set; }
        public string password { get; set; }
        public string rol { get; set; }
        public string tipoPago { get; set; }

    }
}
