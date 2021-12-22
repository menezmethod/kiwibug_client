import * as React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter as Router } from 'react-router-dom';

// import { Notifications } from '@/components/Notifications/Notifications';
import { AuthProvider } from '@/lib/auth';
import { queryClient } from '@/lib/react-query';
import { AlertTitle, Box, Button, Stack } from '@mui/material';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';

const ErrorFallback = () => {
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        Ooops, something went wrong :(
        <Button className="mt-4" onClick={() => window.location.assign(window.location.origin)}>
          Refresh
        </Button>
      </Alert>
    </Stack>
  );
};

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <React.Suspense
      fallback={
        <Box sx={{ display: 'flex' }}>
          <CircularProgress />
        </Box>
      }
    >
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <HelmetProvider>
          <QueryClientProvider client={queryClient}>
            {process.env.NODE_ENV !== 'test' && <ReactQueryDevtools />}
            {/* <Notifications /> */}
            <AuthProvider>
              <Router>{children}</Router>
            </AuthProvider>
          </QueryClientProvider>
        </HelmetProvider>
      </ErrorBoundary>
    </React.Suspense>
  );
};
