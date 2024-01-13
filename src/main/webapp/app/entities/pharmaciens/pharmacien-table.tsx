import React from 'react';

const PharmacienTable = ({ pharmaciens }: { pharmaciens: any }) => {
  return (
    <div className="card">
      <div className="card-header border-0">
        <div className="row">
          <div className="col-6">
            <h3 className="mb-0">List of Pharmacysts</h3>
          </div>
        </div>
      </div>
      <div className="table-responsive">
        <table className="table align-items-center table-flush">
          <thead className="thead-light">
            <tr>
              <th>Nom</th>
              <th>Prenom</th>
              <th>Email</th>
              {/*<th></th>*/}
            </tr>
          </thead>
          <tbody>
            {Array.isArray(pharmaciens)
              ? pharmaciens.map((pharmacien, i) => (
                  <tr key={i}>
                    <td className="table-user">
                      {pharmacien.user.imageUrl ? (
                        <img src={`/content/images/uploads/${pharmacien.user.imageUrl}`} className="avatar rounded-circle mr-3" />
                      ) : (
                        <img src={`/content/images/uploads/user.png`} className="avatar rounded-circle mr-3" />
                      )}
                      {pharmacien.user.firstName && pharmacien.user.lastName && (
                        <b>{`${pharmacien.user.firstName} ${pharmacien.user.lastName}`}</b>
                      )}
                    </td>
                    <td>
                      <span className="font-weight-bold text-uppercase">{pharmacien.nom}</span>
                      &nbsp;
                      <span className="font-weight-bold text-uppercase">{pharmacien.prenom}</span>
                    </td>
                    <td>{pharmacien.email}</td>
                    <td className="table-actions">
                      <a
                        href={`/profile/${pharmacien.id}`}
                        style={{
                          fontSize: '1.3rem',
                        }}
                        className="table-action"
                        data-toggle="tooltip"
                        data-original-title="Edit product"
                      >
                        <i className="fas fa-user-edit"></i>
                      </a>
                    </td>
                  </tr>
                ))
              : null}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PharmacienTable;
