const { addStock, updateStock, deleteStock, getStocks,getAllStocksByDate,getAllStocksGroupByDate ,getStocksGroupByDate} = require("../controllers/assignStockToSection");

const assingStockToSectionRoutes=require("express").Router();

assingStockToSectionRoutes.post("/:sectionId/",addStock);
assingStockToSectionRoutes.put("/:sectionId/:stockId/:date",updateStock);
assingStockToSectionRoutes.delete("/:sectionId/:stockId/:date",deleteStock);
assingStockToSectionRoutes.get("/:sectionId/",getStocks);
assingStockToSectionRoutes.get("/:sectionId/:date",getAllStocksByDate);
assingStockToSectionRoutes.get("/:sectionId/group/date/:status",getAllStocksGroupByDate);
assingStockToSectionRoutes.get("/:sectionId/group/by/date/all",getStocksGroupByDate);


module.exports=assingStockToSectionRoutes;