import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, Modal, TextField, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


const Reviews = () => {
  const [professors, setProfessors] = useState([]);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [institution, setInstitution] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch first 10 professors
    axios.get('http://localhost:3000/prof/getProfs?limit=10')
      .then((response) => {
        setProfessors(response.data);
      })
      .catch((error) => console.error('Error fetching professors:', error));
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:3000/prof/addProf', { name, institution });
      alert('Professor added successfully');
      handleClose();
      // Refetch professors after adding a new one
      axios.get('/api/reviews/professors?limit=10')
        .then((response) => {
          setProfessors(response.data);
        })
        .catch((error) => console.error('Error fetching professors:', error));
    } catch (error) {
      console.error('Error adding professor:', error);
      alert('Failed to add professor');
    }
  };

  const handleProfessorClick = (id: string) => {
    navigate(`/professor/${id}`);
  };

  return (
    <div>

      <div style={{ textAlign: 'center', marginBottom: '24px', fontSize: '32px', fontWeight: 'bold' }}>
        Welcome!
      </div>
      <List>
        {professors.map((professor: any) => (
          <Box
            key={professor._id}
            sx={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '16px',
              marginBottom: '16px',
              '&:hover': { backgroundColor: '#f0f0f0', cursor: 'pointer' }
            }}
            onClick={() => handleProfessorClick(professor._id)}
          >
            <Typography variant="h6">{`Name: ${professor.name}`}</Typography>
            <Typography variant="body1">{`Institution: ${professor.institution}`}</Typography>
          </Box>
        ))}
      </List>


      <Modal open={open} onClose={handleClose}>
        <Box sx={styles.modal}>
          <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
            Add Professor
          </Typography>
          <TextField
            label="Name"
            fullWidth
            variant="outlined"
            sx={{ mb: 2 }}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Institution"
            fullWidth
            variant="outlined"
            sx={{ mb: 2 }}
            value={institution}
            onChange={(e) => setInstitution(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Box>
      </Modal>
      <Button variant="contained" color="primary" onClick={handleOpen} style={{ float: 'right' }}>
        Add Professor
      </Button>
    </div>
  );
};

const styles = {
  modal: {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
  },
};

export default Reviews;
