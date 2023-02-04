import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { Box } from '@mui/system'
import React from 'react'

export interface Course {
    categoria: number
    nombre: string
    image: string
    summary: string
    duracion: number
    precio: number
    idProfesor: number
    dificultad: string
}
interface Props {
    card: Course
    index: number
}

export const CardComponent = ({ card, index }: Props) => {
    return (
        <Grid key={index} item xl={3} lg={4} sx={{ display: 'flex', justifyContent: 'center' }} >
            <Card sx={{ maxWidth: 345, minHeight: 500, borderRadius: 2, display: 'flex' }}>
                <CardActionArea sx={{ display: 'grid', gridTemplateRows: 'auto 1fr' }}>

                    {/* Course Name */}
                    <CardMedia
                        component="img"
                        height="200"
                        alt="Course Name"
                        image={card.image}
                    />
                    <CardContent sx={{ justifySelf: 'flex-start' }}>
                        <Box>
                            {/* Course Title */}
                            <Typography gutterBottom variant="h3" component="div" sx={{ fontSize: 30, fontWeight: 700 }}>
                                {card.nombre} {index}
                            </Typography>
                            {/* Course Price */}
                            <Typography gutterBottom variant="h4" component="div" sx={{ fontSize: 25, fontWeight: 700 }}>
                                ${card.precio}
                            </Typography>
                            {/* Category */}
                            <Box my={2}>
                                <Chip label="Development" sx={{ backgroundColor: "greenyellow" }} />
                            </Box>
                            {/* Course sumary */}
                            <Typography variant="body2" color="text.secondary">
                                {card.summary}
                            </Typography>
                        </Box>
                        <Divider sx={{ my: 2 }} />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography sx={{ display: 'flex', fontWeight: "600", gap: 1 }}>Duration: <span style={{ color: "grey" }}> {card.duracion} hours</span></Typography>
                            <Typography sx={{ display: 'flex', fontWeight: "600", gap: 1 }}>Difficulty: <span style={{ color: "grey" }}> {card.dificultad}</span></Typography>
                        </Box>

                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>
    )
}
