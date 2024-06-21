import React from 'react';

const Filters = ({ filters, handleFilterChange }) => {
    return (
        <div className="filters">
            <label>
                End Year:
                <input type="text" name="endYear" value={filters.endYear} onChange={handleFilterChange} />
            </label>
            <label>
                Topic:
                <input type="text" name="topic" value={filters.topic} onChange={handleFilterChange} />
            </label>
            <label>
                Sector:
                <input type="text" name="sector" value={filters.sector} onChange={handleFilterChange} />
            </label>
            <label>
                Region:
                <input type="text" name="region" value={filters.region} onChange={handleFilterChange} />
            </label>
            <label>
                PEST:
                <input type="text" name="pestle" value={filters.pestle} onChange={handleFilterChange} />
            </label>
            <label>
                Source:
                <input type="text" name="source" value={filters.source} onChange={handleFilterChange} />
            </label>
            <label>
                SWOT:
                <input type="text" name="swot" value={filters.swot} onChange={handleFilterChange} />
            </label>
            <label>
                Country:
                <input type="text" name="country" value={filters.country} onChange={handleFilterChange} />
            </label>
            <label>
                City:
                <input type="text" name="city" value={filters.city} onChange={handleFilterChange} />
            </label>
        </div>
    );
};

export default Filters;
