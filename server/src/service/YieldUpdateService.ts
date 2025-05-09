
import TermDepositAccount from '../models/TermDepositAccount';
import { Op } from 'sequelize';

class YieldUpdateService {
  static async updateYields() {
    const activeDeposits = await TermDepositAccount.findAll({
      where: {
        isLocked: true,
        payoutDate: {
          [Op.gt]: new Date()
        }
      }
    });

    for (const deposit of activeDeposits) {
      const dailyYield = (deposit.amountDeposited * (deposit.interestRate / 100)) / 365;
      deposit.accumulatedYield += dailyYield;
      await deposit.save();
    }
  }
}

// Run daily at midnight
setInterval(() => {
  const now = new Date();
  if (now.getHours() === 0 && now.getMinutes() === 0) {
    YieldUpdateService.updateYields();
  }
}, 60000); // Check every minute

export default YieldUpdateService;
