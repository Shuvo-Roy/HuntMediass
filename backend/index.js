const express = require('express')
const cors = require('cors');
const app = express();
app.use(express.json());

app.use(cors({
    credentials: true,
    origin: 'https://hunt-mediass-sfv9.vercel.app',
}))

app.get('/test', (req,res)=>{
    res.json("hello")
})

app.post('/api/saveData', async (req, res) => {
    try {
      const {
        id: randomId,
        startDate,
        endDate,
        monthYear,
        startMonth,
        startYear,
        datesExcluded,
        numberOfDays,
        leadCount,
        expectedDrr,
        lastUpdate,
      } = req.body;
  
      const data = {
        id: randomId,
        startDate,
        endDate,
        monthYear,
        startMonth,
        startYear,
        datesExcluded,
        numberOfDays,
        leadCount,
        expectedDrr,
        lastUpdate,
      };
  
      res.json(data);
    } catch (error) {
      console.error('Error while processing the request:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  










const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});