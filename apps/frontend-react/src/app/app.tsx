import { ApiCountry, Country, CountryList } from "@fh-sfr-frontend/util-types";
import { AutoCompleteWebComponent } from "@fh-sfr-frontend/web-components";
import { useEffect, useRef, useState } from "react";

export function App() {
  const counter = useRef<AutoCompleteWebComponent>(null);
  const [currentCountry, setCurrentCountry] = useState<Country | null>(null);
  const [countryList, setCountryList] = useState<CountryList>([]);

  const handleOnBlur = (country: Event) => {
    const countryName = country as unknown as { detail: { name: string } };
    setCurrentCountry(countryName.detail || null);
  };

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/region/europe")
      .then((response) => response.json())
      .then((actualData) =>
        setCountryList(
          actualData.map((v: ApiCountry) => {
            return { name: v.name.common };
          })
        )
      )
      .catch((err) => {
        console.error(err.message);
      });
  }, []);

  useEffect(() => {
    const counterRef = counter.current;
    if (counterRef) {
      counterRef.countries = countryList;
      counterRef.addEventListener("onBlur", handleOnBlur);
    }
    return () => {
      if (counterRef) {
        counterRef.removeEventListener("onBlur", handleOnBlur);
      }
    };
  });

  return (
    <div style={{width: "640px", margin: "0 auto", textAlign: "center"}}>
      <h1>React Country Chooser</h1>

      <p>
        This is your current country: <strong>{currentCountry?.name || "Null"}</strong>
      </p>

      <ui-autocomplete-web-component ref={counter}></ui-autocomplete-web-component>
    </div>
  );
}

export default App;
