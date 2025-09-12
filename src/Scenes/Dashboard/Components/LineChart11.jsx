import React, { useMemo } from 'react';
import { ResponsiveLine } from '@nivo/line';
import { useTheme } from '@mui/material';
import { tokens } from '../../../theme';

// ADDED: Month names for formatting dates on the chart
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// CHANGED: This is now a full React component that accepts 'leadsData' as a prop
const LineChart = ({ leadsData }) => {
    // ADDED: Access the current theme and its color tokens
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    // ADDED: A memoized function to process the data for the line chart
    const processedData = useMemo(() => {
        // ADDED: Handle cases where data is not available
        if (!leadsData || !Array.isArray(leadsData) || leadsData.length === 0) {
            return [{
                id: 'Conversions',
                data: [],
            }];
        }
        
        const monthlyConversions = {};

        leadsData.forEach(lead => {
            if (lead.status === "Converted" && lead.conversionDate) {
                const date = new Date(lead.conversionDate);
                const month = date.getMonth();
                const year = date.getFullYear();
                const monthYear = `${monthNames[month]} '${String(year).slice(-2)}`;
                monthlyConversions[monthYear] = (monthlyConversions[monthYear] || 0) + 1;
            }
        });

        const lineChartData = Object.keys(monthlyConversions)
            .map(key => ({
                x: key,
                y: monthlyConversions[key],
            }));
            
        // ADDED: A robust sorting function to ensure data is in chronological order
        const sortedData = lineChartData.sort((a, b) => {
            const [monthA, yearA] = a.x.split(" '");
            const [monthB, yearB] = b.x.split(" '");
            const dateA = new Date(`01 ${monthA} ${yearA}`);
            const dateB = new Date(`01 ${monthB} ${yearB}`);
            return dateA - dateB;
        });

        return [{
            id: 'Conversions',
            data: sortedData,
        }];
    }, [leadsData]); // The hook will re-run only if the leadsData prop changes

    return (
        <ResponsiveLine
            data={processedData}
            margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
            // ADDED: Use the theme for chart styling
            theme={{
                axis: {
                    domain: { line: { stroke: colors.gray[100] } },
                    legend: { text: { fill: colors.gray[100] } },
                    ticks: { line: { stroke: colors.gray[100], strokeWidth: 1 }, text: { fill: colors.gray[100] } }
                },
                legends: { text: { fill: colors.gray[100] } },
                tooltip: { container: { color: colors.primary[500] } }
            }}
            xScale={{ type: 'point' }}
            yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
            axisBottom={{ legend: 'Time', legendOffset: 49, legendPosition: 'middle', tickRotation: 31 }}
            axisLeft={{
                tickSize: 11,
                tickPadding: 4,
                tickRotation: -10,
                legend: 'Number of Conversions',
                legendOffset: -51,
                legendPosition: 'middle'
            }}
            colors={{ scheme: 'set1' }}
            pointSize={10}
            pointColor={{ theme: 'background' }}
            pointBorderWidth={2}
            pointBorderColor={{ from: 'seriesColor' }}
            pointLabelYOffset={-12}
            enableArea={true}
            areaBlendMode="darken"
            areaOpacity={0.05}
            enableTouchCrosshair={true}
            useMesh={true}
            legends={[
                {
                    anchor: 'bottom-right',
                    direction: 'row',
                    translateX: 32,
                    translateY: 106,
                    itemWidth: 66,
                    itemHeight: 18,
                    symbolSize: 10,
                    symbolShape: 'circle'
                }
            ]}
        />
    );
};

export default LineChart;