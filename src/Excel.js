import React from "react";
import { Workbook } from "exceljs";
import * as fs from "file-saver";

const headers = [
  "AppName",
  "Market",
  "ConnectURL",
  "FirebaseProject",
  "Status",
  "Platform",
];
const headersMapping = {
  AppName: "appName",
  Market: "market",
  ConnectURL: "connect_url",
  FirebaseProject: "name",
  Status: "status",
  Platform: "platform",
};
const length = 20;

export const Excel = () => {
  function handleExport() {
    const list = [
      {
        AppName: "",
        Market: "",
        ConnectURL: "",
        FirebaseProject: "",
        Status: "",
        Platform: "",
      },
    ];
    let data = [];
    for (let i = 0; i < length; i++) {
      let arr = [
        list[0].AppName,
        list[0].Market,
        list[0].ConnectURL,
        list[0].FirebaseProject,
      ];
      data.push(arr);
    }

    //Create workbook and worksheet
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet("MMS Template");

    //Add Header Row
    let headerRow = worksheet.addRow(headers);

    // Cell Style : Fill and Border
    headerRow.eachCell((cell, number) => {
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFFFFF00" },
        bgColor: { argb: "FF0000FF" },
      };
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
    });
    worksheet.getColumn(1).width = 30;
    worksheet.getColumn(3).width = 50;
    worksheet.getColumn(4).width = 30;
    worksheet.getColumn(5).width = 20;

    data.forEach((d) => {
      worksheet.addRow(d);
    });
    Array.from({ length }).forEach((_element, index) => {
      worksheet.getCell("B" + (+index + 2)).dataValidation = {
        type: "list",
        allowBlank: true,
        formulae: ['"IOS,ANDROID"'],
      };
      worksheet.getCell("D" + (+index + 2)).dataValidation = {
        type: "list",
        allowBlank: true,
        formulae: ['"IOS,ANDROID"'],
      };
      worksheet.getCell("E" + (+index + 2)).dataValidation = {
        type: "list",
        allowBlank: true,
        formulae: ['"Active,Inactive,Development"'],
      };
      worksheet.getCell("F" + (+index + 2)).dataValidation = {
        type: "list",
        allowBlank: true,
        formulae: ['"IOS,ANDROID"'],
      };
    });
    //Generate Excel File with given name
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      fs.saveAs(blob, "pmp_app_template.xlsx");
    });
  }

  return (
    <>
      <button type="button" onClick={handleExport}>
        Export template
      </button>
    </>
  );
};
