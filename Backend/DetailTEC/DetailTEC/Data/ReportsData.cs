using System.Data;
using System.Data.SqlClient;
using DetailTEC.Models;

namespace DetailTEC.Data;

public class ReportsData{
    public static ReporteLavado reporteLavado(int clienteId){
        ReporteLavado reporte = new ReporteLavado();
        using(SqlConnection oConexion = new SqlConnection(Conexion.rutaConexion)){
            SqlCommand cmd = new SqlCommand("washingReport", oConexion);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@id", clienteId);

            try{
                oConexion.Open();
                cmd.ExecuteNonQuery();

                using (SqlDataReader dr = cmd.ExecuteReader()){
                    while(dr.Read()){
                        reporte = new ReporteLavado(){
                            nombre = dr["Nombre"].ToString(),
                            apellido1 = dr["Apellido1"].ToString(),
                            apellido2 = dr["Apellido2"].ToString(),
                            tipoDeLavado = dr[""]
                        }
                    }
                }
            }
        }
    }
    }