import React from 'react'
import { Box, Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { Category } from '../../interfaces/Category'

interface Props {
    category: Category
}

export const CategoryCard = ({ category }: Props) => {
    return (
        <Link to={`${category.name}`}>
            <Grid container
                sx={{
                    display: { xs: 'none', md: 'flex' },
                    background: "rgba(255, 255, 255, 0.81)",
                    borderRadius: "16px",
                    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                    backdropFilter: "blur(9.8px)",
                    WebkitBackdropFilter: "blur(9.8px)",
                    height: "250px",
                }}
            >
                <Grid item xs={3}>
                    <img src={category.image} alt=""
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            borderRadius: "16px 0 0 16px",
                        }}
                    />
                </Grid>
                <Grid item xs={9} p={3}>
                    <Typography variant="h4">
                        {/* Title */}
                        {category.name}
                    </Typography>
                    <Typography variant="body1">
                        {/* Description */}
                        {category.description}
                    </Typography>
                </Grid>
            </Grid>
            <Card sx={{ minHeight: 500, borderRadius: 2, display: { xs: 'flex', md: 'none' }, alignItems: "stretch" }}>
                <CardActionArea sx={{ display: 'grid', gridTemplateRows: 'auto 1fr' }}>
                    {/* Course Name */}
                    <CardMedia
                        component="img"
                        height="200"
                        alt="Course Name"
                        image={category.image}
                    />
                    <CardContent sx={{ justifySelf: 'flex-start' }}>
                        <Box>
                            {/* Name */}
                            <Typography gutterBottom variant="h3" component="div" sx={{ fontSize: 30, fontWeight: 700 }}>
                                {category.name}
                            </Typography>

                            {/* Description */}
                            <Typography variant="body2" color="text.secondary">
                                {category.description}
                            </Typography>
                        </Box>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Link>
    )
}