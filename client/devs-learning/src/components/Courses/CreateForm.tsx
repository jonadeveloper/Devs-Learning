import { Button, Grid, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

export const CreateForm = () => {
    return (
        <Box sx={{ height: "100vh", display: "flex", alignItems: "center" }}>
            <Box
                component="form"
                sx={{
                    background: "rgba(255, 255, 255, 0.81)",
                    borderRadius: "16px",
                    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                    backdropFilter: "blur(9.8px)",
                    WebkitBackdropFilter: "blur(9.8px)",
                    minHeight: "550px",
                    margin: "0 auto",
                    width: { xl: "40%", md: "50%", sm: "80%", xs: "90%" },
                    p: 3,
                    display: "flex",
                    flexDirection: "column",
                    gap: 2
                }}
            >
                <Typography variant='h2' fontSize={"2rem"} textAlign={"center"} >
                    Create Course
                </Typography>
                <Grid container spacing={4} >
                    <Grid item sm={6} xs={12} sx={{ '& .MuiTextField-root': { width: '100%' } }}>
                        <TextField
                            required
                            label="Title"
                        />
                    </Grid>
                    <Grid item sm={6} xs={12} sx={{ '& .MuiTextField-root': { width: '100%' } }}>
                        <TextField
                            required
                            label="Price"
                        />
                    </Grid>
                    <Grid item sm={6} xs={12} sx={{ '& .MuiTextField-root': { width: '100%' } }}>
                        <TextField
                            required
                            label="Time duration"
                        />
                    </Grid>
                    <Grid item sm={6} xs={12} sx={{ '& .MuiTextField-root': { width: '100%' } }}>
                        <TextField
                            required
                            label="Difficulty"
                        />
                    </Grid>
                    <Grid item sm={6} xs={12} sx={{ '& .MuiTextField-root': { width: '100%' } }}>
                        <TextField
                            required
                            label="Category"
                        />
                    </Grid>
                    <Grid item sm={6} xs={12} sx={{ '& .MuiTextField-root': { width: '100%' } }}>
                        <TextField
                            required
                            label="Image url"
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ '& .MuiTextField-root': { width: '100%' } }}>
                        <TextField
                            required
                            label="Short Description"
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ '& .MuiTextField-root': { width: '100%' } }}>
                        <TextField
                            required
                            label="Body"
                            multiline
                            rows={4}
                            maxRows={10}
                        />
                    </Grid>
                </Grid>
                <Button variant="contained" color="success">
                    Create course
                </Button>

            </Box>
        </Box>
    )
}
