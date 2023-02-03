import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Chip, Divider, Grid, Pagination, Typography } from '@mui/material'
import React, { useState } from 'react'

export const Test = () => {
    const [page, setPage] = useState(0)
    const onPagination = (event: React.ChangeEvent<unknown>, page: number) => {
        console.log(page);

        setPage(page)
    }
    const cards = [
        {
            "categoria": 1,
            "nombre": "PosgreSQL",
            image: "https://kinsta.com/wp-content/uploads/2022/04/postgres-logo.png",
            "summary": "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
            "duracion": 6,
            "precio": 2790,
            "idProfesor": 1,
            dificultad: "Hard"
        },
        {
            "categoria": 2,
            "nombre": "React",
            image: "data:image/png;base64,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",

            "duracion": 22,
            "precio": 6500,
            "summary": "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
            "idProfesor": 2,
            dificultad: "Easy"
        },
        {
            "categoria": 1,
            "nombre": "NodeJs",
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASsAAACoCAMAAACPKThEAAAAz1BMVEUiIiL///8AAABbh2MhICFrpWaBvngbGxtUVFRNTU0YGBhvqW1tpmxyrG9ro2olJSV5tHP09PQeGB5ilmVlmmZmZmYcFB0fGx8pLipgYGAqMipMbklYg1RVflFgkGRaiFYMDAxmm2G2trbg4OARERGKiopCXkA4SzbR0dHDw8Pp6emTk5Otra1/f39QUFCkpKQvPC49VDs6Ojpubm4yMjJZg2JgklxDQ0NBXD9IZ0UyQDFQdUwZChoWARiFxXxUeVsRBhJhpmFkqWFHZEw+VzxSVuFAAAAHwklEQVR4nO2ci1biyhJASVMxippIwHQkEBJEUHQEfKACxzlzx///ptvpPEjnZc69njHR2mvNWjOCsbOnu1Jd1dJoIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAhSPwhRPnsIdaF1eXlH4LNHUQtAa0vSqIW2SsBdSdLcGX/2SKpP4Epq/yCtzx5L1QldSdL5PsoqZudKku4waBUSd7WPyUMh6Ko86Ko86Ko86Ko86Ko86Ko86Ko86Ko86Ko86Ko8X9tV68PKAQAlXCn1Fdgi9/fOe7ZA1xr0vaIBOIriwDuugDzd1rQer5DTmSTNTouHT3XrSH2jtPBSLeei3Z6TcaErRxtJ0uVBDSvMQO4u/bu6esgfPmyXhyfHx117us2/RYWczbwLMe35rlrk2n9xRJyPuoc/hKPcRLcl3bSczDfBduHuMVWHalft94xsWzvpzJaU40oh97vXLmpVYWZrRhLIGj4Y2nBv78RzddTtdlVL0zNsOdqNlEXcVVxnMAHrErYUsj9L3tr5fnL41LD2XkNXqierO9GTYatFfrSTl0q5cpRR8tXLO/Lv3+f/T/I/OUQMW/DX9ISZirvqqkcdMWyxQHWebSrmqkUusnTekOo3xsZO9pqR4n09Fqi63FTkSu1wW4fDXdgC8pApXXCVr7P6jbFx3prxh+/LgkZ/LyR01fVkqerR4UbzZSnaPP9KoSulSOf5fqWnlrJfdH9hp4r+fM1w1fFcqeqxzYMWQO7yi7lyin/cQZVDfOu0zOC1Zuc15SqYWKraNKHElbgr5bb4TadVXoVlXT2eZLjyZdmBq7Myrg6+kKv5jRi+QldN+zXDFY/vj9muzhNLMtPV1VVtXY0eCHkQcp/IVTSxBFdMlt3MctW+Js71e67Ozwg5E2J9bVydP3kJFZDb2IwIXDEhzdeUK5u56jxmuRppTgMciGtPuWI5wt9a728heT2ri6swvRk/pVx1bLt5nJ5XdqfLJKZdBWf5gMTUpFxpjj5RZavhkOhL80on74Kr4GvxqtPOld3McGXbma6iK0GizhBz1daMocxYQejqquL7nJKuup6WowxXzWJXyfqV4Gq78ly5mu+q+vvnkq5cL443/01XNajLlHXlrjr2I98Sfpyr2BqsRb2vpCuZyWJ5Q+l5FWynFafAVWNMJ65sAbROb2tRRy7viml5tF/LufJSBgbRYqlm6jk4OyO62TO8b614oAoo6erXL5flUTwhLeNKkq5Jq0WEZDQjF2UPvnpY8inp6j+/uJSmXdaV1D69F3dLmXucvMJ+JSnrik8rNrGOy7pKkbN3rsHzL6Ssq2bIR7vyNoU1WYgxV+dR1uzsNoTcFUAnVPWopl09eu34d6uGB7m1vqJ+ZJXYubppRQOG8Ui8Q9B+RhMr5eq36X+jGMqTzB3/5+1nVU9vHOfP3/o/JnQl/uoakKfLuKsG6IvQVlfcD/5cRE1CJ7+WfvkUTtrsplj7wvmTd/2/4btK78XCvnBUAAc6DcJ73FVzGj8F4h+ISCNefjzO6mHMK92W4HBXmc8iPz263d0kbfzmsjonkavfkDgw0yIXaQ3XicsDubtKvmdW6a6Ej/I0y92LOc5opsVd6Ka3EB8PuStV3Zh68AJA9LYxSfSUbzIur5ADIWzNftTiWag4Tv6hGGcsvgb6mtmyPVdHnXUUqChdmNE/drGOB6qcI0NC2Lr+mr+LCTBtNtXDQ3USncACfbmS3U0jnGSxsDW7z58vYyV4bo60eqQM/xyg2m/7ZBMdkQFjwUsrsjsxooMgwVbwuvCIAvA2yNXTVzXFoZoWnmEAXdswT/3eiyvLq9hBEMeZz9/d6zFbD7UIVB8Bpb4jgzkbcGdG+BIUxMEd8JXnVBwwpitv7fHIBcbaW4sWFB8k/Z6A0eszOfHItWSTzH3b+raSqdc3Rm/4gSp+aJQalrck195CpOvlVM/97m+F/hwEqsSXTR62NLYjen5bTnA9MugbW20vGYfcWdhiMWyow2T58jL5hJFVD6MvD/1A5YcloLph6Pyv1JjIskknS+v5+ZNHWQ2MoWzx9AAW0wWw3GFpDfqbl7W3JsGU5R5dTswJrkEPz5Ue/KVv0Kkr+7BI1YAecwV0/TJFVR47V315YDA5bn+zGXiRyghcYc4QIrj6ayO7i62uG1uWRkwhcIUEiK4G8mpL2XYFDFl+oehKRHC1tWR5sFyY7FFo9kycVwnEeGXy0O6uhpb3IERXIqIrMDfhg3CI8yqJ6Iotvq05fbb6zFjfQFcigisYDHoAXuquD2UZXSUQXDXY08+v8RkWukoh5gxD2Z1uDbYQ1y5LRtGViBivFiyoq6vhygvwa4ztCURXtNcPnoPDBcWcIQFzteFNG+7KqydP3ybPU14l1dGVgM6CeN80QldeQ4YymCG6fXFl99v0Z8oAftNmq7nyJlZWB4OXZ7AaEwd03rQZuoIYvwe90VCVCAWLB/RB1D7VGxvVC+85nwfyrdG15401NXR/DdLtxJtpy4LPmfnOsG2NTjVrAzToQbP8HZdfLmCueK+Z96AHZtYHzCAhQHmvmf0ZrjFQvQPofE65SzRVAjDWVvoTi5BsQMcGF4IgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgyJ/kv8IXzRr4D5/wAAAAAElFTkSuQmCC",
            "duracion": 12,
            "precio": 4890,
            "summary": "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
            "idProfesor": 3,
            dificultad: "Hard"
        },
        {
            "categoria": 2,
            "nombre": "JavaScript",
            "duracion": 40,
            "precio": 9900,
            "summary": "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiKztGHvMvOqlh91-rltzuzIbZd07cPz-RpA&usqp=CAU",
            "idProfesor": 4,
            dificultad: "Medium"
        },
        {
            "categoria": 1,
            "nombre": "PosgreSQL",
            image: "https://kinsta.com/wp-content/uploads/2022/04/postgres-logo.png",
            "summary": "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
            "duracion": 6,
            "precio": 2790,
            "idProfesor": 1,
            dificultad: "Hard"
        },
        {
            "categoria": 2,
            "nombre": "React",
            image: "data:image/png;base64,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",

            "duracion": 22,
            "precio": 6500,
            "summary": "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
            "idProfesor": 2,
            dificultad: "Easy"
        },
        {
            "categoria": 1,
            "nombre": "NodeJs",
            image: "data:image/png;base64,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",
            "duracion": 12,
            "precio": 4890,
            "summary": "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
            "idProfesor": 3,
            dificultad: "Hard"
        },
        {
            "categoria": 2,
            "nombre": "JavaScript",
            "duracion": 40,
            "precio": 9900,
            "summary": "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiKztGHvMvOqlh91-rltzuzIbZd07cPz-RpA&usqp=CAU",
            "idProfesor": 4,
            dificultad: "Medium"
        },
        {
            "categoria": 1,
            "nombre": "PosgreSQL",
            image: "https://kinsta.com/wp-content/uploads/2022/04/postgres-logo.png",
            "summary": "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
            "duracion": 6,
            "precio": 2790,
            "idProfesor": 1,
            dificultad: "Hard"
        },
        {
            "categoria": 2,
            "nombre": "React",
            image: "data:image/png;base64,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",

            "duracion": 22,
            "precio": 6500,
            "summary": "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
            "idProfesor": 2,
            dificultad: "Easy"
        },
        {
            "categoria": 1,
            "nombre": "NodeJs",
            image: "data:image/png;base64,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",
            "duracion": 12,
            "precio": 4890,
            "summary": "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
            "idProfesor": 3,
            dificultad: "Hard"
        },
        {
            "categoria": 2,
            "nombre": "JavaScript",
            "duracion": 40,
            "precio": 9900,
            "summary": "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiKztGHvMvOqlh91-rltzuzIbZd07cPz-RpA&usqp=CAU",
            "idProfesor": 4,
            dificultad: "Medium"
        }
    ]
    return (
        <Box sx={{
            // height: "100vh",
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            gap: 4,
            p: 5
        }}>
            {cards.length}
            <Grid container spacing={4}>
                {
                    cards.map((card, index) => {
                        if ((page) - 1 * 6 <= index &&
                            index < page * 6) {
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
                                            {/* <Button size="small" color="primary">
                            Share
                        </Button> */}
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                            )
                        }

                    })
                }
            </Grid >
            <Pagination count={cards.length / 6} variant="outlined" onChange={onPagination} />
        </Box>

    )
}
