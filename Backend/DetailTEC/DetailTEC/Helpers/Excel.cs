// using Microsoft.Office.Interop.Excel;
// using SheetToObjects.Adapters.MicrosoftExcel;
// using _Excel = Microsoft.Office.Interop.Excel;
// using System.Runtime.InteropServices;

// class Excel{
//     string path = "";
//     _Application excel = new _Excel.Application();
//     Workbook wb;
//     Worksheet ws;
//     public Excel(string path, int sheet){
//         this.path = path;
//         wb = excel.Workbooks.Open(path);
//         ws = (Worksheet) wb.Sheets[sheet];

//     }

//     public string readCell(int i, int j){
//         i++;
//         j++;
//         if((string)(ws.Cells[i, j] as Excel.Range).Value != null){
//             return ws.Cells[i, j].Value;
//         }
//         else{
//             return "";
//         }
//     }
// }