import React from "react";
import csvToJson from "./helpers/csvToJson";

import { Excel } from "./Excel";

function App() {
  const [csvData, setCsvData] = React.useState(null);

  async function handleChangeFile(e) {
    const file = e.target.files[0];
    const csvData = await csvToJson(file);
    const headers = Object.keys(csvData[0]);
    const object = {
      headers,
      data: csvData,
    };
    setCsvData(object);
  }

  return (
    <>
      <div className="mx-auto">
        <h1 className="display-5 text-center">Upload File</h1>
      </div>

      <div className="container">
        <input
          accept=".csv"
          type="file"
          name="imageUpload"
          id="inputFile"
          className="hide"
          onChange={handleChangeFile}
        />
        <label htmlFor="inputFile" className="dropzone">
          Click to select csv files
        </label>
        <br />
        {csvData ? (
          <>
            <table className="table">
              <thead className="thead-dark">
                <tr>
                  {csvData.headers.map((header, headerIndex) => (
                    <th key={headerIndex} scope="col">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {csvData.data.map((row, rowIndex) => {
                  console.log("row", row);
                  return (
                    <tr key={rowIndex}>
                      {Object.values(row).map((cell, cellIndex) => (
                        <td key={cellIndex}>{cell}</td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        ) : (
          <div className="text-center">no data</div>
        )}

        <br />
        <hr />

        <Excel />
      </div>
    </>
  );
}

export default App;
