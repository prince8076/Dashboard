import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Spinner, Alert } from 'reactstrap';
import './ProjectStats.css';

const ProjectStats = () => {
  const [projectsData, setProjectsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/records');
      setProjectsData(response.data);
      console.log('Records fetched successfully from server:', response.data);
    } catch (error) {
      console.error('Error fetching project statistics:', error);
      setError('Failed to fetch project statistics. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Project Statistics</h2>
      {loading ? (
        <div className="spinner-container">
          <Spinner color="primary" />
        </div>
      ) : error ? (
        <Alert color="danger" className="error-alert">
          {error}
        </Alert>
      ) : (
        <Table striped bordered hover responsive className="table">
          <thead>
            <tr>
              <th>No.</th>
              <th>Title</th>
              <th>Start Date</th>
              <th>End Date</th>
            </tr>
          </thead>
          <tbody>
            {projectsData.map((project, index) => (
              <tr key={project._id}>
                <td>{index + 1}</td>
                <td>{project.title}</td>
                <td>{new Date(project.added).toLocaleDateString()}</td>
                <td>{new Date(project.published).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default ProjectStats;
