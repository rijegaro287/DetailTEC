namespace DetailTEC.Models
{
    public class Sucursal
    {
        public string nombre { get; set; }
        public string? provincia { get; set; }
        public string? canton { get; set; }
        public string? distrito { get; set; }
        public string telefono { get; set; }
        public DateTime? fechaApertura{ get; set; }
        public DateTime? fechaGerente { get; set; }
        public string cedulaGerente { get; set; }

    }
}
