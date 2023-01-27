import { Service } from 'typedi';
import Logger from '../loaders/logger';
import { IQueryDTO } from '../interfaces';

@Service()
export default class QueryService {
  public async solveQuery(query: IQueryDTO) {
    return { success: true, result: null, err: null };
  }
}
