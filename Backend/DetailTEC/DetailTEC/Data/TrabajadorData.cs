using System.Data;
using System.Data.SqlClient;
using DetailTEC.Models;

namespace DetailTEC.Data
{
    public class TrabajadorData
    {
        public static bool Registrar(Trabajador trabajador)
        {
            using (SqlConnection oConexion = new SqlConnection(Conexion.rutaConexion))
            {

                SqlCommand cmd = new SqlCommand("insert into " +
                    "TRABAJADOR(Cedula,Nombre,Apellido1,Apellido2,Fecha_nacimiento,Fecha_ingreso,Edad,PasswordT,Rol,Tipo_pago)" +
                    "values("+trabajador.cedula +trabajador.nombre+trabajador.apellido1+trabajador.apellido2+
                    trabajador.fechaNacimiento+trabajador.fechaIngreso+trabajador.edad+trabajador.password
                    +trabajador.rol+trabajador.tipoPago+")", oConexion);

                try
                {
                    oConexion.Open();
                    cmd.ExecuteNonQuery();
                    return true;
                }
                catch (Exception ex)
                {
                    return false;
                }
            }
        }

        public static bool Modificar(Trabajador trabajador)
        {
            using (SqlConnection oConexion = new SqlConnection(Conexion.rutaConexion))
            {

                SqlCommand cmd = new SqlCommand("update TRABAJADOR set "+
                    "Nombre = "+trabajador.nombre+ ",Apellido1 ="+trabajador.apellido1+", Apellido2 ="+trabajador.apellido2+
                    ", Fecha_nacimiento ="+trabajador.fechaNacimiento + ", Fecha_ingreso ="+trabajador.fechaIngreso+
                    ", Edad ="+trabajador.edad + ", PasswordT ="+ trabajador.password+ ", Rol ="+trabajador.rol+
                    ", Tipo_pago"+trabajador.tipoPago+ " where Cedula = "+trabajador.cedula, oConexion);

                try
                {
                    oConexion.Open();
                    cmd.ExecuteNonQuery();
                    return true;
                }
                catch (Exception ex)
                {
                    return false;
                }
            }
        }

        public static List<Trabajador> Listar()
        {
            List<Trabajador> oListaUsuario = new List<Trabajador>();
            using (SqlConnection oConexion = new SqlConnection(Conexion.rutaConexion))
            {
                //SqlCommand cmd = new SqlCommand("trabajador_listar", oConexion);
                //cmd.CommandType = CommandType.StoredProcedure;

                SqlCommand cmd = new SqlCommand("select * from TRABAJADOR", oConexion);
                try
                {
                    oConexion.Open();
                    cmd.ExecuteNonQuery();

                    using (SqlDataReader dr = cmd.ExecuteReader())
                    {

                        while (dr.Read())
                        {
                            oListaUsuario.Add(new Trabajador()
                            {
                                cedula = dr["Cedula"].ToString(),
                                nombre = dr["Nombre"].ToString(),
                                apellido1 = dr["Apellido1"].ToString(),
                                apellido2 = dr["Apellido2"].ToString(),
                                fechaIngreso = Convert.ToDateTime(dr["Fecha_nacimiento"].ToString()),
                                fechaNacimiento = Convert.ToDateTime(dr["Fecha_ingreso"].ToString()),
                                edad = Convert.ToInt32(dr["Edad"]),
                                password = dr["PasswordT"].ToString(),
                                rol = dr["Rol"].ToString(),
                                tipoPago = dr["Tipo_pago"].ToString()
                            });
                            
                        }

                    }



                    return oListaUsuario;
                }
                catch (Exception ex)
                {
                    return oListaUsuario;
                }
            }
        }

        public static Trabajador Obtener(string cedula)
        {
            Trabajador trabajador = new Trabajador();
            using (SqlConnection oConexion = new SqlConnection(Conexion.rutaConexion))
            {
                SqlCommand cmd = new SqlCommand("select * from TRABAJADOR where Cedula = "+cedula, oConexion);

                try
                {
                    oConexion.Open();
                    cmd.ExecuteNonQuery();

                    using (SqlDataReader dr = cmd.ExecuteReader())
                    {

                        while (dr.Read())
                        {
                            trabajador = new Trabajador()
                            {
                                cedula = dr["Cedula"].ToString(),
                                nombre = dr["Nombre"].ToString(),
                                apellido1 = dr["Apellido1"].ToString(),
                                apellido2 = dr["Apellido2"].ToString(),
                                fechaIngreso = Convert.ToDateTime(dr["Fecha_nacimiento"].ToString()),
                                fechaNacimiento = Convert.ToDateTime(dr["Fecha_ingreso"].ToString()),
                                edad = Convert.ToInt32(dr["Edad"]),
                                password = dr["PasswordT"].ToString(),
                                rol = dr["Rol"].ToString(),
                                tipoPago = dr["Tipo_pago"].ToString()
                            };
                        }

                    }



                    return trabajador;
                }
                catch (Exception ex)
                {
                    return trabajador;
                }
            }
        }

        public static bool Eliminar(string cedula)
        {
            using (SqlConnection oConexion = new SqlConnection(Conexion.rutaConexion))
            {
                SqlCommand cmd = new SqlCommand("delete from TRABAJADOR where Cedula = "+cedula, oConexion);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Cedula", cedula);

                try
                {
                    oConexion.Open();
                    cmd.ExecuteNonQuery();
                    return true;
                }
                catch (Exception ex)
                {
                    return false;
                }
            }
        }
    }
}
