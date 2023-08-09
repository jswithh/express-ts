import config from '../../config/google-analytic/index';
import { BetaAnalyticsDataClient } from '@google-analytics/data';
const propertyId = config.analytic.propertyId;
const keyFile = require('../../config/google-analytic/service-account-key.json');
const analyticsDataClient = new BetaAnalyticsDataClient({
    credentials: keyFile,
});
export const reportRealtime = async (req, res) => {
    try {
        const [response] = await analyticsDataClient.runRealtimeReport({
            property: `properties/${propertyId}`,
            dimensions: [
                {
                    name: 'country',
                },
                {
                    name: 'city',
                },
            ],
            metrics: [
                {
                    name: 'activeUsers',
                },
            ],
        });
        if (!response || !response.rows) {
            // Handle the case when response.rows is null or undefined
            res.status(500).json({ error: 'No data available.' });
            return;
        }
        const countryDataMap = new Map();
        let totalCountryUsers = 0; // Total active users across all countries
        // Group data by country
        response.rows.forEach((row) => {
            const country = row.dimensionValues?.[0]?.value;
            const city = row.dimensionValues?.[1]?.value;
            const activeUsers = parseInt(row.metricValues?.[0]?.value || '0');
            if (country) {
                if (!countryDataMap.has(country)) {
                    countryDataMap.set(country, {
                        country: country,
                        TotalUser: 0,
                        cities: [],
                    });
                }
                const countryData = countryDataMap.get(country);
                countryData.TotalUser += activeUsers;
                totalCountryUsers += activeUsers;
                if (city) {
                    countryData.cities.push({ city: city, activeUser: activeUsers });
                }
            }
        });
        const modifiedResponse = Array.from(countryDataMap.values());
        // Create the final response object
        const responseData = {
            totalCountry: modifiedResponse.length,
            totalUser: totalCountryUsers,
            countries: modifiedResponse,
        };
        res.json(responseData);
    }
    catch (error) {
        // Handle other errors appropriately
        res
            .status(500)
            .json({ error: 'An error occurred while processing the data.' });
    }
};
export const report = async (req, res) => {
    try {
        const startDate = req.query.startDate;
        const endDate = req.query.endDate;
        const [response] = await analyticsDataClient.runReport({
            property: `properties/${propertyId}`,
            dateRanges: [
                {
                    startDate,
                    endDate,
                },
            ],
            dimensions: [
                {
                    name: 'country',
                },
                {
                    name: 'city',
                },
            ],
            metrics: [
                {
                    name: 'activeUsers',
                },
            ],
        });
        if (!response || !response.rows) {
            // Handle the case when response.rows is null or undefined
            res.status(500).json({ error: 'No data available.' });
            return;
        }
        const countryDataMap = new Map();
        let totalCountryUsers = 0; // Total active users across all countries
        // Group data by country
        response.rows.forEach((row) => {
            const country = row.dimensionValues?.[0]?.value;
            const city = row.dimensionValues?.[1]?.value;
            const activeUsers = parseInt(row.metricValues?.[0]?.value || '0');
            if (country) {
                if (!countryDataMap.has(country)) {
                    countryDataMap.set(country, {
                        country: country,
                        TotalUser: 0,
                        cities: [],
                    });
                }
                const countryData = countryDataMap.get(country);
                countryData.TotalUser += activeUsers;
                totalCountryUsers += activeUsers;
                if (city) {
                    countryData.cities.push({ city: city, activeUser: activeUsers });
                }
            }
        });
        const modifiedResponse = Array.from(countryDataMap.values());
        // Create the final response object
        const responseData = {
            totalCountry: modifiedResponse.length,
            totalUser: totalCountryUsers,
            countries: modifiedResponse,
        };
        res.json(responseData);
    }
    catch (error) {
        // Handle other errors appropriately
        res
            .status(500)
            .json({ error: 'An error occurred while fetching the data.' });
    }
};
//# sourceMappingURL=analytic.controller.js.map