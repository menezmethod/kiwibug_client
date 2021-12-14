import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { UsersList } from './features/users/components/UsersList';

export default function App() {
  return (
    <Container>
      <Box>
        <UsersList />
      </Box>
    </Container>
  );
}
