import React, { useEffect, useState } from "react";
import { Container, Typography, TextField, Button, Box } from "@mui/material";
import axios from "axios";
import { PieChart } from "@mui/x-charts/PieChart";

const SurveyForm = () => {
  const [age, setAge] = useState("");
  const [jobTitle, setJobTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = sessionStorage.getItem("userId");
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user_demographics",
        {
          age: age,
          job: jobTitle,
          userId: userId,
        }
      );
      alert("success", response.data);
      setAge("");
      setJobTitle("");
      console.log("Response from the server:", response.data);
    } catch (error) {
      console.error("Error submitting the form:", error.message);
    }
  };

  const [demograpicData, setDemographicData] = useState([]);
  const getAllUsers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/user_demographics"
      );
      setDemographicData(response.data.data);
      console.log("Response of data: ", response.data.data);
    } catch (error) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <Container maxWidth="sm" style={{ marginTop: "50px" }}>
      <Typography variant="h4" align="center" gutterBottom>
        "Your Quote Goes Here"
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Enter your strength"
          variant="outlined"
          fullWidth
          margin="normal"
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <TextField
          label="Enter your job title"
          variant="outlined"
          fullWidth
          margin="normal"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Submit
        </Button>
      </form>
      <Box>
        {demograpicData.map((e) => (
          <>
            {/* <p>ccccccc</p> */}
            <ul key={e.age}>
              <li>{e.age}</li>
            </ul>
          </>
        ))}
      </Box>
      <Box sx={{ marginTop: "10rem" }}>
        <PieChart
          series={[
            {
              data: demograpicData.map((e) => ({
                id: e.id,
                value: parseInt(e.age),
                label: e.job,
              })),cx: 95,
            },
          ]}
          width={400}
          height={200}
        />
      </Box>
    </Container>
  );
};

export default SurveyForm;
