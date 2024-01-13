import pharmacie from 'app/entities/pharmacie/pharmacie.reducer';
import garde from 'app/entities/garde/garde.reducer';
import pharmacieGarde from 'app/entities/pharmacie-garde/pharmacie-garde.reducer';
import pharmacien from 'app/entities/pharmacien/pharmacien.reducer';
import zone from 'app/entities/zone/zone.reducer';
import ville from 'app/entities/ville/ville.reducer';
import historique from 'app/entities/historique/historique.reducer';
import position from 'app/entities/position/position.reducer';
import pharmaciens from 'app/entities/pharmaciens/pharmaciens.reducer';
import pharmacy from 'app/entities/my-pharmacy/pharmacy.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

const entitiesReducers = {
  pharmacy,
  pharmaciens,
  pharmacie,
  garde,
  pharmacieGarde,
  pharmacien,
  zone,
  ville,
  historique,
  position,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
};

export default entitiesReducers;
