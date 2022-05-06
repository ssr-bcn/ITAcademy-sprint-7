import { useEffect, useState, useRef } from 'react';
import StyledPanel from "./Panel.styles";
import CustomInput from '../CustomInput/CustomInput';
import { setLocalStorage, getLocalStorage } from '../../Helpers/LocalStorage';

const Panel = props => {
  const [pages, setPages] = useState(1);
  const [languages, setLanguages] = useState(1);
  const [setExtra] = props.stateProps;

  const initializated = useRef(false);

  const handleChange = e => {
    const setter = e.target.id === 'pages' ? setPages : setLanguages;
    const value = +e.target.value;
    const check = Number.isInteger(value) && value >= 0;

    if (check) setter(value);
  }

  useEffect( () => {
    if (initializated.current) {
      setLocalStorage({pages, languages});
      setExtra( pages * languages * 30 );
    } // eslint-disable-next-line
  }, [pages, languages]);

  useEffect( () => {
    const states = {pages: setPages, languages: setLanguages};

    Object.keys(states).forEach( key => {
      states[key]( getLocalStorage(key, 1) );
    })

    initializated.current = true;

    return () => setExtra(0); // eslint-disable-next-line
  }, []);

  return (
    <StyledPanel>
      <div>
        <label htmlFor="pages">Quantitat de pàgines:</label>
        <CustomInput id="pages" action={handleChange} stateProps={[pages, setPages]} />
      </div>
      <div>
        <label htmlFor="languages">Quantitat d'idiomes:</label>
        <CustomInput id="languages" action={handleChange} stateProps={[languages, setLanguages]} />
      </div>
    </StyledPanel>
  );
}

export default Panel;
