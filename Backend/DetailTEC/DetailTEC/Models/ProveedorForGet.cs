namespace DetailTEC.Models
{
    public class ProveedorForGet
    {
        public string id { get; set; }
        public string nombre { get; set; }
        public string email { get; set; }
        public string? direccion { get; set; }
        public List<string>?  telefonos { get; set; }
    }

    
}
