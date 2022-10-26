using DetailTEC.Data;
using DetailTEC.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OfficeOpenXml.FormulaParsing.Excel.Functions.Math;
using System.Data.SqlClient;
using System.Data;

namespace DetailTEC.Controllers
{
    [ApiController]
    [Route("login")]
    public class LoginController : Controller
    {

        [HttpPost]
        [Route("verify")]
        public Object Post([FromBody] Login login)
        {
            bool ok = false;
            string tableSearch = "";
            string command = "";
            string pType = "";
            string id = "";
            SqlCommand cmd = null;

            if (login.tipoUsuario == "Cliente")
            {
                tableSearch = "CLIENTE";
                command = "select Cedula, PasswordC from " + tableSearch + " where Correo = @param1";
                pType = "PasswordC";
            }
            else
            {
                tableSearch = "TRABAJADOR";
                command = "select Cedula, PasswordT from " + tableSearch + " where Email = @param1";
                pType = "PasswordT";
            }

            Console.WriteLine(login.email);

            using (SqlConnection oConexion = new SqlConnection(Conexion.rutaConexion))
            {
                cmd = new SqlCommand(command, oConexion);
                cmd.Parameters.Add("@param1", SqlDbType.VarChar, 50).Value = login.email;
                cmd.CommandType = CommandType.Text;

                try
                {
                    oConexion.Open();
                    cmd.ExecuteNonQuery();

                    using (SqlDataReader dr = cmd.ExecuteReader())
                    {

                        while (dr.Read())
                        {
                            if (dr[pType].ToString() == login.password)
                            {
                                id = dr["Cedula"].ToString();
                                ok = true;
                            }
                            else
                            {
                                ok = false;
                            }

                        }

                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex);
                    ok = false;
                }
            }

            if (ok)
            {
                return new
                {
                    status = "ok",
                    ClientID = id,
                    message = "Usuario aceptado"
                };
            }
            else
            {
                return new
                {
                    status = "error",
                    ClientID = id,
                    message = "Contraseña o Usuario incorrecto"
                };
            }
        }

    }
}
