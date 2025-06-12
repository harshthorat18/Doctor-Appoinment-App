import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import Layout from '../components/Layout';
import TimePicker from 'react-bootstrap-time-picker';
import { useSelector, useDispatch } from 'react-redux';
import {  useNavigate } from 'react-router-dom';
import axios from 'axios';
import { hideLoading, showLoading } from '../redux/features/alertSlice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ApplyDoctor = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [fromTime, setFromTime] = useState(36000); // 10:00 AM in seconds
  const [toTime, setToTime] = useState(72000); // 8:00 PM in seconds

  const formatTime = (seconds) => {
    const hrs = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const mins = String((seconds % 3600) / 60).padStart(2, '0');
    return `${hrs}:${mins}`;
  };

  const handleFinish = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const values = Object.fromEntries(formData.entries());

    const data = {
      ...values,
      userId: user._id,
      experience: Number(values.experience),
      feesPerConsultation: Number(values.feesPerConsultation),
      specialization: values.specialization,
      timings: [formatTime(fromTime), formatTime(toTime)],
    };

    try {
      dispatch(showLoading());
      const res = await axios.post(
        'http://localhost:8080/api/v1/user/apply-doctor',
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      dispatch(hideLoading());

      if (res.data.success) {
        toast.success('Application submitted successfully!');
        navigate('/');
      } else {
        toast.error(res.data.message || 'Submission failed');
      }
    } catch (error) {
      dispatch(hideLoading());
      console.error(error);
      toast.error('Something went wrong');
    }
  };

  return (
    <Layout>
      <ToastContainer position="top-right" autoClose={3000} />
      <Form onSubmit={handleFinish} className="p-4">
        <h4 className="text-center">Personal Details</h4>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" name="firstName" placeholder="Enter first name" required />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" name="lastName" placeholder="Enter last name" required />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Phone No</Form.Label>
              <Form.Control type="tel" name="phone" placeholder="Enter phone number" required />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" placeholder="Enter email" required />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Website</Form.Label>
              <Form.Control type="url" name="website" placeholder="Enter website" />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control type="text" name="address" placeholder="Enter address" required />
            </Form.Group>
          </Col>
        </Row>

        <h5>Professional Details</h5>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Specialization</Form.Label>
              <Form.Control type="text" name="specialization" placeholder="Enter specialization" required />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Experience</Form.Label>
              <Form.Control type="number" name="experience" placeholder="Enter experience in years" required />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Fees Per Consultation</Form.Label>
              <Form.Control type="number" name="feesPerConsultation" placeholder="Enter fee" required />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Timings</Form.Label>
              <div className="d-flex gap-2">
                <TimePicker start="10:00" end="21:00" step={30} value={fromTime} onChange={setFromTime} />
                <TimePicker start="10:00" end="21:00" step={30} value={toTime} onChange={setToTime} />
              </div>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Check type="checkbox" label="Agree to terms" required />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit 
        </Button>
      </Form>
    </Layout>
  );
};
