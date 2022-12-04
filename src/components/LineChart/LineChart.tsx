//react
import React from 'react';
//additional
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import dayjs from "dayjs";
import IsoWeek from 'dayjs/plugin/isoWeek';
import Weekday from 'dayjs/plugin/weekday'
//types
import { iProjectsColumnTypes } from "../../features/projects-table/types/projects-column-types";
//styles
import './LineChart.scss'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

dayjs.extend(IsoWeek)
dayjs.extend(Weekday)

const calcDate = (columns: iProjectsColumnTypes[]) => {
  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  const weekResult = [0, 0, 0, 0, 0, 0, 0]
  const completedTasks = columns.filter(column => column.columnType === 'completed').map(column => column.projectTasksList)[0]
  weekDays.map((day, index) => {
    if (completedTasks !== undefined){
      return completedTasks.map(task => day === dayjs(task.dateCompleted).format('dddd') ? weekResult[index] += 1 : weekResult[index])
    }
  })

  return weekResult
}

const LineChart: React.FC<{ columns: iProjectsColumnTypes[] }> = ({columns}) => {
  return (
    <div className="line-chart">
      <h3 className="doughnut-chart__title">Total completed tasks</h3>
      <div className="line-chart__chart">
        <Line
          options={{
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  stepSize: 1,
                },
                grid: {
                  color: '#1A1C1E'
                }
              },
              x: {
                grid: {
                  color: '#1A1C1E'
                }
              }
            }
          }}
          data={{
            labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            datasets: [{
              label: 'Completed tasks',
              data:  calcDate(columns),
              borderColor: '#313638',
              backgroundColor: '#111315',
            }],
          }}
        />
      </div>
    </div>
  );
};

export { LineChart };
