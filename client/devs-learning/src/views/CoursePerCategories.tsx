import { Box } from '@mui/system'
import React from 'react'
import { useParams } from 'react-router-dom'
import { CardList } from '../components/Cards/CardList'
import { useAppSelector } from '../hooks/hooksRedux'

export const CoursePerCategories = () => {
    const { name } = useParams()
    const { coursesFiltered } = useAppSelector((state) => state.courses);

    return (
        <Box>
            <CardList cards={coursesFiltered} />
        </Box>
    )
}
