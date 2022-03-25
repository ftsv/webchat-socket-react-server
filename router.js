const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('server is up and running');
});

router.get('/timezones', (req, res) => {
    res.send.json([
  {
    "timezone": "+2",
    "name": "Калининград"
  },
  {
    "timezone": "+3",
    "name": "Москва"
  },
  {
    "timezone": "+4",
    "name": "Самара"
  },
  {
    "timezone": "+5",
    "name": "Екатеринбург"
  },
  {
    "timezone": "+6",
    "name": "Омск"
  },
  {
    "timezone": "+7",
    "name": "Красноярск"
  },
  {
    "timezone": "+8",
    "name": "Иркутск"
  },
  {
    "timezone": "+9",
    "name": "Якутск"
  },
  {
    "timezone": "+10",
    "name": "Владивосток"
  },
  {
    "timezone": "+11",
    "name": "Магадан"
  },
  {
    "timezone": "+12",
    "name": "Петропавловск-Камчатский"
  }
])
})

module.exports = router; 