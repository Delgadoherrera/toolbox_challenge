const express = require("express");
const axios = require("axios");
const router = express.Router();

const apiClient = axios.create({
  baseURL: "https://echo-serv.tbxnet.com/v1/secret",
  headers: {
    Authorization: "Bearer aSuperSecretKey",
  },
});
function processFileContent(fileContent) {
  const lines = fileContent.trim().split("\n");
  const headers = lines.shift().split(",");

  const data = lines
    .map((line) => {
      const trimmedLine = line.trim();
      if (!trimmedLine) return null;
      const data = trimmedLine.split(",");
      if (data.length !== headers.length) return null;

      const lineObj = headers.reduce((obj, header, index) => {
        obj[header] = data[index];
        return obj;
      }, {});

      if (
        !lineObj.text ||
        isNaN(lineObj.number) ||
        !lineObj.hex ||
        !lineObj.file
      )
        return null;
      delete lineObj.file;

      return lineObj;
    })
    .filter((line) => line !== null);
  return data;
}
router.get("/files/data", async (req, res) => {
  try {
    const fileNameQuery = req.query.fileName;
    const fileListResponse = await apiClient.get("/files");
    let fileList = fileListResponse.data.files;
    if (fileNameQuery) {
      fileList = fileList.filter((fileName) => fileName === fileNameQuery);
    }
    const allFilesData = await Promise.all(
      fileList.map(async (fileName) => {
        try {
          const fileResponse = await apiClient.get(`/file/${fileName}`);
          const fileContent = fileResponse.data;
          const formattedData = processFileContent(fileContent);
          return { file: fileName, lines: formattedData };
        } catch (error) {
          console.error(`Error al descargar el archivo ${fileName}: ${error}`);
          return { file: fileName, error: error.message };
        }
      })
    );

    const filteredFilesData = allFilesData.filter(
      (data) => data !== null && !data.error && data.lines.length > 0
    );
    res.json(filteredFilesData);
  } catch (error) {
    res.status(500).send(`Error en el servidor: ${error.message}`);
  }
});

router.get("/files/list", async (req, res) => {
  try {
    const response = await apiClient.get("/files");
    res.json(response.data.files);
  } catch (error) {
    console.error("Error en el servidor:", error);
    res.status(500).send(`Error en el servidor: ${error.message}`);
  }
});

module.exports = router;
