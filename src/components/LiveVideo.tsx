import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
    LocalUser,
    RemoteUser,
    useJoin,
    useLocalCameraTrack,
    useLocalMicrophoneTrack,
    usePublish,
    useRemoteAudioTracks,
    useRemoteUsers,
  } from "agora-rtc-react";


export const LiveVideo = () => {

  const appId = 'Agora Project App ID'
  const { channelName } = useParams() 

  const [activeConnection, setActiveConnection] = useState(true);

  const [micOn, setMic] = useState(true);
  const [cameraOn, setCamera] = useState(true);

  // get local video and mic tracks
  const { localMicrophoneTrack } = useLocalMicrophoneTrack(micOn);
  const { localCameraTrack } = useLocalCameraTrack(cameraOn);

  const navigate = useNavigate()

  useJoin(
    {
      appid: appId,
      channel: channelName!,
      token: null,
    },
    activeConnection,
  );

  usePublish([localMicrophoneTrack, localCameraTrack]);

  const remoteUsers = useRemoteUsers();
  const { audioTracks } = useRemoteAudioTracks(remoteUsers);

  audioTracks.forEach((track) => track.play());


  return (
    <>
      <div id='remoteVideoGrid'>
        { 
          remoteUsers.map((user) => (
            <div key={user.uid} className="remote-video-container">
              <RemoteUser user={user} /> 
            </div>
          ))
        }
      </div>
      <div id='localVideo'>
        <LocalUser
          audioTrack={localMicrophoneTrack}
          videoTrack={localCameraTrack}
          cameraOn={cameraOn}
          micOn={micOn}
          playAudio={micOn}
          playVideo={cameraOn}
          className=''
        />
        <div>
          <div id="controlsToolbar">
            <div id="mediaControls">
              <button className="btn" onClick={() => setMic(a => !a)}>
                Mic
              </button>
              <button className="btn" onClick={() => setCamera(a => !a)}>
                Camera
              </button>
            </div>
            <button id="endConnection"
                onClick={() => {
                  setActiveConnection(false)
                  navigate('/')
                }}> Disconnect
            </button>
          </div>
        </div>
      </div>
    </>
  )
}