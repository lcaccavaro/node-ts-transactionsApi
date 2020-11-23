import Transaction from "../models/Transaction";
import TransactionsRepository from "../repositories/TransactionsRepository";

interface Response {
  transactions: Transaction[],
  balance: {
    income: number,
    outcome: number,
    total: number,
  }
}

class GetBalanceService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute() {
    const response: Response = {
      transactions: this.transactionsRepository.all(),
      balance: this.transactionsRepository.getBalance()
    }
    return response;
  }
}

export default GetBalanceService;