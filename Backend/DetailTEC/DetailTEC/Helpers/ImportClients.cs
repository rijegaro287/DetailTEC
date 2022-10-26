using Microsoft.Office.Interop.Excel;
using _Excel = Microsoft.Office.Interop.Excel;
using  ManData = System.Data;
using System.Data.OleDb; // <-- Add this
using DetailTEC.Models;
using System.Data.SqlClient;

using DetailTEC.Data;



namespace DetailTEC.Helpers;

// Clase que importa clientes a la base de datos
// desde un archivo xls
public class ImportClients{
    private static string path = "ImportClients/Clientes.xlsx";

    public static void insertClients(){
        try{
            string constr = string.Format(@"Provider=Microsoft.ACE.OLEDB.12.0;Data Source={0};Extended Properties=""Excel 12.0 Xml;HDR=YES;""", path);
            OleDbConnection Econ = new OleDbConnection(constr);
            // string Query = string.Format("Select [Nombre],[Identificación],[FechaNacimiento],[Direccion],[Telefono1],[Telefono2],[Correo],[Usuario],[Pwd] FROM [{0}]", "Worksheet$");
            string Query = string.Format("Select [Nombre],[Identificación],[Direccion],[Telefono1],[Telefono2],[Correo],[Pwd] FROM [{0}]", "Worksheet$");
            Econ.Open();
            
            ManData :: DataSet ds = new ManData :: DataSet();
            OleDbDataAdapter oda = new OleDbDataAdapter(Query, Econ);
            Econ.Close();
            oda.Fill(ds);
            ManData :: DataTable dt = ds.Tables[0];
            for(int i = dt.Rows.Count - 1; i >= 0; i--){
                try{
                    Cliente cliente = new Cliente();

                    //Extrae nombre completo, le aplica el formato y lo divide en 
                    // nombre, apellido1 y apellido2
                    string nombreCompleto = dt.Rows[i]["Nombre"].ToString();
                    nombreCompleto = nombreCompleto.Trim(new char[]{',','.'});
                    string[] nombre = nombreCompleto.Split(' ');
                    // nombre = nombre.Select(x => x.Trim(new char[]{',','.'})).ToArray();
                    cliente.nombre = nombre[0];
                    cliente.apellido1 = nombre[1];
                    if(nombre.Length > 2){
                        cliente.apellido2 = nombre[2];
                    }
                    else{
                        cliente.apellido2 = "";
                    }
        

                    // string telefono1 = dt.Rows[i]["Telefono1"].ToString();
                    // string telefono2 = dt.Rows[i]["Telefono2"].ToString();
                    // telefono1 = telefono1.Trim(new char[]{' ','-'});
                    // telefono2 = telefono2.Trim(new char[]{' ','-'});
                    // cliente.telefonos.Add(telefono1);
                    // cliente.telefonos.Add(telefono2);

                    // string direccion = dt.Rows[i]["Direccion"].ToString();
                    // direccion = direccion.ToLower();
                    // if( direccion != "" || direccion != "Null" || direccion != null){
                    //     cliente.direcciones.Add(direccion);
                    // }

                    cliente.email = dt.Rows[i]["Correo"].ToString();
                    cliente.password = dt.Rows[i]["Pwd"].ToString();
                    cliente.actuales = 0;
                    cliente.total = 0;
                    cliente.utilizados = 0;

                    // Extraer la cedula y darle formato
                    string cedula = dt.Rows[i]["Identificación"].ToString();
                    cedula = cedula.Trim(new char[]{' ','-'});
                    cedula = cedula.Substring(0,8);
                    cliente.id = cedula;
                    ClienteForGet clienteExistente = ClienteData.Obtener(cedula);
                    if (clienteExistente.id == null){
                        ClienteData.Registrar(cliente);
                }
                }catch(Exception e){
                    // Console.WriteLine(e);
                }
            }
            dt.AcceptChanges();
        }catch(Exception e){
            // Console.WriteLine(e);
        }
    }
}

