import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string,
  value: number,
  type: 'income' | 'outcome'
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    try {

      //check balance if type is 'outcome' and you have balance available
      const { total } = this.transactionsRepository.getBalance();
      if (type === 'outcome' && total < value) {
        throw Error('No funds available for this transaction');
      }

      const transaction = this.transactionsRepository.create({ title, value, type });
      return transaction;

    } catch (error) {
      throw error;
    }
  }
}

export default CreateTransactionService;
