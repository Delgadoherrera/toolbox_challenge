import React from "react";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import { useDispatch } from 'react-redux';
import { setFilesData } from '../features/files/FilesReducer';
import { getFilesData } from "../services/FileService";

function SearchInput() {
  const dispatch = useDispatch();
  const [filter, setFilter] = React.useState('');

  const handleSearch = async () => {
    try {
      const data = await getFilesData(filter);
      dispatch(setFilesData(data));
    } catch (error) {
      console.error("Error in search: ", error);
    }
  };

  return (
    <InputGroup className="mb-3">
      <FormControl
        placeholder="File name"
        aria-label="File name"
        aria-describedby="basic-addon2"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <Button variant="outline-secondary" onClick={handleSearch}>
        Search
      </Button>
      
    </InputGroup>
  );
}

export default SearchInput;
