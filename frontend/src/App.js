import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      setError('Пожалуйста, введите поисковый запрос.');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ searchString: searchTerm }),
      });

      const searchResults = await response.json();
      setSearchResults(searchResults);
      setIsLoading(false);

    } catch (error) {
      console.error('Error executing the request:', error.message);
      setIsLoading(false); 
    }
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const Spoiler = ({ title, children }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleToggle = () => {
      setIsExpanded(!isExpanded);
    };

    return (
      <div style={{ marginBottom: '20px' }}>
        <Button
          onClick={handleToggle}
          variant="contained"
          color="primary"
          fullWidth
        >
          {isExpanded ? 'Скрыть' : 'Показать'} {title}
        </Button>
        {isExpanded && <div>{children}</div>}
      </div>
    );
  };

  return (
    <div className="container">
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        style={{ marginTop: '20px' }}
      >
        <Grid item>
          <TextField
            id="outlined-basic"
            label="Star Wars"
            variant="outlined"
            value={searchTerm}
            onChange={handleChange}
          />
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={handleSearch}>
            Искать
          </Button>
        </Grid>
        {error && (
          <Grid item>
            <Typography color="error">{error}</Typography>
          </Grid>
        )}
        {isLoading && (
          <Grid item style={{ width: '100%' }}>
            <LinearProgress />
          </Grid>
        )}
      </Grid>
      <div style={{ border: '1px solid black', marginTop: '25px' }}>
        {searchResults ? (
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}
            style={{ marginTop: '20px' }}
          >
            {searchResults.characters.length > 0 && (
              <Grid item style={{ width: '80%' }}>
                <Spoiler title="Персонажи">
                  <Grid container direction="column" alignItems="center">
                    {searchResults.characters.map((character) => (
                      <Grid
                        item
                        key={character.name}
                        style={{ width: '100%', minWidth: 275 }}
                      >
                        <Card
                          sx={{
                            backgroundColor: '#f5f5f5',
                            margin: '10px',
                            width: '100%',
                          }}
                        >
                          <CardContent>
                            <Typography variant="h5" component="div">
                              {character.name}
                            </Typography>
                            <Typography
                              sx={{ mb: 1.5 }}
                              color="text.secondary"
                            >
                              {character.gender}
                            </Typography>
                            <Typography variant="body2">
                              Mass: {character.mass}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Spoiler>
              </Grid>
            )}

            {searchResults.planets.length > 0 && (
              <Grid item style={{ width: '80%' }}>
                <Spoiler title="Планеты">
                  <Grid container direction="column" alignItems="center">
                    {searchResults.planets.map((planet) => (
                      <Grid
                        item
                        key={planet.name}
                        style={{ width: '100%', minWidth: 275 }}
                      >
                        <Card
                          sx={{
                            backgroundColor: '#f5f5f5',
                            margin: '10px',
                            width: '100%',
                          }}
                        >
                          <CardContent>
                            <Typography variant="h5" component="div">
                              {planet.name}
                            </Typography>
                            <Typography
                              sx={{ mb: 1.5 }}
                              color="text.secondary"
                            >
                              Диаметр: {planet.diameter}
                            </Typography>
                            <Typography variant="body2">
                              Население: {planet.population}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Spoiler>
              </Grid>
            )}

            {searchResults.ships.length > 0 && (
              <Grid item style={{ width: '80%' }}>
                <Spoiler title="Космические корабли">
                  <Grid container direction="column" alignItems="center">
                    {searchResults.ships.map((ship) => (
                      <Grid
                        item
                        key={ship.name}
                        style={{ width: '100%', minWidth: 275 }}
                      >
                        <Card
                          sx={{
                            backgroundColor: '#f5f5f5',
                            margin: '10px',
                            width: '100%',
                          }}
                        >
                          <CardContent>
                            <Typography variant="h5" component="div">
                              {ship.name}
                            </Typography>
                            <Typography
                              sx={{ mb: 1.5 }}
                              color="text.secondary"
                            >
                              Длина корабля: {ship.length}
                            </Typography>
                            <Typography variant="body2">
                              Размер команды: {ship.crew}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Spoiler>
              </Grid>
            )}

            {searchResults.characters.length === 0 &&
              searchResults.planets.length === 0 &&
              searchResults.ships.length === 0 && (
                <Grid item style={{ width: '80%' }}>
                  <Typography variant="h6" style={{ margin: '10px' }}>
                    Поиск не дал результатов.
                  </Typography>
                </Grid>
              )}
          </Grid>
        ) : null}
      </div>
    </div>
  );
};

export default App;
