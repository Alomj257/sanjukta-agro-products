const Product = require("../models/Product");
const Section = require("../models/Section");
const Stock = require("../models/Stock");
const StockJoining = require("../models/StockJoining");

// Add Stock to a Section
exports.addStock = async (req, res, next) => {
  try {
    const { sectionId } = req.params;
    const { stockId, qty, unit } = req.body;

    if (!stockId || !qty) {
      throw new Error("Stock ID and quantity are required");
    }
    const section = await Section.findById(sectionId);
    if (!section) {
      throw new Error("Section not found");
    }
    const stock = await Stock.findById(stockId);
    if (!stock) throw new Error("Invalid stock Id");
    if (stock?.totalStock < qty) throw new Error("Quantity is not available");
    section.stocks.push({ _id: stockId, qty, unit });
    stock.totalStock = stock.totalStock - qty;
    await stock.save();
    await section.save();
    res.status(201).json({ message: "Stock added successfully", section });
  } catch (error) {
    next(error);
  }
};

// Update Stock in a Section
exports.updateStock = async (req, res, next) => {
  try {
    const { sectionId, stockId, date } = req.params;
    const { qty, unit } = req.body;
    const section = await Section.findById(sectionId);
    if (!section) {
      throw new Error("Section not found");
    }

    const stock = section.stocks.find((s) => {
      const isSameStock = s._id?.equals(stockId);
      const stockDate = new Date(s.date).getTime();
      const inputDate = new Date(date).getTime();
      return isSameStock && stockDate === inputDate;
    });
    const stck = await Stock.findById(stockId);
    if (!stock || !stck) {
      throw new Error("Stock not found in section");
    }
    stck.totalStock = stck.totalStock + stock.qty;
    if (stck.totalStock < qty)
      throw new Error("This much quantity is not available");
    stock.qty = qty;
    stock.unit = unit || stock.unit;
    stck.totalStock = stck.totalStock - qty;
    await stck.save();
    await section.save();

    res.status(200).json({ message: "Stock updated successfully", section });
  } catch (error) {
    next(error);
  }
};

// Delete Stock from a Section
exports.deleteStock = async (req, res, next) => {
  try {
    const { sectionId, stockId, date } = req.params;

    const section = await Section.findById(sectionId);
    if (!section) {
      throw new Error("Section not found");
    }
    section.stocks = section.stocks.filter((s) => {
      const isSameStock = s?._id.equals(stockId);
      const stockDateTime = new Date(s.date);
      const inputDateTime = new Date(date);

      return !(
        isSameStock && stockDateTime.getTime() === inputDateTime.getTime()
      );
    });

    await section.save();

    res.status(200).json({ message: "Stock deleted successfully", section });
  } catch (error) {
    next(error);
  }
};

// Retrieve Stocks for a Section
exports.getStocks = async (req, res, next) => {
  try {
    const { sectionId } = req.params;

    const section = await Section.findById(sectionId).populate("stocks._id");
    if (!section) {
      throw new Error("Section not found");
    }

    res.status(200).json({
      message: "Stocks retrieved successfully",
      stocks: section.stocks,
    });
  } catch (error) {
    next(error);
  }
};

// Retrieve Stocks for a Section
exports.getAllStocksByDate = async (req, res, next) => {
  try {
    const { sectionId, date } = req.params;
    const section = await Section.findById(sectionId).lean();
    if (!section) {
      throw new Error("Section not found");
    }
    let filterStock = section.stocks.filter(
      (s) => new Date(s.date).toString() === new Date(date).toString()
    );
    
     filterStock = await Promise.all(filterStock.map(async (v) => {
      if (v._id) {
        const stock = await Stock.findById(v._id);
        return { ...v, _id: stock }; 
      }
      return v;
    }));

    res.status(200).json({
      message: "Stocks retrieved successfully",
      stocks: filterStock,
    });
  } catch (error) {
    next(error);
  }
};
// Retrieve Stocks for a Section
exports.getAllStocksGroupByDate = async (req, res, next) => {
  try {
    const { sectionId, status } = req.params;

    const section = await Section.findById(sectionId);
    const joinerDate = await StockJoining.findOne({
      sectionId: sectionId,
    }).lean();
    if (!section || !joinerDate) {
      throw new Error("Section not found");
    }
    const allDates = joinerDate.stockGroup.filter((v) => v.status === status);
    const updateDetails = await Promise.all(
      Array.isArray(allDates) 
        ? allDates.map(async (v) => {
            const stocks = section.stocks.filter(
              (s) => new Date(s.date).toString() === new Date(v.date).toString()
            );
            const product = await Product.findOne({ date: v.date });
            return { ...v, stocks, product };
          })
        : [] 
    );
    
    res.status(200).json({
      message: "Stocks retrieved successfully",
      stocks: updateDetails,
    });
  } catch (error) {
    next(error);
  }
};
// Retrieve Stocks for a Section
exports.getStocksGroupByDate = async (req, res, next) => {
  try {
    const { sectionId } = req.params;
    const section = await Section.findById(sectionId);
    const joinerDate = await StockJoining.findOne({
      sectionId: sectionId,
    }).lean();
    if (!section || !joinerDate) {
      throw new Error("Section not found");
    }
    const updateDetails = joinerDate.stockGroup.map((v) => {
      const stocks = section.stocks.filter(
        (s) => new Date(s.date).toString() === new Date(v.date).toString()
      );
      return { ...v, stocks };
    });
    res.status(200).json({
      message: "Stocks retrieved successfully",
      stocks: updateDetails,
    });
  } catch (error) {
    next(error);
  }
};
