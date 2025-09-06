import { useState } from 'react';
import { Box, Button, Typography, useTheme, Modal, TextField, MenuItem, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../Components/Header";
import { mockDataLeads } from '../../Data/mockData';
import { tokens } from "../../theme";

import { useOutletContext } from 'react-router-dom';  //to access the searchQuery state from topbar-search.

// Importing icons
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';


// Top-up/ Opening-box
const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: '8px',
    color: 'blue',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
};



const Leads = () => {
    const theme = useTheme();  //fn to change theme
    const colors = tokens(theme.palette.mode);  //defined under theme.js

    const { searchQuery } = useOutletContext();  // Access the search query from context
    console.log(searchQuery) //to debug


    const [leads, setLeads] = useState(mockDataLeads);
    const [open, setOpen] = useState(false);
    const [currentLead, setCurrentLead] = useState(null);



    // Filter lead based on Search-Query from topbar-search {filter based on 'name' and 'company' only}
    const filteredLeads = leads.filter(lead =>
        lead.name.toLowerCase().includes(searchQuery.toLowerCase()) || lead.company.toLowerCase().includes(searchQuery.toLowerCase())

    );



    //   opening lead button
    const handleOpen = (lead = null) => {
        setCurrentLead(lead);
        setOpen(true);
    };

    // closd box state
    const handleClose = () => {
        setOpen(false);
    };


    const handleSave = () => {
        if (currentLead.id) {
            // Logic to update an existing lead
            setLeads(leads.map(lead => lead.id === currentLead.id ? currentLead : lead));
        } else {
            // Logic to add a new lead
            const newLead = { ...currentLead, id: Math.max(...leads.map(lead => lead.id)) + 1 };
            setLeads([...leads, newLead]);
        }
        handleClose();
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentLead({ ...currentLead, [name]: value });
    };


    // tables
    const columns = [
        { field: "id", headerName: "ID", flex: 0.5 }, //flex--> column-width
        { field: "name", headerName: "Name", flex: 1, cellClassName: "name-column--cell" },
        { field: "company", headerName: "Company", flex: 1 },
        { field: "status", headerName: "Status", flex: 1 },
        { field: "source", headerName: "Source", flex: 1 },

        {
            field: "action",
            headerName: "Action",
            flex: 1,

            //   edit icon-button customisation
            renderCell: ({ row }) => (
                <IconButton
                    onClick={() => handleOpen(row)}
                    sx={{ color: colors.blueAccent[500], width: '70%', height: 'auto', borderRadius: '50%' }}
                    aria-label="edit lead"
                >
                    <EditIcon />
                </IconButton >
            ),
        },
    ];



    return (
        <Box m="20px">
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="LEADS" subTitle="Managing your potential customers" />
                <Button
                    variant="contained" //font-size
                    onClick={() => handleOpen({ name: '', company: '', status: '', source: '' })}
                    startIcon={<AddIcon />}
                    sx={{
                        backgroundColor: colors.blueAccent[600],
                        "&:hover": {
                            backgroundColor: colors.blueAccent[500],
                        },
                    }}
                >
                    Add Lead
                </Button>
            </Box>


            {/* Overriding with custom CSS  */}
            <Box m="40px 0 0 0" height="75vh" sx={{
                "& .MuiDataGrid-root": {
                    border: `1px solid ${colors.gray[700]}`,
                    borderRadius: "4px",
                    overflow: "hidden", // Ensures the border radius is applied correctly

                },

                "& .MuiDataGrid-cell": {
                    borderBottom: "none",
                },
                "& .name-column--cell": {
                    color: colors.greenAccent[300],
                },
                "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: colors.blueAccent[700],
                    borderBottom: "2px solid red",
                },
                "& .MuiDataGrid-virtualScroller": {
                    backgroundColor: colors.primary[400],
                },
                "& .MuiDataGrid-footerContainer": {
                    borderTop: "none",
                    backgroundColor: colors.blueAccent[700],
                },
            }}>
                <DataGrid
                    rows={filteredLeads}  //using the filtered data here

                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 10 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                />
            </Box>



            {/* DIALOG-BOX for CRUD Application */}
            <Modal open={open} onClose={handleClose}>
                <Box sx={modalStyle}>

                    {/* component: controls which HTML tag is actually rendered in the DOM (<h4>, <p>, <span>) */}
                    <Typography variant="subtitle1" component="h4" color={colors.gray[100]}>
                        {currentLead && currentLead.id ? 'Edit Lead' : 'Add New Lead'}
                    </Typography>

                    <TextField
                        name="name"
                        label="Name"
                        value={currentLead?.name || ''}
                        onChange={handleInputChange} //event-handler
                        fullWidth
                        variant="outlined"
                        size="small"
                    />
                    <TextField
                        name="company"
                        label="Company"
                        value={currentLead?.company || ''}
                        onChange={handleInputChange}
                        fullWidth
                        variant="outlined"
                        size="small"
                    />
                    <TextField
                        name="status"
                        label="Status"
                        value={currentLead?.status || ''}
                        onChange={handleInputChange}
                        fullWidth
                        select
                        variant="outlined"
                        size="small"
                    >
                        <MenuItem value="New">New</MenuItem>
                        <MenuItem value="Contacted">Contacted</MenuItem>
                        <MenuItem value="Qualified">Qualified</MenuItem>
                        <MenuItem value="Converted">Converted</MenuItem>
                        <MenuItem value="Lost">Lost</MenuItem>
                    </TextField>


                    <TextField
                        name="source"
                        label="Source"
                        value={currentLead?.source || ''}
                        onChange={handleInputChange}
                        fullWidth
                        variant="outlined"
                        size="small"
                    />
                    <Box display="flex" justifyContent="flex-end" gap="8px">
                        <Button
                            variant="outlined" //bg-color and fontsize (imported --library)
                            onClick={handleClose}
                            startIcon={<CancelIcon />}
                            sx={{
                                color: theme.palette.mode === 'dark' ? colors.gray[100] : colors.gray[900],
                                '&:hover': {

                                    backgroundColor: 'red',
                                    // textDecoration: 'underline'
                                }
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="contained" //bg-color and fontsize (imported --library)
                            onClick={handleSave}
                            startIcon={<SaveIcon />}



                    // CSS over-riding
                            sx={{
                                
                                // color: theme.palette.mode === 'dark' ? colors.gray[100] : colors.gray[100],

                                backgroundColor: theme.palette.mode === 'dark' ? colors.greenAccent[800] : colors.greenAccent[800],

                                '&:hover': {
                                    // Use a darker green for hover in light mode
                                    backgroundColor: theme.palette.mode === 'dark' ? colors.greenAccent[600] : colors.greenAccent[900],
                                }
                            }}
                        >
                            Save
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </Box>
    );
};

export default Leads;
