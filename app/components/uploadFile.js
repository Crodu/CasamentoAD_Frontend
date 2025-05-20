import { useRef, useState } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import api from '../api/actions';


const UploadImageComponent = ({gift, setLocalGift}) => {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(gift.image || null);
    const fileInputRef = useRef();

    const handleDrop = (e) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith('image/')) {
        setImage(file);
        setPreview(URL.createObjectURL(file));
        setLocalGift((prev) => ({ ...prev, image: file }));
      }
    };

    const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (file && file.type.startsWith('image/')) {
        setImage(file);
        setPreview(URL.createObjectURL(file));
        setLocalGift((prev) => ({ ...prev, image: file }));
      }
    };

    const handleDragOver = (e) => {
      e.preventDefault();
    };

    return (
      <Box
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      sx={{
        border: '2px dashed #aaa',
        borderRadius: 2,
        p: 2,
        textAlign: 'center',
        cursor: 'pointer',
        mb: 2,
        backgroundColor: '#fafafa'
      }}
      >
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <Box onClick={() => fileInputRef.current.click()} sx={{ cursor: 'pointer' }}>
        {preview ? (
        <img src={preview} alt="Preview" style={{ maxWidth: '100%', maxHeight: 150, marginBottom: 8 }} />
        ) : (
        <>
          <CloudUploadIcon fontSize="large" color="action" />
          <Typography variant="body2" color="textSecondary">
          Drag & drop or click to select an image
          </Typography>
        </>
        )}
      </Box>
      <Box mt={2}>
        <button
        disabled={!image}
        onClick={async (e) => {
          e.stopPropagation();
          if (!image) return;
          // Replace with your S3 upload logic
          const formData = new FormData();
          formData.append('file', image);

          try {
          // Example: POST to your API endpoint that handles S3 upload
          api
            .post(`/upload?file_name=${gift.name}.png`, formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            })
            .then((response) => {
              console.log('File uploaded successfully:', response.data);
              setLocalGift((prev) => ({ ...prev, link: response.data.file_url }));
            })
            .catch((error) => {
              console.error('Error uploading file:', error);
            });
          }
          catch (error) {
            console.error('Error uploading file:', error);
          }
        }}
        style={{
          padding: '8px 16px',
          backgroundColor: '#1976d2',
          color: '#fff',
          border: 'none',
          borderRadius: 4,
          cursor: image ? 'pointer' : 'not-allowed'
        }}
        >
        Upload to S3
        </button>
      </Box>
      </Box>
    );
  }

  UploadImageComponent.propTypes = {
    gift: PropTypes.object.isRequired,
    setLocalGift: PropTypes.func.isRequired,
  };

export default UploadImageComponent;