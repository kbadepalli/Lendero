const iService = require('../../services/instalment');

describe('Instalment', () => {
  it('should create new user', async () => {
    const loanInfo = {
      principalAmount: 25000,
      interestRate: 3.125,
      numberOfMonths: 48,
      dateOfLoan: '26/01/2021',
      loanId: 1,
    };

    const monthlyPayment = iService.calculateMonthlyPayment(loanInfo);
    expect(monthlyPayment).toBe(554.74);
  });
});
