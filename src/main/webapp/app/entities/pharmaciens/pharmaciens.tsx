import { useAppDispatch, useAppSelector } from 'app/config/store';
import React, { useEffect, useState } from 'react';
import { Button, Col, Input, Label, Row } from 'reactstrap';
import { getEntities as getZoneEntities } from '../zone/zone.reducer';
import { useNavigate } from 'react-router';
import { getEntities as getVilleEntities } from '../ville/ville.reducer';
import LoadingSpinner from 'app/shared/components/LoadingSpinner';
import { getPharmaciens } from './pharmaciens.reducer';
import PharmacienTable from './pharmacien-table';

const Pharmaciens = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [zone, setZone] = useState<string>('');
  const [ville, setVille] = useState<string>('');
  const [filteredVilleList, setFilteredVilleList] = useState([]);
  const zoneList = useAppSelector(state => state.zone.entities);
  const villeList = useAppSelector(state => state.ville.entities);
  const loading = useAppSelector(state => state.pharmaciens.loading);
  const pharmaciens = useAppSelector(state => state.pharmaciens.pharmaciens);
  const [isLoading, setIsLoading] = useState(false);
  const [completed, setCompleted] = useState(false);

  const handleFetch = () => {
    // console.log(zone, ville);
    // console.log(loading);
    setIsLoading(true);
    setCompleted(false);
    dispatch(
      getPharmaciens({
        zone,
        ville,
      }),
    );
  };

  const getAllEntities = () => {
    dispatch(
      getZoneEntities({
        sort: ``,
      }),
    );
    dispatch(
      getVilleEntities({
        sort: ``,
      }),
    );
  };
  useEffect(() => {
    getAllEntities();
  }, []);

  useEffect(() => {
    if (!loading) {
      setIsLoading(false);
      setCompleted(true);
    }
  }, [loading]);

  return (
    <div className="container mt-5">
      <Row>
        <Col xs={6}>
          <h1>Pharmaciens</h1>
        </Col>
      </Row>
      <Row className="mt-2">
        <Col>
          <div className="mb-3">
            <Label className="h4">Select an Ville:</Label>
            <Input
              value={ville}
              onChange={event => {
                setVille(event.target.value);
                const zones = zoneList.filter(zone => zone.ville.id === parseInt(event.target.value, 5));
                setFilteredVilleList(zones);
                if (zones.length > 0) {
                  setZone(zones[0].id);
                } else {
                  setZone('');
                }
              }}
              className="w-50"
              id="exampleSelect"
              name="select"
              type="select"
            >
              {villeList &&
                villeList.map((ville, i) => (
                  <option value={ville.id} key={ville.id}>
                    {ville.nom}
                  </option>
                ))}
            </Input>
          </div>
        </Col>
        <Col>
          <div className="mb-3">
            <Label className="h4">Select a Zone:</Label>
            <Input
              className="w-50"
              id="exampleSelect"
              name="select"
              type="select"
              disabled={zone === ''}
              value={ville}
              onChange={event => {
                setZone(event.target.value);
              }}
            >
              {filteredVilleList &&
                filteredVilleList.map((zone, i) => (
                  <option value={zone.id} key={zone.id}>
                    {zone.nom}
                  </option>
                ))}
            </Input>
          </div>
        </Col>
      </Row>
      <div className="mb-3">
        <Button
          color="info"
          onClick={() => {
            setZone('');
            setVille('');
          }}
        >
          Reset
        </Button>
        <Button color="primary" disabled={zone === '' || ville === ''} onClick={handleFetch}>
          Fetch
        </Button>
      </div>
      {isLoading && <LoadingSpinner />}
      {completed && <PharmacienTable pharmaciens={pharmaciens} />}
    </div>
  );
};

export default Pharmaciens;
