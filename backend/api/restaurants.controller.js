import RestaurantsDAO from "../dao/restaurantsDAO.js"

export default class RestaurantsController{
  static async apiGetRestaurants(req,res,next){
    const restaurantsPerPage = req.query.restaurantsPerPage ? parseInt(req.query.restaurantsPerPage,10) : 20
    const page = req.query.page ? parseInt(req.query.page,10):0 // checking page no query

    let filters = {} //filters from dao are defined here
    if(req.query.cuisine){ //?cuisine=indian is the query , &page=8 is second query
      filters.cuisine = req.query.cuisine
    }
    else if (req.query.zipcode){
      filters.zipcode = req.query.zipcode
    }
    else if (req.query.name){
      filters.name = req.query.name
    }

    const {restaurantsList, totalNumRestaurants} = await RestaurantsDAO.getRestaurants({
      filters,
      page,restaurantsPerPage,
    }) // return as per parameters. args are defined above.
    let response = { //response gib=ven by dao are stored and sent to dom
      restaurants: restaurantsList,
      page: page,
      filters: filters,
      entries_per_page:restaurantsPerPage,
      total_results: totalNumRestaurants,
    }
    res.json(response)
  } // end of apiGetRestaurants.
  
  static async apiGetRestaurantById(req, res, next) {
     try {
       let id = req.params.id || {}
       let restaurant = await RestaurantsDAO.getRestaurantByID(id)
       if (!restaurant) {
         res.status(404).json({ error: "Not found" })
         return
       }
       res.json(restaurant)
     } catch (e) {
       console.log(`api, ${e}`)
       res.status(500).json({ error: e })
     }
   }

   static async apiGetRestaurantCuisines(req, res, next) {
     try {
       let cuisines = await RestaurantsDAO.getCuisines()
       res.json(cuisines)
     } catch (e) {
       console.log(`api, ${e}`)
       res.status(500).json({ error: e })
     }
   }
 }
