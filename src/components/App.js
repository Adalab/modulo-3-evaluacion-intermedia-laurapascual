import '../styles/App.scss';
import {useEffect, useState} from 'react';
import quotesData from "../data/friendsData.json"; 
import callToApi from '../services/api';

const App = () => {

const [quotes, setQuotes] = useState(quotesData);
const [searchQuote, setSearchQuote] = useState('');
const [selectCharacter, setSelectCharacter] = useState('all');
const [newQuote, setNewQuote] = useState({
  quote:'',
  character:'',
});

/* useEffect(() => {
    callToApi().then((response) => {
      setQuotes(response);
    });
  }, []); */

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
  setQuotes([...quotes,newQuote]);
  setNewQuote({
  quote:'',
  character:'',
})
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
      <li className="quote__item" key={index}> 
        <p className="quote__quotes">{quote.quote}</p>
        <p className="quote__author">{quote.character}</p>
      </li>
    )
  })
)};

  return (
    <div>
      <header>
        <h1 className="header__title">Frases de Friends</h1>
        <form>
          <label htmlFor='search'>Filtrar por frase</label>
          <input
            className="header__search"
            autoComplete="off"
            type="search"
            name="search"
            value={searchQuote}
            onChange={handleSearchQuote}
          /> 
          <label htmlFor="select">Filtrar por personaje: </label>
          <select
            className=""
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
          <input
            className="new-quote__input"
            type="text"
            name="quote"
            id="quote"
            placeholder="Frase"
            onChange={handleInput}
            value={newQuote.quote}
          />
          <input
            className="new-character__input"
            type="text"
            name="character"
            id="character"
            placeholder="Personaje"
            onChange={handleInput}
            value={newQuote.character}
          />
          <input className="new-quote__btn" type="submit" value="Añadir una nueva frase" onClick={handleAddQuote}/>
        </form> 
      </main>
    </div>
  );
}

export default App;
