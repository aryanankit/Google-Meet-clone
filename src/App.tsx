import { Route, Routes, useNavigate } from 'react-router-dom'
import { ConnectForm } from './components/ConnectionForm'
import { LiveVideo } from './components/LiveVideo'

import AgoraRTC, {
  AgoraRTCProvider,
  useRTCClient,
} from "agora-rtc-react";

import './App.css'

function App() {
  const navigate = useNavigate()
  const agoraClient = useRTCClient( AgoraRTC.createClient({ codec: "vp8", mode: "rtc" })); 

  const handleConnect = (channelName: string) => {
    navigate(`/via/${channelName}`)
  }

  return (
    <Routes>
      <Route path='/' element={ <ConnectForm connectToVideo={ handleConnect } /> } />
      <Route path='/via/:channelName' element={
        <AgoraRTCProvider client={agoraClient}>
          <LiveVideo />
        </AgoraRTCProvider>
      } />
    </Routes>
  )
}

export default App