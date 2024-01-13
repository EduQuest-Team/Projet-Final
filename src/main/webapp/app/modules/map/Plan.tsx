import 'leaflet/dist/leaflet.css';
import React, { useEffect, useReducer, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { DNA } from 'react-loader-spinner';
import Select from 'react-select';
import Cards from './Card';
import Map from './Map';
import './Plan.css';

const gardeData = [
  { value: 0, label: 'Jour' },
  { value: 1, label: 'Nuit' },
];

// const URL = 'https://pharma.cyclic.app';
// const apiUrl = 'api';
const URL = 'api';

// const defaultCity = { value: 'city', label: 'Select City' };
// const defaultZone = { value: 'zone', label: 'Select Zone' };
// const defaultGarde = { value: 'garde', label: 'Select Garde' };
const defaultCity = { value: 0, label: 'Select City' };
const defaultZone = { value: 0, label: 'Select Zone' };
const defaultGarde = { value: 0, label: 'Select Garde' };

const initialState = {
  cities: [],
  city: 0,
  zones: [],
  zone: 0,
  garde: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_CITIES':
      return { ...state, cities: action.payload };
    case 'SET_CITY':
      return { ...state, city: action.payload };
    case 'SET_ZONES':
      return { ...state, zones: action.payload };
    case 'SET_ZONE':
      return { ...state, zone: action.payload };
    case 'SET_GARDE':
      return { ...state, garde: action.payload };
    default:
      throw new Error(`Unsupported action type: ${action.type}`);
  }
}

const Plan = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [pharmacies, setPharmacies] = useState(null);
  const [getData, setGetData] = useState(false);
  const [loading, setLoading] = useState(false);

  const isCity = !state.city;
  const isZone = !state.zone;
  const isGarde = !state.garde;

  useEffect(() => {
    //fetch(`${URL}/api/cities`)
    fetch(`${URL}/villes`)
      .then(response => response.json())
      .then(data => {
        const options = data.map(item => ({
          value: item.id,
          //label: item.name,
          label: item.nom,
          key: item.id,
        }));
        dispatch({ type: 'SET_CITIES', payload: options });
      })
      .catch(error => console.error(error));

    fetch(`${URL}/zones`)
      .then(response => response.json())
      .then(data => {
        const options = data.map(item => ({
          value: item.id,
          //label: item.name,
          label: item.nom,
          key: item.id,
        }));
        dispatch({ type: 'SET_ZONES', payload: options });
      })
      .catch(error => console.error(error));
  }, []);

  const handleCityChange = data => {
    dispatch({ type: 'SET_CITY', payload: data });
    dispatch({ type: 'SET_ZONE', payload: null });
    setGetData(false);
    handleGetZoneByVille(data);
  };

  const handleZoneChange = data => {
    dispatch({ type: 'SET_ZONE', payload: data });
    dispatch({ type: 'SET_GARDE', payload: null });
  };

  const handleGardeChange = data => {
    dispatch({ type: 'SET_GARDE', payload: data });
  };

  const handleGetZoneByVille = data => {
    if (state.city.value !== null) {
      fetch(`${URL}/zones/ville/${state.city.value}`)
        // fetch(`${URL}/zones`)
        .then(response => response.json())
        .then(data => {
          if (Array.isArray(data)) {
            const options = data.map(item => ({
              value: item.id,
              //label: item.name,
              label: item.nom,
              key: item.id,
            }));
            dispatch({ type: 'SET_ZONES', payload: options });
          }
        })
        .catch(error => console.error(error));
    }
  };

  const handleGetPharmacies = data => {
    setLoading(true);
    // get pharmacies from mongodb
    // fetch(`${URL}/pharmacies/${state.garde.value}/${state.zone.value}/${state.city.value}`)
    fetch(`${URL}/pharmacies/1/${state.zone.value}/${state.city.value}`)
      .then(response => response.json())
      .then(responseData => {
        if (Array.isArray(responseData)) {
          if (responseData.length) {
            setPharmacies(responseData);
          } else {
            dispatch({ type: 'SET_CITY', payload: null });
            dispatch({ type: 'SET_ZONE', payload: null });
            dispatch({ type: 'SET_GARDE', payload: null });
            // console.log('empty');
          }

          setLoading(false);
          setGetData(true);
        } else {
          console.error('API response is not an array:', responseData);
        }
      })
      /* eslint-disable no-console */
      // .catch(error => console.log(error));
      .catch(error => console.error(error));
  };

  const handleRestPharmacies = data => {
    dispatch({ type: 'SET_CITY', payload: null });
    dispatch({ type: 'SET_ZONE', payload: null });
    dispatch({ type: 'SET_GARDE', payload: null });
    setPharmacies(null);
    setGetData(false);
  };
  return (
    <div>
      <div className="d-flex justify-content-center container mainApp my-3 py-3 flex-fill">
        <div className="mx-3 flex-grow-1">
          <Select options={state.cities} defaultValue={defaultCity} value={state.city} onChange={handleCityChange} />
        </div>
        <div className="mx-3 flex-grow-1">
          <Select options={state.zones} defaultValue={defaultZone} value={state.zone} onChange={handleZoneChange} isDisabled={isCity} />
        </div>
        <div className="mx-3 flex-grow-1">
          <Select options={gardeData} defaultValue={defaultGarde} value={state.garde} onChange={handleGardeChange} isDisabled={isZone} />
        </div>
        <div className="mx-3">
          <Button onClick={handleGetPharmacies} variant="outline-primary" disabled={isGarde}>
            Search
          </Button>
          {pharmacies?.length && (
            <Button onClick={handleRestPharmacies} variant="outline-success" className="mx-2">
              Reset
            </Button>
          )}
        </div>
      </div>

      <div className="cardsContainer row mx-3 justify-content-center">
        {loading ? (
          <DNA visible={true} height="80" width="80" ariaLabel="dna-loading" wrapperStyle={{}} wrapperClass="dna-wrapper" />
        ) : getData ? (
          pharmacies?.length ? (
            <>
              <div className="my-3">
                <h3>
                  Nombre de pharmacies trouvées : <span className="text-success">{pharmacies.length}</span>
                </h3>
              </div>
              <Cards data={pharmacies} />
              <Map data={pharmacies} />
            </>
          ) : (
            <div>Not Found!</div>
          )
        ) : (
          <div>Search a Pharmacy</div>
        )}
      </div>
    </div>
  );
};

export default Plan;
