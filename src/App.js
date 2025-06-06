import './App.css';
import { useState } from 'react';
import axios from 'axios';

function App() {

  const [inputCalle, setInputCalle] = useState('')
  const [results, setResults] = useState();
  const [errorMessage, setErrorMessage] = useState('');

  function getDireccion(calle) {
    setResults();
    axios.get(`${process.env.REACT_APP_API_URL}?direccion=${calle}`).then((res) => {
      if (res.data.direccionesNormalizadas.length > 0){
        setResults(res.data.direccionesNormalizadas);
        setErrorMessage('');
        setInputCalle('');
      }
      else{
        setErrorMessage(res.data.errorMessage);
      }
    })
  }

  return (
    <div className="App">
      <h1>EJERCICIO TÉCNICO - CALLES</h1>
      <div className="Container">     
        <div className="Input">
            <input value={inputCalle} onChange={(e) => setInputCalle(e.target.value)}/>
            <button className="Button" disabled={!inputCalle} onClick={() => getDireccion(inputCalle)}>CONSULTAR</button>
        </div>
      <div className="ResultsContainer">
        {results?.map((res, index) => {
          return (
            <div key={index} >
              {res.nombre_localidad === 'CABA' ? (
                <div className="Result">
                  <div>
                    <span>Calle: </span>
                    <span>{res.nombre_calle}</span>
                  </div>
                  <div>
                    <span>Dirección: </span>
                    <span>{res.direccion}</span>
                  </div>
                </div>
              ) : (null)}
            </div>
          )
        })}
        </div>
        <span>{errorMessage}</span>
      </div>
    </div>
  );
}

export default App;
