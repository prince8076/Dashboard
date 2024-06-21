import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line, Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import Filters from "../Filtter";
import './AnalyticsOverview.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const AnalyticsOverview = () => {
  const [analyticsData, setAnalyticsData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({
    endYear: '',
    topic: '',
    sector: '',
    region: '',
    pestle: '',
    source: '',
    swot: '',
    country: '',
    city: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get('http://localhost:5000/api/records')
      .then(response => {
        setAnalyticsData(response.data);
        setFilteredData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  };

  useEffect(() => {
    applyFilters();
  }, [filters, analyticsData]);

  const applyFilters = () => {
    let data = analyticsData;

    // filters based on state
    if (filters.endYear) {
      data = data.filter(d => d.end_year === filters.endYear);
    }
    if (filters.topic && typeof filters.topic === 'string') {
      data = data.filter(d => d.topic.toLowerCase().includes(filters.topic.toLowerCase()));
    }
    if (filters.sector && typeof filters.sector === 'string') {
      data = data.filter(d => d.sector.toLowerCase().includes(filters.sector.toLowerCase()));
    }
    if (filters.region && typeof filters.region === 'string') {
      data = data.filter(d => d.region.toLowerCase().includes(filters.region.toLowerCase()));
    }
    if (filters.pestle && typeof filters.pestle === 'string') {
      data = data.filter(d => d.pestle.toLowerCase().includes(filters.pestle.toLowerCase()));
    }
    if (filters.source && typeof filters.source === 'string') {
      data = data.filter(d => d.source.toLowerCase().includes(filters.source.toLowerCase()));
    }
    if (filters.swot && typeof filters.swot === 'string') {
      data = data.filter(d => d.swot.toLowerCase().includes(filters.swot.toLowerCase()));
    }
    if (filters.country && typeof filters.country === 'string') {
      data = data.filter(d => d.country.toLowerCase().includes(filters.country.toLowerCase()));
    }
    if (filters.city && typeof filters.city === 'string') {
      data = data.filter(d => {
        return typeof d.city === 'string' && d.city.toLowerCase().includes(filters.city.toLowerCase());
      });
    }

    setFilteredData(data);
  };


  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  const generateLineChartData = (data) => ({
    labels: data.map(d => d.published),
    datasets: [
      {
        label: 'Intensity',
        data: data.map(d => d.intensity),
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        fill: false
      },
      {
        label: 'Likelihood',
        data: data.map(d => d.likelihood),
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 2,
        fill: false
      },
      {
        label: 'Relevance',
        data: data.map(d => d.relevance),
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 2,
        fill: false
      }
    ]
  });

  const generateBarChartData = (data) => ({
    labels: data.map(d => d.country),
    datasets: [
      {
        label: 'Intensity',
        data: data.map(d => d.intensity),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      },
      {
        label: 'Likelihood',
        data: data.map(d => d.likelihood),
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1
      },
      {
        label: 'Relevance',
        data: data.map(d => d.relevance),
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 1
      }
    ]
  });

  const generatePieChartData = (data) => {
    // Group data by country and calculate total intensity for each country
    const groupedData = data.reduce((acc, curr) => {
      if (curr.country in acc) {
        acc[curr.country] += curr.intensity;
      } else {
        acc[curr.country] = curr.intensity;
      }
      return acc;
    }, {});

    // Extract labels (countries) and data (total intensity) from grouped data
    const labels = Object.keys(groupedData);
    const intensityData = Object.values(groupedData);

    // Step 3: Generate random colors for the pie chart slices
    const backgroundColors = labels.map(() => `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.2)`);
    const borderColors = labels.map(() => `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`);

    // Step 4: Construct the datasets array for the Pie chart
    const datasets = [
      {
        label: 'Country',
        data: intensityData,
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 1
      }
    ];

    return { labels, datasets };
  };

  return (
    <div className="analytics-container">
      <h2>Analytics Overview</h2>
      <Filters filters={filters} handleFilterChange={handleFilterChange} />
      <div className="chart-container">
        <div className="chart">
          <Line data={generateLineChartData(filteredData)} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
        <div className="chart">
          <Bar data={generateBarChartData(filteredData)} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
        <div className="chart">
          <Pie data={generatePieChartData(filteredData)} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
      </div>
    </div>
  );
};

export default AnalyticsOverview;
