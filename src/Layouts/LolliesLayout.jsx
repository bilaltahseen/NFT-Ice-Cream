import React from 'react'
import {Container} from 'react-bootstrap'
import Lolly from '../Components/Lolly'

const LolliesLayout = ({flavours,svgRef}) => {
  return (
    <Container fluid='xs' className='p-3 d-flex justify-content-center'>
        <Lolly flavours={flavours} svgRef={svgRef}/>
    </Container>
  )
}

export default LolliesLayout