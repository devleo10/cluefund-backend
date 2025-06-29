import Fund from '../models/Fund.js';

export const saveFund = async (req, res) => {
  const { schemeCode, schemeName } = req.body;

  if (!schemeCode || !schemeName) {
    return res.status(400).json({ message: 'Scheme code and name required' });
  }

  try {
    // Debug log
    console.log('saveFund req.user:', req.user);
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'Invalid or missing user in token' });
    }
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
    // Debug log
    console.log('getSavedFunds req.user:', req.user);
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'Invalid or missing user in token' });
    }
    const funds = await Fund.find({ userId: req.user.id });
    res.json({ success: true, funds });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const removeFund = async (req, res) => {
  const { fundId } = req.body;

  if (!fundId) {
    return res.status(400).json({ message: 'Fund ID required' });
  }

  try {
    // Debug log
    console.log('removeFund req.user:', req.user);
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'Invalid or missing user in token' });
    }
    await Fund.deleteOne({ _id: fundId, userId: req.user.id });
    res.json({ message: 'Fund removed successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
