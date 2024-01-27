import { useState } from "react";

interface ConnectFormProps {
  connectToVideo: (channelName :  string ) => void
}

export const ConnectForm = ( {} ) : ConnectFormProps) => {
  const [channelName, setChannelName] = useState('');

  return (
    <form>
      <img src={logo} className="logo" alt="logo" />
      <div className="card">
        <input
          id="channelName"
          type='text'
          placeholder="channel Name"
          value={channelName}
          onChange = {(e) => {
            setChannelName(e.target.value);
          }}
        />
        <button> Connect </button>
      </div>
    </form>
  );
}
