import React, { useState, useMemo } from 'react';
import { ResponsivePie } from '@nivo/pie';
import { Box } from '@mui/material';

// Custom tooltip component to show the label and value on hover
const CustomTooltip = ({ datum }) => (
    <div
        style={{
            background: 'black',
            textAlign:'center',
            color: '#ffffff',
            opacity: '80%',
            padding: '6px 28px',
            // border: '1px solid #ffffffff',
            borderRadius: '3px',
            }}
    >
        {/* //prints id with values */}
        <strong>{datum.id}</strong>: {datum.value} 
    </div>
);


const DashboardPieChart = () => {
    // Sample detailed data for the table, representing the full list of leads.
    const allmockPieData = [
        { id: 1, name: "John Doe", company: "Innovate Inc.", status: "New", score: 85 },
        { id: 2, name: "Jane Smith", company: "Solutions Co.", status: "New", score: 92 },
        { id: 3, name: "Peter Jones", company: "Tech Corp.", status: "Contacted", score: 78 },
        { id: 4, name: "Mary Johnson", company: "Innovate Inc.", status: "Contacted", score: 95 },
        { id: 5, name: "David Williams", company: "Data Systems", status: "Qualified", score: 65 },
        { id: 6, name: "Emily Brown", company: "Solutions Co.", status: "Qualified", score: 88 },
        { id: 7, name: "Michael Davis", company: "Tech Corp.", status: "Converted", score: 91 },
        { id: 8, name: "Jessica White", company: "Global Net", status: "Converted", score: 87 },
        { id: 9, name: "Chris Evans", company: "Data Systems", status: "Lost", score: 55 },
        { id: 10, name: "Lisa Green", company: "Tech Corp.", status: "New", score: 75 },
        { id: 11, name: "Robert Hall", company: "Innovate Inc.", status: "Contacted", score: 82 },
        { id: 12, name: "Laura Baker", company: "Solutions Co.", status: "New", score: 90 },
        { id: 13, name: "Kevin King", company: "Data Systems", status: "Qualified", score: 70 },
        { id: 14, name: "Nancy Scott", company: "Global Net", status: "Converted", score: 93 },
        { id: 15, name: "Paul Adams", company: "Tech Corp.", status: "Lost", score: 60 },
    ];

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [tableData, setTableData] = useState([]);
    const [clickedSlice, setClickedSlice] = useState(null);

    // This is the new, crucial part.
    // We use a useMemo hook to process the raw data for the pie chart.
    const processedData = useMemo(() => {
        const counts = {};

        // Count the occurrences of each status
        allmockPieData.forEach(item => {
            const status = item.status;
            counts[status] = (counts[status] || 0) + 1;
        });

        // Convert the counts object into the array format required by nivo
        return Object.keys(counts).map(status => ({
            id: status,
            label: status,
            value: counts[status],
        }));
    }, [allmockPieData]);


    const handleSliceClick = (datum) => {
        if (clickedSlice && clickedSlice === datum.id) {
            setSelectedCategory(null);
            setTableData([]);
            setClickedSlice(null);
        } else {
            setSelectedCategory(datum.id);
            setClickedSlice(datum.id);
            const filteredData = allmockPieData.filter(lead => lead.status === datum.id);
            setTableData(filteredData);
        }
    };

    return (
        <div style={{ padding: '10px', height: '100%', width: '100%' }}> {/* Outer container */}
            <Box style={{ height: '100%', width: '100%' }}> {/* Use Box for better MUI integration */}
                <ResponsivePie
                    data={processedData} // Use the correctly processed data here
                    margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
                    innerRadius={0.2}
                    cornerRadius={5}
                    activeOuterRadiusOffset={8}
                    colors={{ scheme: 'set2' }}
                    enableArcLabels={true}
                    arcLabel="id"
                    arcLabelsTextColor="#050301"
                    enableArcLinkLabels={false}
                    motionConfig="slow"

                    // // LELGEND-CUSTOMISATION

                    // legends={[
                    //     {
                    //         anchor: 'bottom',
                    //         direction: 'row',
                    //         translateY: 36,
                    //         itemWidth: 80, //space btw legends
                    //         itemHeight: 100,
                    //         symbolShape: 'diamond',
                    //         itemTextColor: '#48d658ff',
                    //         effects: [
                    //             {   on: 'hover',
                    //                 style: {
                    //                     itemTextColor: '#d76363ff'
                    //                 }
                    //             }
                    //         ]
                    //     }
                    // ]}


                    tooltip={CustomTooltip}
                    onClick={handleSliceClick}
                />
            </Box>
            {tableData.length > 0 && (
                <div style={{ marginTop: '40px' }}>
                    <h2>Leads - {selectedCategory}</h2>
                    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#b4b3b3b9' }}>
                                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Name</th>
                                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Company</th>
                                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.map(lead => (
                                <tr key={lead.id}>
                                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{lead.name}</td>
                                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{lead.company}</td>

                                    {/* Score : potential to become my customer */}
                                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{lead.score}%</td> 
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default DashboardPieChart;