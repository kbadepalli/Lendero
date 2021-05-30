const express = require('express');
const cors = require('cors');
const iService = require('./services/instalment');
const sequelize = require('./models/db');
const app = express();
const models = require('./models');
const testHelpers = require('./tests/helpers');
const mockData = require('./data/roles.json');
const _ = require('lodash');
const auth = require('./middleware/auth');

const userRouter = require('./api/routes/user');
const roleRouter = require('./api/routes/role');
const authRouter = require('./api/routes/auth');
const clientRouter = require('./api/routes/client');
const loanRouter = require('./api/routes/loan');

const PORT = process.env.PORT || 3030;

const env = process.env.NODE_ENV || 'development';

app.use(express.json());

app.use(cors());

// const addUsers = async () => {
//   await _.each(mockData, (roleInfo) => {
//     models.Role.create(roleInfo).then((role) => {
//       return role.toJSON();
//     });
//   });
// };
console.log('No value for FOO yet:', process.env.NODE_ENV);
// const loanInfo = {
//   principalAmount: 25000,
//   interestRate: 3.125,
//   numberOfMonths: 48,
//   dateOfLoan: '26/01/2021',
//   loanId: 1,
// };

// console.log(iService.calculateMonthlyPayment(loanInfo));

// console.log('calculateMonthlyInterestAmount', iService.calculateMonthlyInterestAmount(loanInfo));

// console.log('calculateMonthlyPrincipalAmount', iService.calculateMonthlyPrincipalAmount(loanInfo));

// console.log('generateAmortizationSchedule', iService.generateAmortizationSchedule(loanInfo));

app.get('/', (req, res) => {
  //   addUsers();
  res.send('API Running');
});
app.use('/', authRouter);
app.use('/', auth.hasValidToken, userRouter);
app.use('/', auth.hasValidToken, roleRouter);
app.use('/', auth.hasValidToken, clientRouter);
app.use('/', auth.hasValidToken, loanRouter);

// (async () => {
//   await sequelize.sync({ force: true });
//   // Code here
// })();

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));

module.exports = app;
