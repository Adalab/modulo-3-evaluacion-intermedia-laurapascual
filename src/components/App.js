import '../styles/App.scss';
import {useEffect, useState} from 'react';
/* import quotesData from "../data/friendsData.json";  */
import callToApi from '../services/api';
import ls from '../services/localStorage';

const App = () => {

const [quotes, setQuotes] = useState(ls.get('newQuote', '') || []);
const [searchQuote, setSearchQuote] = useState('');
const [selectCharacter, setSelectCharacter] = useState('all');
const [newQuote, setNewQuote] = useState({
  quote:'',
  character:'',
});
const [error, setError] = useState(false);

useEffect(() => {
  if(quotes.length === 0) {
     callToApi().then((response) => {
      setQuotes(response);
    });
  }
  }, []); 

useEffect(() => {
      ls.set('newQuote', quotes)
}, [quotes]);   

const handleSearchQuote = (ev) => {
    setSearchQuote(ev.target.value);
} 

const handleSelectCharacter = (ev) => {
  setSelectCharacter(ev.target.value);
}

const handleInput = (ev) => {
  const inputValue = ev.target.value;
  const inputName = ev.target.name;
  setNewQuote({ ...newQuote, [inputName]: inputValue });  
};

const handleAddQuote = (ev) => {
  ev.preventDefault();
  if(!(newQuote.quote === '' || newQuote.character === '')) {
    setQuotes([...quotes,newQuote]);
    setError(false);
    setNewQuote({
    quote:'',
    character:'',
    })} else { setError(true) }
} 

const renderFriend = () => {
  return (quotes
  .filter ((friendsQuote) => {
      return friendsQuote.quote.toLowerCase().includes(searchQuote.toLowerCase());
  }) 
  .filter ((friendsQuote) => {
    if (selectCharacter === 'all') {
      return true
    } else {
      return friendsQuote.character === selectCharacter
    }
  })  
  .map((quote, index) => {
    return (
      <li className="quote" key={index}> 
        <p>{quote.quote}</p>
        <p className="quote__character"> {quote.character}</p>
      </li>
    )
  })
)};

  return (
    <div>
      <header>
        <h1 className="header__title">Frases de Friends</h1>
        <form className="header__form">
          <label htmlFor='search'>Filtrar por frase</label>
          <input
            className="quote__input"
            autoComplete="off"
            type="search"
            name="search"
            value={searchQuote}
            onChange={handleSearchQuote}
          /> 
          <label htmlFor="select">Filtrar por personaje: </label>
          <select
            id="select"
            name="select"
            onChange={handleSelectCharacter}
          >
            <option value="all">Todos</option>
            <option value="Ross">Ross</option>
            <option value="Monica">Monica</option>
            <option value="Joey">Joey</option>
            <option value="Phoebe">Phoebe</option>
            <option value="Chandler">Chandler</option>
            <option value="Rachel">Rachel</option>
          </select>
        </form> 
      </header>

      <main>
        <ul className="quotes__list">{renderFriend()}</ul>

        <form className="new-quote__form">
          <h2 className="new-quote__title">Añade una nueva frase</h2>
           <label htmlFor="quote">Frase </label>
          <input
            className="quote__input"
            type="text"
            name="quote"
            id="quote"
            onChange={handleInput}
            value={newQuote.quote}
          />
          <label htmlFor="character">Personaje </label>
          <input
            className="quote__input"
            type="text"
            name="character"
            id="character"
            onChange={handleInput}
            value={newQuote.character}
          />
          <input className="new-quote__btn" type="submit" value="Añadir una nueva frase" onClick={handleAddQuote}/>
          {error && <p>Faltan datos por rellenar</p>}
        </form> 
      </main>
    </div>
  );
}

export default App;
