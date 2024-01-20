import pharmacie from 'app/entities/pharmacie/pharmacie.reducer';
import garde from 'app/entities/garde/garde.reducer';
import pharmacieGarde from 'app/entities/pharmacie-garde/pharmacie-garde.reducer';
import pharmacien from 'app/entities/pharmacien/pharmacien.reducer';
import zone from 'app/entities/zone/zone.reducer';
import ville from 'app/entities/ville/ville.reducer';
import pharmaciens from 'app/entities/pharmaciens/pharmaciens.reducer';
import pharmacyGarde from 'app/entities/pharmacist-home/pharmacist.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

const entitiesReducers = {
  pharmacyGarde,
  pharmaciens,
  pharmacie,
  garde,
  pharmacieGarde,
  pharmacien,
  zone,
  ville,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
};

export default entitiesReducers;
