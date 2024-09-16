import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const DashboardOverview = () => {
    const [analyticsSummary, setAnalyticsSummary] = useState({
        totalRecords: 0,
        uniqueTopics: 0,
        uniqueRegions: 0,
        totalIntensity: 0
    });
    const [projectSummary, setProjectSummary] = useState({
        totalRecords: 0,
        uniqueCountries: 0,
        totalLikelihood: 0,
        totalRelevance: 0
    });

    useEffect(() => {
        fetchAnalyticsSummary();
        fetchProjectSummary();
    }, []);

    const fetchAnalyticsSummary = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/records');
            const records = response.data;

            const uniqueTopics = new Set(records.map(record => record.topic)).size;
            const uniqueRegions = new Set(records.map(record => record.region)).size;
            const totalIntensity = records.reduce((sum, record) => sum + (record.intensity || 0), 0);

            setAnalyticsSummary({
                totalRecords: records.length,
                uniqueTopics,
                uniqueRegions,
                totalIntensity
            });
        } catch (error) {
            console.error('Error fetching analytics summary:', error);
        }
    };

    const fetchProjectSummary = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/records');
            const records = response.data;

            const uniqueCountries = new Set(records.map(record => record.country)).size;
            const totalLikelihood = records.reduce((sum, record) => sum + (record.likelihood || 0), 0);
            const totalRelevance = records.reduce((sum, record) => sum + (record.relevance || 0), 0);

            setProjectSummary({
                totalRecords: records.length,
                uniqueCountries,
                totalLikelihood,
                totalRelevance
            });
        } catch (error) {
            console.error('Error fetching project summary:', error);
        }
    };

    const pieData = [
        { name: 'Unique Topics', value: analyticsSummary.uniqueTopics },
        { name: 'Unique Regions', value: analyticsSummary.uniqueRegions },
    ];

    const barData = [
        { name: 'Likelihood', value: projectSummary.totalLikelihood },
        { name: 'Relevance', value: projectSummary.totalRelevance },
        { name: 'Intensity', value: analyticsSummary.totalIntensity },
    ];

    return (
        <Grid container spacing={3}>
            {/* Analytics Overview with Pie Chart */}
            <Grid item xs={12} md={6}>
                <Card>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            Analytics Overview
                        </Typography>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    label
                                    outerRadius={100}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                        <Typography variant="body2">
                            Total Records: {analyticsSummary.totalRecords}
                        </Typography>
                        <Typography variant="body2">
                            Total Intensity: {analyticsSummary.totalIntensity}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>

            {/* Project Overview with Bar Chart */}
            <Grid item xs={12} md={6}>
                <Card>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            Project Overview
                        </Typography>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={barData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="value" fill="#82ca9d" />
                            </BarChart>
                        </ResponsiveContainer>
                        <Typography variant="body2">
                            Total Records: {projectSummary.totalRecords}
                        </Typography>
                        <Typography variant="body2">
                            Unique Countries: {projectSummary.uniqueCountries}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default DashboardOverview;
