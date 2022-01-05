// Require packages
const express = require('express');
const hbs = require('hbs');
const app = express();
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

// To use partials, we have to register them
hbs.registerPartials(path.join(__dirname + '/views/partials'));

//Setup HBS and views folder
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname + '/views'));

//To use files from public folder
app.use(express.static('public'));

//Routes
app.all('/', (req, res) => {
	res.render('index');
});

//Route for getting all the beers
app.all('/beers', (req, res) => {
	punkAPI
		.getBeers()
		.then((responseFromDB) => {
			console.log('Response is:', responseFromDB);

			res.render('allBeers', { beers: responseFromDB });
		})
		.catch((error) => console.log(error));
});

// With async/await
/*
app.get('/beers', async (req, res) => {
  try {
    const apiResponse = await punkAPI.getBeers();
    res.render("beers", { beers: apiResponse } );
  } catch (err) {
    console.log("Error ", err);
  }
});
*/

//Route for getting a random beer
app.all('/random-beer', (req, res) => {
	punkAPI
		.getRandom()
		.then((responseFromDB) => {
			console.log('Response is:', responseFromDB);

			const randomBeer = responseFromDB[0];
			console.log('the beer:', randomBeer);

			res.render('random-beer', randomBeer);
		})
		.catch((error) => console.log(error));
});

// With async/await
/*
app.get("/random-beer", async (req, res) => {
  try {
    const apiResponse = await punkAPI.getRandom();
    // const oneRandomBeer = apiResponse[0]
    console.log(apiResponse[0])
    res.render("randomBeer", { randomBeer: apiResponse } );
  } catch(err) {
    console.log("Error ", err)
  }
})
*/


// Bonus 6
app.all('/:id', (req, res) => {
	const id = req.params.id;

	punkAPI
		.getBeer(id)
		.then((responseFromDB) => {
			console.log('Response is:', responseFromDB);

			const singleBeer = responseFromDB[0];
			console.log('the beer:', singleBeer);

			res.render('single-beer', singleBeer);
		})
		.catch((err) => console.log(err));
});

app.listen(3000, () => console.log('App is running on port 3000 🎯'));
