import { useEffect, useState } from "react";
import { masks, showLoadingAnimation } from "../../utils";
import { getApiCep } from "../../server"
import './styles.scss';

export function ApiCep() {
  const initialData = {
    bairro: "",
    localidade: "",
    logradouro: "",
    uf: "",
  }
  const [cep, setCep] = useState('');
  const [error, setError] = useState(null);
  const [data, setData] = useState(initialData);  

  useEffect(() => {
    async function handleCep() {
      showLoadingAnimation(false, ".cep-input", true)
      if(cep.length === 9) {
        showLoadingAnimation(true, ".cep-input", true)
        const response = await getApiCep(cep);
        if(response?.erro) {
          setError('O cep não foi encontrado na base de dados');
          setData(initialData);
        } else {
          setData(response);
          setError(null);
        }
        showLoadingAnimation(false, ".cep-input", true);
      }
    }

    handleCep()
    
  }, [cep])

  return(
    <section className="container" id="api-cep">

      <div className='title'>
        <img src='src/assets/cep.png' alt='Imagem de um mapa' />
        <h2>Buscar Cep</h2>
      </div>

      <div className="form">
        <label className="loading-anchor">
          CEP
          <input 
            type="text" 
            className="input cep-input" id="cep" 
            value={masks.cep(cep)} 
            onChange={e => setCep(e.target.value)} 
          />
        </label>

        <label className="loading-anchor">
          ESTADO
          <input 
            type="text" 
            className="input cep-input" value={data?.uf} 
            onChange={e => setData(prevent => {return {...prevent, uf: e.target.value}})}
          />
        </label>

        <label className="loading-anchor">
          CIDADE
          <input 
            type="text" 
            className="input cep-input" 
            value={data?.localidade} 
            onChange={e => setData(prevent => {return {...prevent, localidade: e.target.value}})} 
          />
        </label>

        {error && <span>{error}</span>}

        <label className="loading-anchor">
          BAIRRO
          <input 
            type="text" 
            className="input cep-input" 
            value={data?.bairro} onCh
            ange={e => setData(prevent => {return {...prevent, bairro: e.target.value}})} 
          />
        </label>

        <label className="loading-anchor">
          ENDEREÇO
          <input 
            type="text" 
            className="input cep-input" 
            value={data?.logradouro} 
            onChange={e => setData(prevent => {return {...prevent, logradouro: e.target.value}})}  
          />
        </label>
      </div>
    </section>
  )
}