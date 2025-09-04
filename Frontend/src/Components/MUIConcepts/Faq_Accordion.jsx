import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React, { useState } from "react";

const faqs = [
  {
    title: "JavaScript",
    question: "What is JavaScript?",
    answer:
      "JavaScript is a versatile, high-level programming language used to make web pages interactive and dynamic. It runs in the browser and on servers via environments like Node.js.",
  },
  {
    title: "ReactJS",
    question: "What is ReactJS?",
    answer:
      "ReactJS is a JavaScript library for building user interfaces. It uses a component-based architecture, enabling developers to build reusable UI pieces.",
  },
  {
    title: "NodeJS",
    question: "What is NodeJS?",
    answer:
      "NodeJS is a runtime environment that allows executing JavaScript code outside the browser, commonly used for building scalable backend applications.",
  },
  {
    title: "Sequelize",
    question: "What is Sequelize?",
    answer:
      "Sequelize is a promise-based Node.js ORM for Postgres, MySQL, MariaDB, SQLite, and Microsoft SQL Server. It provides easy-to-use methods for database operations.",
  },
];
const Faq_Accordion = () => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box
      sx={{
        maxWidth: "800px",
        margin: "auto",
        padding: "20px",
        backdropFilter: "blur(80px)",
        borderRadius: "20px",
      }}
    >
      {faqs.map((faq, index) => (
        <Accordion
          key={index}
          expanded={expanded === `panel${index}`}
          onChange={handleChange(`panel${index}`)}
          sx={{
            marginBottom: "12px",
            borderRadius: "12px",
            background:
              "linear-gradient(145deg, rgba(29,29,29,0.9), rgba(60,60,60,0.8))",
            color: "#fff",
            boxShadow: "0px 4px 20px rgba(0,0,0,0.3)",
            "&:before": {
              display: "none",
            },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: "#f5b642" }} />}
            aria-controls={`panel${index}bh-content`}
            id={`panel${index}ph-header`}
            sx={{
              "& .MuiTypography-root": {
                fontSize: "1.1rem",
              },
            }}
          >
            <Typography
              component={"span"}
              sx={{
                width: "30%",
                fontWeight: "bold",
                color: "#d4941dff",
              }}
            >
              {faq.title}
            </Typography>
            <Typography component={"span"} sx={{ color: "#ccc" }}>
              {faq.question}
            </Typography>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              textAlign: "center",
              backgroundColor: "rgba(255,255,255,0.05)",
              borderRadius: "0 0 12px 12px",
              fontSize: "1rem",
              padding: 3,
            }}
          >
            <Typography sx={{ color: "#fff", lineHeight: 1.6 }}>
              {faq.answer}
            </Typography>
          </AccordionDetails>
        </Accordion>    
      ))}
    </Box>
  );
};

export default Faq_Accordion;
