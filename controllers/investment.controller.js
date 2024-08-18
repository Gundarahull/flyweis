const Invest = require("../models/invest.model");

const profitCalculator = async (req, res) => {
  const { amount, lockingPeriod } = req.body;
  try {
    //yearly returns 35%
    const yearReturn = 0.35;
    const yearProfit = amount * yearReturn;
    const monthlyProfit = yearProfit / 12;
    const dayProfit = monthlyProfit / 30;
    const totalProfit = monthlyProfit * lockingPeriod;
    const totalAmount = totalProfit + amount;
    return res.status(200).json({
      status: true,
      message: "Profit Calculator",
      results: {
        yearProfit: yearProfit.toFixed(2),
        monthlyProfit: monthlyProfit.toFixed(2),
        dayProfit: dayProfit.toFixed(2),
        totalProfit: totalProfit.toFixed(2),
        totalAmount: totalAmount.toFixed(2),
      },
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      status: "error",
      message: "An unexpected error occurred. Please try again later.",
      error: error.message,
    });
  }
};

const investAmount = async (req, res) => {
  const { amount } = req.body;
  if (!amount) {
    return res.status(400).json({
      status: false,
      message: "Invalid amount",
      results: "Amount is required",
    });
  }
  try {
    const sendAmount = {
      amount: amount,
      userId: req.tokenData._id,
    };
    const investedAmount = await Invest.create(sendAmount);
    return res.status(200).json({
      status: true,
      message: "Investment Amount Added",
      results: investedAmount,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      status: "error",
      message: "An unexpected error occurred. Please try again later.",
      error: error.message,
    });
  }
};

const investTranscations = async (req, res) => {
  try {
    const transcations = await Invest.find({ userId: req.tokenData._id }).sort({
      createdAt: -1,
    });
    return res.status(200).json({
      status: true,
      message: "Investment Transactions",
      results: transcations,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      status: "error",
      message: "An unexpected error occurred. Please try again later.",
      error: error.message,
    });
  }
};
module.exports = {
  profitCalculator,
  investAmount,
  investTranscations
};
