// import "./styles.css";

var XLSX = require("xlsx");
var fs = require("fs");
var JSON = require("JSON");
var path = require("path");
var PDFJS = require("pdfjs");

var file = document.getElementById("docpicker");
var viewer = document.getElementById("dataviewer");

function fileReader(oEvent) {
  var oFile = oEvent.target.files[0];
  var sFilename = oFile.name;

  var reader = new FileReader();
  var result = {};
  var result1 = [];

  reader.onload = function (e) {
    var data = e.target.result;
    data = new Uint8Array(data);
    var workbook = XLSX.read(data, { type: "array" });
    console.log(workbook);
    var result = {};
    workbook.SheetNames.forEach(function (sheetName) {
      var roa = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {
        header: 1
      });
      if (roa.length) result[sheetName] = roa;
    });
    console.log(result.Sheet1[2][30]);

    for (let index = 2; index < result.Sheet1.length; index++) {
      result1.push(result.Sheet1[index][30]);
    }
    console.log(result1);
    var link = document.createElement("a");
    link.href = result1[1];
    link.download = "file.pdf";
    link.dispatchEvent(new MouseEvent("click"));
  };
  reader.readAsArrayBuffer(oFile);
}

$("#docpicker").change(function (ev) {
  fileReader(ev);
});
