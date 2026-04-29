import Chart from '../components/Chart/Chart.jsx';
import StatisticsDashboard from '../components/StatisticsDashboard/StatisticsDashboard.jsx';
import StatisticsTable from '../components/StatisticsTable/StatisticsTable.jsx';
import './StatisticsTab.css';

function StatisticsTab() {
  return (
    <section className="statistics-tab">
      <StatisticsDashboard />
      <Chart />
      <StatisticsTable />
    </section>
  );
}

export default StatisticsTab;
