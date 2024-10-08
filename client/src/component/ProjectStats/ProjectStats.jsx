import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Spinner, Alert, Card, CardBody, CardTitle, Button } from 'reactstrap';
import { FaCalendarAlt, FaExclamationCircle } from 'react-icons/fa';
import './ProjectStats.css';

const ProjectStats = ({ searchTerm }) => {
  const [projectsData, setProjectsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const maxVisiblePages = 4;

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

  // Filter projects based on the search term
  const filteredRecords = projectsData.filter((project) =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredRecords.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(filteredRecords.length / recordsPerPage);

  const getPageNumbers = () => {
    const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    let pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="container">
      <Card className="project-stats-card">
        <CardBody>
          <CardTitle tag="h2">Project Statistics</CardTitle>
          {loading ? (
            <div className="spinner-container">
              <Spinner color="primary" />
            </div>
          ) : error ? (
            <Alert color="danger" className="error-alert">
              <FaExclamationCircle className="error-icon" /> {error}
            </Alert>
          ) : (
            <>
              <Table striped bordered hover responsive className="table">
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Title</th>
                    <th>
                      <FaCalendarAlt /> Start Date
                    </th>
                    <th>
                      <FaCalendarAlt /> End Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentRecords.map((project, index) => (
                    <tr key={project._id}>
                      <td>{indexOfFirstRecord + index + 1}</td>
                      <td>{project.title}</td>
                      <td>{new Date(project.added).toLocaleDateString()}</td>
                      <td>{new Date(project.published).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <div className="pagination-container">
                <Button
                  color="secondary"
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="pagination-button"
                >
                  Previous
                </Button>
                {getPageNumbers().map((pageNumber) => (
                  <Button
                    key={pageNumber}
                    color={currentPage === pageNumber ? 'primary' : 'secondary'}
                    onClick={() => setCurrentPage(pageNumber)}
                    className="pagination-button"
                  >
                    {pageNumber}
                  </Button>
                ))}
                <Button
                  color="secondary"
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="pagination-button"
                >
                  Next
                </Button>
              </div>
            </>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default ProjectStats;
