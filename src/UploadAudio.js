import { useState } from "react";
import { Button, Card, CardContent, Chip, Typography } from "@material-ui/core";
import CloudUpload from "@material-ui/icons/CloudUpload";

const SERVER_URL = "https://hammerhead-app-cmqaj.ondigitalocean.app";

const UploadAudio = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [predictedEmotion, setPredictedEmotion] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch(`${SERVER_URL}/predict`, {
        method: "POST",
        body: formData
      });

      const { emotion } = await response.json();
      setPredictedEmotion(emotion);
    } catch (error) {
      console.error(error);
    }
  };

  const renderFileInput = () => (
    <>
      <input
        type="file"
        accept="audio/*"
        onChange={handleFileChange}
        style={{ display: "none" }}
        id="fileInput"
      />
      <label htmlFor="fileInput">
        <Button
          variant="contained"
          component="span"
          color="primary"
          startIcon={<CloudUpload />}
        >
          Select File
        </Button>
      </label>
    </>
  );

  const renderUploadButton = () => (
    <Button
      variant="contained"
      color="primary"
      onClick={handleUpload}
      disabled={!selectedFile}
      style={{ marginLeft: "16px" }}
    >
      Upload
    </Button>
  );

  const renderPredictedEmotion = () => (
    <Card sx={{ width: 300 }}>
      <CardContent align="center">
        <Typography variant="h4" align="center" gutterBottom>
          Predicted Emotion
        </Typography>
        <Chip label={predictedEmotion} color="primary" />
      </CardContent>
    </Card>
  );

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        marginLeft: "auto",
        marginRight: "auto"
      }}
    >
      {predictedEmotion ? (
        renderPredictedEmotion()
      ) : (
        <Card sx={{ width: 300 }}>
          <CardContent align="center">
            <Typography variant="h4" align="center" gutterBottom>
              Upload Audio
            </Typography>
            {renderFileInput()}
            <br />
            <br />
            {renderUploadButton()}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default UploadAudio;
