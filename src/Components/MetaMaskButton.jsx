import React from 'react'
import { Button, Image, Spinner } from 'react-bootstrap'
import MetaMaskLogo from '../assets/MetaMask_Fox.png'

const MetaMaskButton = ({ isAuthenticated, authenticateMetaMask, mulitFunctionStateMachine, isLoading }) => {
    return (
        <Button onClick={mulitFunctionStateMachine} className='btn custom-metamask-btn'>
 
            {isLoading ? <label>Loading..</label>:
            <>
            <Image src={MetaMaskLogo} height={40} />
            <label>{isAuthenticated ? 'Mint Using Metamask' : 'Connect To Metamask'}</label>
            </>
            }

        </Button>
    )
}

export default MetaMaskButton