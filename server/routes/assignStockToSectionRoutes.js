const { addStock, updateStock, deleteStock, getStocks } = require("../controllers/assignStockToSection");

const assingStockToSectionRoutes=require("express").Router();

assingStockToSectionRoutes.post("/:sectionId/",addStock);
assingStockToSectionRoutes.put("/:sectionId/:stockId",updateStock);
assingStockToSectionRoutes.delete("/:sectionId/:stockId",deleteStock);
assingStockToSectionRoutes.get("/:sectionId/",getStocks);


module.exports=assingStockToSectionRoutes;