import React from 'react'
import { Container,Form,Button,Row,Col,Image } from 'react-bootstrap'
import MetaMaskButton from '../Components/MetaMaskButton'
import { convertSVGToCanvas } from '../utils/svgToCanvas'


const ControlPanel = ({flavours,setFlavours,svgRef,authenticateMetaMask,nftDetails,setNftDetails,isAuthenticated,mulitFunctionStateMachine,isLoading}) => {
    
  return (
    <Container>
        <h2 className='text-white' style={{
            fontSize:'3rem'
        }}>Make Your Own NFT Ice Cream</h2>
        <Form className='mt-5'>
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Name Your Ice Cream</Form.Label>
    <Form.Control onChange={(e)=>setNftDetails(prevState=>({...prevState,'name':e.target.value}))} value={nftDetails.name}  type="text" placeholder="Enter name" />
    
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Choose Your Flavours</Form.Label>
    <Row>
        <Col>
        <Form.Label>Top</Form.Label>
        <Form.Control value={flavours.top} type="color" onChange={(e)=>setFlavours(prevState=>({...prevState,'top':e.target.value}))}  />
        </Col>
        <Col>
        <Form.Label>Middle</Form.Label>
        <Form.Control value={flavours.middle} type="color" onChange={(e)=>setFlavours(prevState=>({...prevState,'middle':e.target.value}))}   />
        </Col>
        <Col>
        <Form.Label>Bottom</Form.Label>
        <Form.Control value={flavours.bottom} type="color" onChange={(e)=>setFlavours(prevState=>({...prevState,'bottom':e.target.value}))} />
        </Col>
    </Row>
  </Form.Group>
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Set A Price</Form.Label>
    <Form.Control onChange={(e)=>setNftDetails(prevState=>({...prevState,'price':e.target.value}))} value={nftDetails.price} type="number" placeholder="Enter price"  />
    <br/>
  </Form.Group>
        <MetaMaskButton isLoading={isLoading} isAuthenticated={isAuthenticated} authenticateMetaMask={authenticateMetaMask} mulitFunctionStateMachine={mulitFunctionStateMachine}/>
</Form>
    </Container>
  )
}

export default ControlPanel