const useGetTermDepositAccount = (id:number)=>{
    return  {
        id: 1,
        depositDate: new Date('2024-01-15'),
        payoutDate: new Date('2024-12-15'),
        interestRate: 5.5,
        amountDeposited: 10000.00,
        accountNumber: 'TD-123456789',
        accountHolderIds: [],
        
      }
}
export default useGetTermDepositAccount