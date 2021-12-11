const { Country, Activity} = require("../db");
const { Router } = require("express");
const router = Router();
const axios = require("axios");
const { Op } = require("sequelize");


async function countriesAll(req, res, next) {
  const resultDb = await Country.findAll({
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
    include: {
      model: Activity,
      attributes: ["name", "difficulty","duration","season"],
      through: {
      attributes: [],
      },
    }
  });
  if (!resultDb.length) {
    try {
      const countriesAll = await axios.get("https://restcountries.com/v3/all");
      const resultApi = countriesAll.data.map((e) => {
        return {
          id: e.cca3,
          name: e.name.common,
          img: e.flags[0],
          continente: e.continents[0],
          capital: e.capital,
          subregion: e.subregion,
          area: e.area,
          poblacion: e.population,
        };
      });

      resultApi.map(async (e) => {
        await Country.create({
          id: e.id,
          name: e.name,
          img: e.img,
          continente: e.continente,
          capital: e.capital ? e.capital[0] : "Capital not found",
          subregion: e.subregion || "Subregion not found",
          area: e.area,
          poblacion: e.poblacion,
          include: {
            model: Activity,
            attributes: ["name", "difficulty","duration","season"],
            through: {
            attributes: [],
            },
          }
        });
      });
      return resultApi;
    } catch (error) {
      console.log(error);
    }
  } else {
    return resultDb;
  }
};

router.get('/countries', async (req, res) => {
  const resultAll = await countriesAll();

  try{
    // Si la db esta llena no se hace nada
    let full = await Country.findAll({
        include: {
            model: Activity,
            attributes: ["name"],
            through: {
                attributes: []
            }
        }
    })
    // Si no hay datos, se crean
    if(!full.length){
        // bulkCreate busca los campos en el objeto y los pasa a la tabla.
await Country.bulkCreate(resultAll)
    } 
} catch (error){
    console.log(error) 
};

  const {name} = req.query;
  if(name){
   let countryName = await Country.findAll({
     where:{
       name:{
         [Op.iLike]: `%${name}%`
       }
     }
   });
   countryName.length?
   res.status(200).send(countryName) :
   res.status(404).send('No se encuentra el pais.');
  };

 
  res.status(200).send(resultAll);
});

router.get('/countries/:id', async (req, res) => {
  const {id} = req.params;
try {
  const resultId = await Country.findByPk(id.toUpperCase(),{
    attributes: {
      exclude: ["createdAt", "updatedAt"],
      },
      include: {
        model: Activity,
        attributes: ["name", "difficulty","duration","season"],
        through: {
        attributes: [],
        },
      }
  });
  if(resultId !== null){
    res.json(resultId)
  }else{
    res.json('Contry not found');
  }
} catch (error) {
    console.log(error)
}
});


router.post('/activity', async (req, res) => {
  var {name, difficulty, duration, season, countries} = req.body;
  
  try{
    console.log('body: ', req.body)

    let newActivity = await Activity.create({
        name,
        difficulty,
        duration,
        season
    });
    if(countries){
      for (let element of countries) {
        let result = await Country.findAll({
              where:{
                name: countries
              }
            });
            await newActivity.addCountry(result) 
      }
    };
  //   if(countries !== null){
  //     countries.forEach(async (country) => {
  //     let activityCountry = await Country.findOne({
  //           where: {
  //               name: country
  //           }
  //     }); 
  //       await newActivity.addCountry(activityCountry)
  //   });
  // };
  
    // let result = await Country.findAll({
    //     where:{
    //       name: {
    //         [Op.in] : countries
    //       }
    //     }
    //   });
    //   result?.map(async(e) => {
    //     await newActivity.addCountry(e)
    //   });
    

      res.status(200).json(newActivity);
} catch(error) {
    console.log(error)
    res.status(404).send('No se pudo crear la actividad')
}
});

router.get('/activities', async (req, res) =>{
  try {
      const activities = await Activity.findAll({
        attributes: ["name"],
        through: {
            attributes: []
        }
      });
      const result = await activities.map(e => e.name);
      res.status(200).json(result);

  } catch (error) {
      console.log(error);
  }
});

module.exports = router;
