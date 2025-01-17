import { Box, Typography, Link, IconButton } from "@mui/material";
import { GitHub } from "@mui/icons-material";
import { colors } from "../../../../styles/themes";
import React from "react";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: colors.greyScale[80],
        color: "#fff",
        padding: "20px 0",
        textAlign: "center",
      }}
    >
      <Typography variant="body2" sx={{ marginBottom: "10px" }}>
        &copy; {new Date().getFullYear()} My Blog. All rights reserved.
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center", gap: "10px" }}>
        <Link
          href="https://github.com/yenliksh"
          target="_blank"
          color="inherit"
        >
          <IconButton>
            <GitHub />
          </IconButton>
        </Link>
      </Box>
      <Typography variant="body2">Check out my code on GitHub.</Typography>
    </Box>
  );
};

export default Footer;
