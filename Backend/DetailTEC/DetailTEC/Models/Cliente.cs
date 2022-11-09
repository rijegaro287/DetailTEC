namespace DetailTEC.Models
{
  public class Cliente
  {
    public string id { get; set; }
    public string nombre { get; set; }
    public string apellido1 { get; set; }
    public string? apellido2 { get; set; }
    public string email { get; set; }
    public List<string> telefonos { get; set; }
    public List<string> direcciones { get; set; }

    // Estos opcionales para cuando se registre el cliente
    public string? password { get; set; }

    public string? passwordVieja { get; set; }
    public int? total { get; set; }
    public int? utilizados { get; set; }
    public int? actuales { get; set; }

  }
}
