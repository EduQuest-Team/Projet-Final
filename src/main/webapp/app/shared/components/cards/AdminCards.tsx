import React from 'react';

type AdminCardsProps = {
  villeCount: number;
  zoneCount: number;
  pharmacieCount: number;
};

const AdminCards = ({ villeCount, zoneCount, pharmacieCount }: AdminCardsProps) => {
  return (
    <div className="row">
      <div className="col-xl-3 col-md-6">
        <div className="card card-stats">
          <div className="card-body">
            <div className="row">
              <div className="col">
                <h5 className="card-title text-uppercase text-muted mb-0">Number of Cities</h5>
                <span className="h2 font-weight-bold mb-0">{villeCount}</span>
              </div>
              <div className="col-auto">
                <div className="icon icon-shape bg-gradient-red text-white rounded-circle shadow">
                  <i className="ni ni-active-40"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-xl-3 col-md-6">
        <div className="card card-stats">
          <div className="card-body">
            <div className="row">
              <div className="col">
                <h5 className="card-title text-uppercase text-muted mb-0">Number of Zones</h5>
                <span className="h2 font-weight-bold mb-0">{zoneCount}</span>
              </div>
              <div className="col-auto">
                <div className="icon icon-shape bg-gradient-orange text-white rounded-circle shadow">
                  <i className="ni ni-chart-pie-35"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-xl-3 col-md-6">
        <div className="card card-stats">
          <div className="card-body">
            <div className="row">
              <div className="col">
                <h5 className="card-title text-uppercase text-muted mb-0">Number of Pharmacies</h5>
                <span className="h2 font-weight-bold mb-0">{pharmacieCount}</span>
              </div>
              <div className="col-auto">
                <div className="icon icon-shape bg-gradient-green text-white rounded-circle shadow">
                  <i className="ni ni-money-coins"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCards;
