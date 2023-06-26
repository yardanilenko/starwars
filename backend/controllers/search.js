const axios = require('axios');

exports.search = async (req, res) => {
  try {
    const { searchString } = req.body;
    const [shipsResponse, planetsResponse, charactersResponse] = await Promise.all([
      axios.get(`https://swapi.dev/api/starships/?search=${searchString}`),
      axios.get(`https://swapi.dev/api/planets/?search=${searchString}`),
      axios.get(`https://swapi.dev/api/people/?search=${searchString}`),
    ]);

    const handleResponse = (response) => {
      if (response.status !== 200) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.data;
    };

    const ships = await handleResponse(shipsResponse);
    const planets = await handleResponse(planetsResponse);
    const characters = await handleResponse(charactersResponse);

    const searchResults = {
      ships: ships.results,
      planets: planets.results,
      characters: characters.results,
    };
    res.json(searchResults);
  } catch (error) {
    console.log('ERROR LIST ==>', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
