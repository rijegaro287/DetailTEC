// using Microsoft.Office.Interop.Excel;
// using _Excel = Microsoft.Office.Interop.Excel;
// using System.Data;
// using System.Data.OleDb; // <-- Add this
// using System.Data.SqlClient;

// using DetailTEC.Data;



// namespace DetailTEC.Helpers;

// // Clase que importa clientes a la base de datos
// // desde un archivo xls
// public class ImportClients{
//     private static string path = "ImportClients/Clientes.xlsx";

//     // public static void insertClients(){
//     //     try{
//     //         string constr = string.Format(@"Provider=Microsoft.ACE.OLEDB.12.0;Data Source={0};Extended Properties=""Excel 12.0 Xml;HDR=YES;""", path);
//     //         OleDbConnection Econ = new OleDbConnection(constr);
//     //         string Query = string.Format("Select [Nombre],[Identificación],[FechaNacimiento],[Direccion],[Telefono1],[Telefono2],[Correo],[Usuario],[Pwd] FROM [{0}]", "Worksheet$");
//     //         Econ.Open();

//     //         DataSet ds = new DataSet();
//     //         OleDbDataAdapter oda = new OleDbDataAdapter(Query, Econ);
//     //         Econ.Close();
//     //         oda.Fill(ds);
//     //         DataTable dt = ds.Tables[0];

//     //         dt.AcceptChanges();

//     //         ConexionAux con = new ConexionAux();
//     //         SqlConnection oConexion = con.conectar();

//     //         SqlBulkCopy objbulk = new SqlBulkCopy(oConexion);

//     //         objbulk.DestinationTableName = "Cliente";
//     //         //mapear las columnas
//     //         objbulk.ColumnMappings.Add("Cedula", "Identificación");
//     //         objbulk.ColumnMappings.Add("Nombre", "Nombre");
//     //         objbulk.ColumnMappings.Add("Apellido1", "Apellido1");
//     //         objbulk.ColumnMappings.Add("Apellido2", "Apellido2");
//     //         objbulk.ColumnMappings.Add("Usuario", "Usuario");
//     //         objbulk.ColumnMappings.Add("Correo", "Correo");
            

//     //     }catch(Exception ex){
//     //         // Console.WriteLine(ex.Message);
//     //         System.Diagnostics.Debug.WriteLine(ex.Message);
//     //     }
//     // }

//     public static void aplicarFormato(){

//     }
// }

