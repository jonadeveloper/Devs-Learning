import React from "react";
import { useEffect } from "react";


import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import { useParams } from 'react-router-dom';

interface UserParams {
    id: string;
    [key: string]: string;
  }
  

const CourseDetail: React.FC = () => {
    const { id } = useParams<Record<string, string>>();



  return(
<div>
    <Typography>  Probando el linkeo con el curso <h1>{id}</h1> </Typography>
</div>
  )}

export default CourseDetail