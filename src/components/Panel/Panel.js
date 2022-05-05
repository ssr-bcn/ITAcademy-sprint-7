import { useEffect, useState } from 'react';
import StyledPanel from "./Panel.styles";
import CustomInput from '../CustomInput/CustomInput';

const Panel = props => {
  const [pages, setPages] = useState(1);
  const [languages, setLanguages] = useState(1);
  const [setExtra] = props.stateProps;

  const handleChange = e => {
    const setter = e.target.id === 'pages' ? setPages : setLanguages;
    const value = +e.target.value;
    const check = Number.isInteger(value) && value >= 0;

    if (check) setter(value);
  }

  useEffect( () => {
    setExtra( pages * languages * 30 ); // eslint-disable-next-line
  }, [pages, languages]);

  useEffect( () => {
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
