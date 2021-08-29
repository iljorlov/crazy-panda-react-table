import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.scss';
import { Page } from './components/Page';

const dataURL = "https://jsonplaceholder.typicode.com/photos";

function App() {

  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);

  // load data for the table
  useEffect(() => {
    axios
      .get(dataURL)
      .then(function (response) {
        // handle success
        setData(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, []);

  return (
    <div className="App">
      <Page data={data} currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
  );
}

export default App;
