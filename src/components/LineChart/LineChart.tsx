//react
import React from 'react';
//firebase
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
import { iUserSlice } from "../../app/user-slice";
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

const calcDate = ({columns}: { columns: iProjectsColumnTypes[] }) => {
  const daysOfTheWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  const countToDaysArr = [0, 0, 0, 0, 0, 0, 0]
  const countToDays = {
    'Monday': 0,
    'Tuesday': 0,
    'Wednesday': 0,
    'Thursday': 0,
    'Friday': 0,
    'Saturday': 0,
    'Sunday': 0,
  }
  const currentDate = dayjs().format('YYYY-MM-DD')
  //getting completed tasks list
  const completedTasksList = columns.filter(column => column.columnType === 'completed')[0].projectTasksList
  //filtering all completed tasks by last 7 days
  const tasks = completedTasksList.filter(task => dayjs(currentDate).diff(task.dateCompleted, 'day') <= 7)
  //saving data to array by day for chart
  tasks.map(task => {
    const dayWhenTaskCompleteInDigit = dayjs(task.dateCompleted).isoWeekday()
    countToDays[daysOfTheWeek[dayWhenTaskCompleteInDigit - 1]] += 1
    countToDaysArr[dayWhenTaskCompleteInDigit - 1] += 1
  })

  return countToDaysArr
}

const LineChart: React.FC<{ data: iUserSlice }> = ({data}) => {
  return (
    <div className="line-chart">
      <div className="line-chart__chart">
        <Line
          options={{
            maintainAspectRatio: false,
            scales: {
              y: {
                grid: {
                  color: '#111315'
                }
              },
              x: {
                grid: {
                  color: '#111315'
                }
              }
            }
          }}
          data={{
            labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            datasets: data.columns.map((column: iProjectsColumnTypes) => ({
              label: column.title,
              data: calcDate(data),
            })),
          }}
        />
      </div>
    </div>
  );
};

export { LineChart };
