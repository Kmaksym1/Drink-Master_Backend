const { HttpError, ctrlWrapper } = require("../helpers/");

const { recepiesModel } = require("../shemas/recepies");

// const getAllRecepies = async ({ owner }, req) => {
//   const { page = 1, limit = 30 } = req.query;
//   const skip=(page-1)*limit
//   return recepiesModel.find({owner}, "-createdAt -updatedAt", {skip, limit}).populate("owner", "email subscription -_id")
// };

const allRecepies = async (req, res) => {
    console.log(allRecepies)
    const { _id: owner } = req.user;
  
    const recepies = await recepiesModel.find(); // інструмент пошуку для поширення запиту;
    res.json(recepies);
};
  
module.exports = {
    getRecipes: ctrlWrapper(allRecepies),
    
  };