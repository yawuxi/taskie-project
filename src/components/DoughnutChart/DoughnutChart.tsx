//react
import React from 'react';
//firebase
import { iProjectsColumnTypes } from "../../features/projects-table/types/projects-column-types";
//charts
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from "react-chartjs-2";
//styles
import './DoughnutChart.scss'

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart: React.FC<{ columns: iProjectsColumnTypes[] }> = ({columns}) => {
  return (
    <div className="doughnut-chart">
      <h3 className="doughnut-chart__title">Total tasks chart</h3>
      <div className="doughnut-chart__chart">
        <Doughnut
          options={{
            maintainAspectRatio: false,
          }}
          data={{
            labels: columns.map((column: iProjectsColumnTypes) => column.title),
            datasets: [
              {
                label: '# of Tasks',
                data: columns.map((column: iProjectsColumnTypes) => column.projectTasksList.length),
                backgroundColor: [
                  'rgba(255, 255, 255, 0.2)',
                  'rgba(204, 103, 9, 0.2)',
                  'rgba(55, 189, 107, 0.2)',
                ],
                borderColor: [
                  'rgba(255, 255, 255, 1)',
                  'rgba(204, 103, 9, 1)',
                  'rgba(55, 189, 107, 1)',
                ],
                borderWidth: 1,
              },
            ],
          }}
        />
      </div>
    </div>
  );
};

export { DoughnutChart };
