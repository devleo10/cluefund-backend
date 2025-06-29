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
  // Accept schemeCode from body (string)
  const { schemeCode } = req.body;

  if (!schemeCode) {
    return res.status(400).json({ message: 'Scheme code required' });
  }

  try {
    // Debug log
    console.log('removeFund req.user:', req.user, 'schemeCode:', schemeCode);
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'Invalid or missing user in token' });
    }
    // Remove by userId and schemeCode
    const result = await Fund.deleteOne({ userId: req.user.id, schemeCode: String(schemeCode) });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Fund not found' });
    }
    res.json({ success: true, message: 'Fund removed successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
