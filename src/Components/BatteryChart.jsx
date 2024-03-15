import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const labels = [
  "Lightweight",
  "Middleweight",
  "Cruiserweight",
  "Heavyweight",
];

export const options = {
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'EVTOL Battery levels',
    },
  },
};

const BatteryChart = ({evtols}) => {

  const data = {
    maintainAspectRatio: false,
    labels,
    datasets: [
      {
        label: 'Dataset',
        data: evtols.map((evtol) => evtol.percentage),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  return ( 
      <Line options={options} data={data} style={{ height: 350, width: 800 }}/>
  );
}

export default BatteryChart;