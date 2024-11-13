import { ThemeProvider } from "@emotion/react";
import React from "react";
import { muiThemeContext } from "../../Contexts/Themes/MUIThemeContext";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Breadcrumbs,
  Grid2,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import faqs from '../../Data/Faqs.json'

const FrequentlyAskedQuestions: React.FC = () => {
  const breadcrumbs = [
    <Link key="1" color="inherit" to="/user/support">
      Support
    </Link>,
    <Typography key="3" sx={{ color: "text.primary" }}>
      Frequently Asked Questions (FAQs)
    </Typography>,
  ];

  return (
    <>
      <ThemeProvider theme={muiThemeContext}>
        <Grid2 container spacing={2}>
          <Grid2 size={2} />
          <Grid2 size={8}>
            <div className="flex flex-col mt-10">
              <div className="flex items-center">
                <Breadcrumbs separator="›" aria-label="breadcrumb">
                  {breadcrumbs}
                </Breadcrumbs>
              </div>
              <div className="mt-5">
                {faqs.map((faq) => (
                <Accordion key={faq.id}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    <Typography fontWeight={700}>{faq.question}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      {faq.answer}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                ))}
              </div>
            </div>
          </Grid2>
          <Grid2 size={2} />
        </Grid2>
      </ThemeProvider>
    </>
  );
};

export default FrequentlyAskedQuestions;
