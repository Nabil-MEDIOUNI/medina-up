import React from 'react';
import { Box } from '@material-ui/core';
import './about.css';
import BackButton from '../../../src/components/_common/BackButton';

const About = () => (
  <Box className="lkolflkol">
    <Box className="mostatil-lowl">
      <Box className="lteli">
        <BackButton
          color
          className="arrowBzzz"
          route="/login"
          fontsize="24px"
        />
      </Box>
      <Box className="img_lowla">
        <img className="ahaya-limg" src="/static/img/aboutmu.png" alt="" />
      </Box>
    </Box>
    <Box className="mostatil-theni">
      <Box className="westani">
        <Box className="titmosta">
          <Box className="mostatil-asfer" />
          <p className="titlino"> Vision </p>
        </Box>
        <Box className="mostatil-gris">
          <p className="faqra">
            Our vision is to create a reliable platform and adapted to the
            network of our LC. This tool is created to track our EPs and
            membership and will be incorporated with the CRM.
          </p>
        </Box>
      </Box>
      <Box className="westani">
        <Box className="titmosta">
          <Box className="mostatil-asfer" />
          <p className="titlino"> What We Are Developing </p>
        </Box>
        <Box className="mostatil-gris">
          <p className="faqra">
            We're developing a mobile app that could be embedded into a tool for
            tracking* to allow native notifications for all smartphones ,
            facilitate the work and could be the new base of MEDINA.
          </p>
        </Box>
      </Box>
    </Box>
    <p className="lekhra">Copyright @ 2020 AIESEC MEDINA Creation</p>
  </Box>
);

export default About;
