import React, { useEffect, useRef, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { useMoralis } from "react-moralis";
import { Navbar, Container, Row, Col } from 'react-bootstrap';
import LolliesLayout from './Layouts/LolliesLayout';
import ControlPanel from './Layouts/ControlPanel';
import NFT from './utils/NFT';
import Moralis from 'moralis'
import { convertSVGToCanvas } from './utils/svgToCanvas';
import bgImage from './assets/backgound-01.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const { authenticate, isAuthenticated, isAuthenticating, user, account, logout } = useMoralis();
  const svgRef = useRef(null);
  const [flavours, setFlavours] = useState({
    top: '#F9B938',
    middle: '#F7931E',
    bottom: '#F9B938',
  })
  const [nftDetails, setNftDetails] = useState({
    name: 'My Cool Lolly',
    price: 1
  })

  const [currentState,setCurrentState] = useState('AUTH')
  const [isLoading,setIsLoading] = useState(false)



  useEffect(() => {
    if (isAuthenticated && account) {
      // add your logic here
      toast.success('Metamask wallet connected!')
      setCurrentState('UPLOADANDMINT')
      console.log(account)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  const login = async () => {
    if (!isAuthenticated) {

      await authenticate({ signingMessage: "Log in using Moralis" })
        .then(function (user) {
          console.log("logged in user:", user);
          console.log(user.get("ethAddress"));
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  const logOut = async () => {
    await logout();
    console.log("logged out");
  }




  const authenticateMetaMask = async () => {
    try {

      if (!isAuthenticated || !account) {
        await authenticate({ signingMessage: "Log in using Moralis" })
      }

    }
    catch (e) {
      console.log("🚩 ~ file: App.js ~ line 59 ~ mintNFT ~ e", e)
    }
  }

  const mintNFT = async () => {
    try {
      console.log(convertSVGToCanvas(svgRef, bgImage))
    } catch (error) {
      console.log("🚩 ~ file: App.js ~ line 75 ~ mintNFT ~ error", error)

    }
  }

  const mulitFunctionStateMachine = async ()=>{
    try {
      setIsLoading(true)
      switch(currentState){
        case 'AUTH':
          console.log('Inside Auth')
          if (!isAuthenticated || !account) {
            await authenticate({ signingMessage: "Log in using Moralis" })
            
          }
          break;
        case 'UPLOADANDMINT':
          console.log('Inside UPLOAD AND MINT')
          await NFT.checkBalance(nftDetails.price,account)
          const dataURL = await convertSVGToCanvas(svgRef, bgImage)
          const metaDataUrl = await NFT.upload(nftDetails.name,dataURL)
          const response = await NFT.mintToken(nftDetails.price,metaDataUrl)
          console.log(response)
          setCurrentState('DONE')
          break;
        default:
         
          break;
      }
      setIsLoading(false)
    } catch (error) {
    console.log("🚩 ~ file: App.js ~ line 88 ~ mulitFunctionStateMachine ~ error", error)
      toast.error(error.message)
      setIsLoading(false)
    }
  }


  

  return (

    <Container fluid className='d-flex min-vh-100 justify-content-center align-items-center bg-custom text-white'>
      <ToastContainer position="bottom-right" closeOnClick/>
      <Row>
        <Col md={5}>
          <LolliesLayout svgRef={svgRef} flavours={flavours} />
        </Col>
        <Col md={6}>
        
          <ControlPanel isLoading={isLoading} mulitFunctionStateMachine={mulitFunctionStateMachine} isAuthenticated={isAuthenticated && account} authenticateMetaMask={authenticateMetaMask} svgRef={svgRef} flavours={flavours} setFlavours={setFlavours} nftDetails={nftDetails} setNftDetails={setNftDetails} />
        </Col>
      </Row>
    </Container>

  );
}

export default App;