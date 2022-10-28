namespace DetailTEC.Models
{
    public class LavadoForGet
    {
        public int id { get; set; }
        public string nombre { get; set; }
        public int costo { get; set; }
        public int cantidadEmpleados { get; set; }
        public int comisionEmpleado { get; set; }

        public int precio { get; set; }
        public int duracionMinutos { get; set; }

        public List<int> idProductos { get; set; }
        public List<string> nombresProductos { get; set; }
        public int puntuacion { get; set; }
    }
}
