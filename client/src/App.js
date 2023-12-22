import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setFilesData } from "./features/files/FilesReducer";
import { getFilesData } from "./services/FileService";
import "bootstrap/dist/css/bootstrap.min.css";
import FileList from "./components/FileList";
import SearchInput from "./components/SearchInput";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getFilesData();
        console.log("data", data);
        dispatch(setFilesData(data));
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <Container>
      <h1 className="text-light bg-danger">React Test App</h1>
      <SearchInput />
      <FileList />
    </Container>
  );
}

export default App;
