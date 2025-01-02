import React, { useState } from 'react';
// import './AudioPlayer.css'; // Import the CSS file for styling

const AudioPlayer = () => {
  const [secureUrl, setSecureUrl] = useState('');
  const [fileType, setFileType] = useState('mp3');
  const [isLoading, setIsLoading] = useState(false);

  const fetchSecureUrl = async () => {
    setIsLoading(true); 
    try {
      const response = await fetch(`http://localhost:5000/api/get-audio-url?type=${fileType}`);
      const data = await response.json();
      setSecureUrl(`http://localhost:5000${data.secureUrl}`);
    } catch (error) {
      console.error('Error fetching secure URL:', error);
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <div className="audio-player">
      <h1>Secure Audio Player</h1>
      <div className="controls">
        <label htmlFor="fileType">Choose format:</label>
        <select id="fileType" value={fileType} onChange={(e) => setFileType(e.target.value)}>
          <option value="mp3">MP3</option>
          <option value="wav">WAV</option>
        </select>
        <button onClick={fetchSecureUrl}>Load Audio</button>
      </div>
      <div className="audio-container">
        {isLoading ? (
          <p>Loading...</p> 
        ) : secureUrl ? (
          <audio controls>
            <source src={secureUrl} type={`audio/${fileType === 'wav' ? 'wav' : 'mpeg'}`} />
            Your browser does not support the audio element.
          </audio>
        ) : (
          <p>No audio loaded</p>
        )}
      </div>
    </div>
  );
};

export default AudioPlayer;
