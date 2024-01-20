import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import { Input, Label } from 'reactstrap';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import axios from 'axios';
import { getEntities } from 'app/entities/pharmacien/pharmacien.reducer';

Chart.register(CategoryScale);

interface ChartCardProps {
  subtitle: string;
  title: string;
}

const LineChart = ({ subtitle, title }: ChartCardProps) => {
  const dispatch = useAppDispatch();
  const pharmacienList = useAppSelector(state => state.pharmacien.entities);
  const loading = useAppSelector(state => state.pharmacien.loading);

  // const loading = useAppSelector(state => state.pharmaciens.loading);

  // const pharmacien = useAppSelector(state => state.pharmacien.entity);
  // const pharmacy = useAppSelector(state => state.pharmaciens.pharmacie);

  const [pharmacien, setPharmacien] = useState(null);
  const [chartData, setChartData] = useState<any>(null);

  const getAllEntities = () => {
    dispatch(
      getEntities({
        sort: ``,
      }),
    );
  };

  useEffect(() => {
    getAllEntities();
  }, []);

  useEffect(() => {
    if (!loading) {
      if (pharmacienList.length > 0) {
        setPharmacien(pharmacienList[0].id);
      }
    }
    return () => {};
  }, [loading]);

  const handleChange = event => {
    // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(event.target.value);
    async () => {
      const resp = await axios.get<any>(`/api/stats/pharmacies/${event.target.value}`);
      // console.log(resp.data);
      setChartData(resp.data);
    };
    // try {
    //   const resp = await axios.get<any>(`/api/stats/pharmacies/${event.target.value}`);
    //   // console.log(resp.data);
    //   setChartData(resp.data);
    //   return Promise.resolve(); // or return something meaningful if needed
    // } catch (error) {
    //   // console.error("Error fetching data:", error);
    //   return Promise.reject(error); // or handle the error accordingly
    // }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h6 className="surtitle">{subtitle}</h6>
        <h5 className="h3 mb-0">{title}</h5>
      </div>
      <div className="card-body">
        <div className="chart">
          <div className="mb-3">
            <Input
              id="exampleSelect"
              name="select"
              type="select"
              // value={student}
              onChange={handleChange}
            >
              {pharmacienList &&
                pharmacienList.map((pharmacist, i) => (
                  <option value={pharmacist.id} key={pharmacist.id}>
                    {`${pharmacist.nom} ${pharmacist.prenom}`}
                    {/*{`${pharmacist.user?.firstName} ${pharmacist.user?.lastName}`}*/}
                  </option>
                ))}
            </Input>
          </div>
          {chartData && (
            <Line
              className="chart-canvas"
              data={chartData}
              options={{
                // responsive: true,
                plugins: {
                  // legend: {
                  //     position: 'top' as const,
                  // },
                },
                // plugins: {
                //     // title: {
                //     //   display: true,
                //     //   text: title,
                //     // },
                //     legend: {
                //         display: false,
                //     },
                // },
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default LineChart;
