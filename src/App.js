import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
// local
import AnimeList from './pages/AnimeList';

function App() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Anime List
        </Typography>
        <AnimeList />
      </Box>
    </Container>
  );
}

export default App;
