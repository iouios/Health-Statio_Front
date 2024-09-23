import React, { useState } from 'react';
import { useTheme, useMediaQuery } from '@mui/material';
// Other imports

const HealthHistoryTable: React.FC = () => {
  const [state, setState] = useState();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div>
       3
    </div>
  );
};

export default HealthHistoryTable;
