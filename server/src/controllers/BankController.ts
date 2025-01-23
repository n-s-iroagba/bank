import { Request, Response } from 'express';
import BankService from '../service/BankService';


class BankController {
  async getAllBanks(req: Request, res: Response) {
    try{
    const banks = await BankService.getAllBanks();
    res.status(200).json(banks);
    }catch(error:any){
      res.status(500).json({ message: error.message });
    }
  } 
  public async createBanks(req: Request, res: Response): Promise<void> {
    const listerId = req.params.id
    try {
     
      const banksData: { name: string; logo: any }[] = [];
      const logos:any = req.files
      const banks = JSON.parse(req.body.banks);
  
    console.log(logos)

      if (!banks || !logos) {
        throw new Error('error1')
        
      }
  
      if (banks.length !== logos.length) {
        throw new Error('error2')
      }
     console.log(banks[0])
      banks.forEach((b:any, index:number) => {
        banksData.push({
          name: banks[index],
          logo: logos[index],
        });
        console.log(banksData)
      });
  
      if (!banksData || banksData.length === 0) {
        res.status(400).json({ message: 'No valid banks data found in request.' });
        return;
      }
    console.log('data',banksData)
      // Call the service to process the bulk upload
      const result = await BankService.createBanks(banksData,listerId);
  
      res.status(200).json({
        message: 'Banks uploaded successfully',
        count: result.count,
      });
    } catch (error) {
      console.error('Error in bulk upload:', error);
      res
    .status(500).json({ message: 'An error occurred while processing the bulk upload.' });
    }
  }

  async updateBank(req: Request, res: Response) {
    const { name } = req.body;
    const logo = req.file;
    console.log(name)
    console.log(logo)
    const bank = await BankService.updateBank(Number(req.params.id), { name, logo });

    if (bank) {
      res.json(bank);
    } else {
      res.status(404).json({ message: 'Bank not found' });
    }
  }

  async deleteBank(req: Request, res: Response) {
    const success = await BankService.deleteBank(Number(req.params.id));
    if (success) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Bank not found' });
    }
  }
}

export default new BankController();