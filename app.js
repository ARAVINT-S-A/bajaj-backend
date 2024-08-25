const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

// Sample User Info
const userInfo = {
  user_id: "john_doe_17091999",
  email: "john@xyz.com",
  roll_number: "ABCD123"
};

app.post('/bfhl', (req, res) => {
  console.log('Type of req.body.data:', typeof req.body.data);
  let { data } = req.body;

  if (typeof data === 'string') {
    data = data.replace(/^"|"$/g, '');
    try {
      data = JSON.parse(data);
    } catch (error) {
      console.error('Error parsing data:', error);
      return res.status(400).json({
        is_success: false,
        message: "Invalid input format. 'data' should be an array or a valid JSON string representing an array."
      });
    }
  }

  if (!Array.isArray(data)) {
    return res.status(400).json({
      is_success: false,
      message: "Invalid input format. 'data' should be an array."
    });
  }
  
    const numbers = [];
    const alphabets = [];
    let highestLowerCase = null;
  
    data.forEach(item => {
      item = String(item); // Convert to string to handle both string and number inputs
      if (!isNaN(item)) {
        numbers.push(item);
      } else if (/^[a-zA-Z]$/.test(item)) {
        alphabets.push(item);
        if (item === item.toLowerCase() && (!highestLowerCase || item > highestLowerCase)) {
          highestLowerCase = item;
        }
      }
    });
  
    res.json({
      is_success: true,
      ...userInfo,
      numbers,
      alphabets,
      highest_lowercase_alphabet: highestLowerCase ? [highestLowerCase] : []
    });
  });

// GET /bfhl
app.get('/bfhl', (req, res) => {
  res.status(200).json({
    operation_code: 1
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
