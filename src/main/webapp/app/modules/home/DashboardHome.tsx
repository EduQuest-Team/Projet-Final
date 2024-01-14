import { useAppDispatch, useAppSelector } from 'app/config/store';
import AdminCards from 'app/shared/components/cards/AdminCards';
import BarChart, { generateRandomColors } from 'app/shared/components/charts/BarChart';
import { Data } from 'app/shared/components/charts/Test';
import React, { useEffect, useState } from 'react';
// import { fetchStatsData, getCountStats, getZonesPerCity } from './home.reducer';
import { fetchStatsData } from './home.reducer';
import LoadingSpinner from 'app/shared/components/LoadingSpinner';
import LineChart from 'app/shared/components/charts/LineChart';

const DashboardHome = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(state => state.dashboard.loading);
  const countStats = useAppSelector(state => state.dashboard.countStats);
  const zonesPerCity = useAppSelector(state => state.dashboard.zonesPerCity);
  // const pwsPerGroup = useAppSelector(state => state.dashboard.pwsPerGroup);

  const [zonesPerCityChart, setZonesPerCityChart] = useState({});
  // const [pwsPerGroupChart, setPwsPerGroupChart] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchStatsData());
    return () => {};
  }, [dispatch]);

  useEffect(() => {
    if (zonesPerCity && zonesPerCity.length > 0 && !loading) {
      const names = zonesPerCity.map(item => item.name);
      const counts = zonesPerCity.map(item => item.count);
      // const pwsNames = pwsPerGroup.map(item => item.name);
      // const pwsCounts = pwsPerGroup.map(item => item.count);
      setZonesPerCityChart({
        labels: names,
        datasets: [
          {
            label: 'Zones',
            data: counts,
            backgroundColor: generateRandomColors(counts.length),
            borderColor: 'black',
            borderWidth: 1,
          },
        ],
      });
      // setPwsPerGroupChart({
      //   labels: pwsNames,
      //   datasets: [
      //     {
      //       label: 'Practice work',
      //       data: pwsCounts,
      //       backgroundColor: generateRandomColors(pwsCounts.length),
      //       borderColor: 'black',
      //       borderWidth: 1,
      //     },
      //   ],
      // });
      setIsLoading(false);
    }
    return () => {};
  }, [loading]);

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="header-body mt-3">
            <AdminCards {...countStats} />
          </div>
          <div className="row">
            <div className="col-xl-6">
              <BarChart title="Number of zones per city" subtitle="Overview" chartData={zonesPerCityChart} />
            </div>
            {/*<div className="col-xl-6">*/}
            {/*  <BarChart title="Number of practice work per groups" subtitle="Overview" chartData={pwsPerGroupChart} />*/}
            {/*</div>*/}
          </div>
          <div className="row">
            <div className="col-xl-6">
              <LineChart title="Learning curve" subtitle="Overview" />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default DashboardHome;
