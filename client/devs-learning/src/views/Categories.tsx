import { Box, Grid, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { CategoryCard } from '../components/Categories/CategoryCard'
import { useAppDispatch, useAppSelector } from '../hooks/hooksRedux'
import { getCategories } from '../redux/courses/actions'

export const Categories = () => {
    const { categories } = useAppSelector((state) => state.courses)
    const dispatch = useAppDispatch()
    const testCategories = [
        {
            name: "Web",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat animi sunt reprehenderit assumenda veniam obcaecati dignissimos soluta eius nemo odio. Optio harum perspiciatis sint totam tenetur rerum ullam repellendus et.",
            image: "https://sigdeletras.com/images/blog/202004_react_leaflet/react.png"
        }
    ]
    // useEffect(() => {
    //     dispatch(getCategories())
    // }, [])

    return (
        <Box sx={{ px: { xl: 10, lg: 8, md: 6, sm: 4, xs: 2 }, mt: 3 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {
                    categories.map((category) => {
                        return <CategoryCard category={category} />
                    })
                }
            </Box>
        </Box>
    )
}
