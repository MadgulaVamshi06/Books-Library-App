const MyBook = require('../models/MyBook');

exports.getMyBooks = async (req, res) => {
  try {
    const mybooks = await MyBook.find({ userId: req.user.id }).populate('bookId');
    res.json(mybooks);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.addMyBook = async (req, res) => {
  const { bookId } = req.params;
  try {
    let existing = await MyBook.findOne({ userId: req.user.id, bookId });
    if (existing) return res.status(400).json({ message: 'Already added' });
    const mybook = new MyBook({ userId: req.user.id, bookId });
    await mybook.save();
    res.status(201).json(mybook);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateStatus = async (req, res) => {
  const { bookId } = req.params;
  const { status } = req.body;
  try {
    const mybook = await MyBook.findOneAndUpdate(
      { userId: req.user.id, bookId },
      { status },
      { new: true }
    );
    res.json(mybook);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateRating = async (req, res) => {
  const { bookId } = req.params;
  const { rating } = req.body;
  try {
    const mybook = await MyBook.findOneAndUpdate(
      { userId: req.user.id, bookId },
      { rating },
      { new: true }
    );
    res.json(mybook);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
};
