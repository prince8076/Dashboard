import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Grid } from '@mui/material';

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

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
                <Card>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            Analytics Overview
                        </Typography>
                        <Typography variant="body2">
                            Total Records: {analyticsSummary.totalRecords}
                        </Typography>
                        <Typography variant="body2">
                            Unique Topics: {analyticsSummary.uniqueTopics}
                        </Typography>
                        <Typography variant="body2">
                            Unique Regions: {analyticsSummary.uniqueRegions}
                        </Typography>
                        <Typography variant="body2">
                            Total Intensity: {analyticsSummary.totalIntensity}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} md={6}>
                <Card>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            Project Overview
                        </Typography>
                        <Typography variant="body2">
                            Total Records: {projectSummary.totalRecords}
                        </Typography>
                        <Typography variant="body2">
                            Unique Countries: {projectSummary.uniqueCountries}
                        </Typography>
                        <Typography variant="body2">
                            Total Likelihood: {projectSummary.totalLikelihood}
                        </Typography>
                        <Typography variant="body2">
                            Total Relevance: {projectSummary.totalRelevance}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default DashboardOverview;
