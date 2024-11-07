import React from "react";
import {
  BrowserRouter as Router,
  Routes
} from "react-router-dom";
import "./index.css";
import { AuthProvider } from "./Contexts/Authentication/AuthContext";
import { QueryClient, QueryClientProvider } from "react-query";
import RouterConfig from "./Routers/Router";
import { ThemeProvider } from "@mui/material";
import { muiThemeContext } from "./Contexts/Themes/MUIThemeContext";

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <ThemeProvider theme={muiThemeContext}>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <Routes>
            {RouterConfig}
          </Routes>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
