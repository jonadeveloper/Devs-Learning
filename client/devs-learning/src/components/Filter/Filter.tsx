import { FormControl, Select } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

export default function () {
  return (
    <div className="filter">
      <Box>
        <FormControl>
          <Select></Select>
        </FormControl>
      </Box>
    </div>
  );
}
