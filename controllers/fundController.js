import Fund from '../models/Fund.js';

export const saveFund = async (req, res) => {
  const { schemeCode, schemeName } = req.body;

  if (!schemeCode || !schemeName) {
    return res.status(400).json({ message: 'Scheme code and name required' });
  }

  try {
    const newFund = new Fund({
      userId: req.user.id,
      schemeCode,
      schemeName,
    });

    await newFund.save();
    res.status(201).json({ message: 'Fund saved successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getSavedFunds = async (req, res) => {
  try {
    const funds = await Fund.find({ userId: req.user.id });
    res.json(funds);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
