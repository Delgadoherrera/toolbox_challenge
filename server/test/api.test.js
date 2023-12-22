//ap.test.js
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../server");
const { expect } = chai;

chai.use(chaiHttp);

describe("API Tests", () => {
  describe("GET /files/data", () => {
    it("debería devolver datos de todos los archivos", (done) => {
      chai
        .request(app)
        .get("/files/data")
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("array");
          done();
        });
    });

    it("debería devolver datos de un archivo específico", (done) => {
      chai
        .request(app)
        .get("/files/data?fileName=nombreDeArchivo")
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("array");
          expect(
            res.body.every((fileData) => fileData.file === "nombreDeArchivo")
          ).to.be.true;
          done();
        });
    });

  });
});
