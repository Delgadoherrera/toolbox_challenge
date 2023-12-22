import React from "react";
import { Table, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import "./fileList.css";

function FileList() {
  const filesData = useSelector((state) => state.files.filesData);

  return (
    <Container>
      <Table hover>
        <thead>
          <tr>
            <th>File Name</th>
            <th>Text</th>
            <th>Number</th>
            <th>Hex</th>
          </tr>
        </thead>
        <tbody>
          {filesData.map((fileData, index) =>
            fileData.lines.map((line, lineIndex) => (
              <tr
                className="bS-tr"
                key={`${fileData.file}-${index}-${lineIndex}`}
              >
                <td className="bS-tr">{fileData.file}</td>
                <td className="bS-tr">{line.text}</td>
                <td className="bS-tr">{line.number}</td>
                <td className="bS-tr">{line.hex}</td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      {filesData.length < 1 && <p>No hay datos</p>}
    </Container>
  );
}

export default FileList;
