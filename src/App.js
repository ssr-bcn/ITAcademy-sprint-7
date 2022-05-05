import { useState, useEffect } from 'react';

function App() {
  const [web, setWeb] = useState(0);
  const [seo, setSeo] = useState(0);
  const [ads, setAds] = useState(0);
  const [budget, setBudget] = useState(0);

  useEffect( () => {
    setBudget( web +seo +ads );
  }, [web, seo, ads]);

  return (
    <>
      <section>
        <h2>Què vols fer?</h2>
        <ul>
          <li>
            <input type="checkbox" id="web" value="500" onChange={e => setWeb( web === 0 ? +e.target.value : 0 )} />
            <label htmlFor="web">Una pàgina web (500€)</label>
          </li>
          <li>
            <input type="checkbox" id="seo" value="300" onChange={e => setSeo( seo === 0 ? +e.target.value : 0 )} />
            <label htmlFor="seo">Una consultoria SEO (300€)</label>
          </li>
          <li>
            <input type="checkbox" id="ads" value="200" onChange={e => setAds( ads === 0 ? +e.target.value : 0 )} />
            <label htmlFor="ads">Una campanya de Google Ads (200€)</label>
          </li>
        </ul>
        <p>Preu: {budget}€</p>
      </section>
    </>
  );
}

export default App;
