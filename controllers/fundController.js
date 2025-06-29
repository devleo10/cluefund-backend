import Fund from '../models/Fund.js';

export const saveFund = async (req, res) => {
  const { schemeCode, schemeName } = req.body;

  if (!schemeCode || !schemeName) {
    return res.status(400).json({ message: 'Scheme code and name required' });
  }

  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'Invalid or missing user in token' });
    }

    const existingFund = await Fund.findOne({ 
      userId: req.user.id,
      schemeCode: String(schemeCode)
    });

    if (existingFund) {
      return res.status(400).json({ 
        message: 'Fund already exists in your portfolio',
        success: false
      });
    }

    const newFund = new Fund({
      userId: req.user.id,
      schemeCode: String(schemeCode),
      schemeName,
    });

    await newFund.save();
    res.status(201).json({ success: true, message: 'Fund saved successfully' });
  } catch (error) {
    if (error.code === 11000) {
      if (error.keyPattern && (error.keyPattern.userId || error.keyPattern.schemeCode)) {
        return res.status(400).json({ 
          success: false,
          message: 'Fund already exists in your portfolio' 
        });
      } else {
        return res.status(400).json({ 
          success: false,
          message: 'Duplicate fund error' 
        });
      }
    }
    
    res.status(500).json({ 
      success: false,
      message: 'Failed to save fund',
      error: error.message 
    });
  }
};

export const getSavedFunds = async (req, res) => {
  try {
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
  const { schemeCode } = req.body;

  if (!schemeCode) {
    return res.status(400).json({ message: 'Scheme code required' });
  }

  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'Invalid or missing user in token' });
    }
    const result = await Fund.deleteOne({ userId: req.user.id, schemeCode: String(schemeCode) });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Fund not found' });
    }
    res.json({ success: true, message: 'Fund removed successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
