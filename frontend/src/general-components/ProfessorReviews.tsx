import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, TextField, Modal, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProfessorReviews: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get professor ID from URL params
  const [reviews, setReviews] = useState([]);
  const [professorName, setProfessorName] = useState('');
  const [professorInstitution, setProfessorInstitution] = useState('');
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState('');

  useEffect(() => {
    // Fetch reviews for the professor
    axios.get(`http://localhost:3000/reviews/professor/${id}`)
      .then((response) => {
        setReviews(response.data);
      })
      .catch((error) => console.error('Error fetching reviews:', error));

    // Fetch professor's name
    axios.get(`http://localhost:3000/prof/getProf/${id}`)
      .then((response) => {
        setProfessorName(response.data.name);
        setProfessorInstitution(response.data.institution)
      })
      .catch((error) => console.error('Error fetching professor name:', error));
  }, [id]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:3000/reviews/create', {
        professorId: id,
        comment,
      });
      alert('Review added successfully');
      setComment('');
      handleClose();

      // Refetch reviews after adding a new one
      axios.get(`http://localhost:3000/reviews/professor/${id}`)
        .then((response) => {
          setReviews(response.data);
        });
    } catch (error) {
      console.error('Error adding review:', error);
      alert('Failed to add review');
    }
  };
  const handleAiSummery = async () => {
    try {
      //@ts-ignore
      const reviewsStr = reviews.map((review) => { return review.comment })
      const summary = await axios.post('http://localhost:3000/ai/summarize', {
        reviews: reviewsStr
      });
      console.log(`summary ${summary}`)
      if(summary){
        <Modal open={open} onClose={handleClose}>
        <div>lalala</div>
      </Modal>
      }

    } catch (error) {
      console.error('Error adding review:', error);
      alert('Failed to add review');
    }
  };

  return (
    <div>
      <Typography variant="h4" component="h1" sx={{ mb: 4 }}>
        Name: {professorName}
        <br/>
        institution: {professorInstitution}
      </Typography>
      

      <Button variant="contained" color="primary" onClick={handleAiSummery} style={{ float: 'left' }}>
        get Ai Summery
      </Button>
      <Button variant="contained" color="primary" onClick={handleOpen} style={{ float: 'right' }}>
        Add Review
      </Button>

      {/* Display reviews in a table */}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Review #</TableCell>
            <TableCell>Comment</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reviews.map((review: any, index: number) => (
            <TableRow key={review._id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{review.comment}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Modal for adding review */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={styles.modal}>
          <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
            Add Review
          </Typography>
          <TextField
            label="Comment"
            fullWidth
            variant="outlined"
            sx={{ mb: 2 }}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Box>
      </Modal>
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

export default ProfessorReviews;
