namespace DetailTEC.Models
{
    public class ClienteForGet
    {
        public string cedula { get; set; }
        public string nombre { get; set; }
        public string apellido1 { get; set; }
        public string? apellido2 { get; set; }
        public string usuario { get; set; }
        public string correo { get; set; }
        public string password { get; set; }
        public int puntos { get; set; }

    }
}
