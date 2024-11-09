export const calculateDividends = (
    amountDeposited: number,
    startDate: Date,
    durationInDays:number,
    interestRate: number
  ) => {
    const start = new Date(startDate);
    const end = new Date (start.getDay() + durationInDays)
  
    const now = new Date();
  
    const totalTerm = end.getTime() - start.getTime();
    const elapsedTerm = now.getTime() - start.getTime();
    const fullDividend = amountDeposited * (interestRate / 100);
  
    const dividendEarned = (elapsedTerm / totalTerm) * fullDividend;
    const dividendToBeEarned = fullDividend - dividendEarned;
  
    return {
      dividendEarned: dividendEarned > 0 ? dividendEarned: 0.00,
      dividendToBeEarned: dividendToBeEarned > 0 ? dividendToBeEarned : 0.00,
    };
  };