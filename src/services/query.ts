import { Service } from 'typedi';
import { ICommandDTO } from '../interfaces';
import config from '../config';
import { ethers } from 'ethers';
@Service()
export default class QueryService {
  validCommands: ICommandDTO;

  constructor() {
    this.validCommands = {
      intro: {
        desc: 'Returns an introductory message',
        usage: '/intro',
        func: this.crIntro,
      },
      list: {
        desc: 'List all the available commands',
        usage: '/list',
        func: this.crList,
      },
      chainId: {
        desc: 'List the chainId of the current network',
        usage: '/chainId',
        func: this.crChainId,
      },
      latestBlock: {
        desc: 'List the latest block of current network',
        usage: '/latestBlock',
        func: this.crLatestBlock,
      },
      balance: {
        desc: 'List balance of an Account',
        usage: '/balance/<EVM_COMPATIBLE_ADDRESS>',
        func: this.crBalance,
      },
      txCount: {
        desc: 'List transaction count of an Account',
        usage: '/txCount/<EVM_COMPATIBLE_ADDRESS>',
        func: this.crTxCount,
      },
    };
  }

  public solveQuery = async (command: string) => {
    const commandArgs = command.split('/');
    if (
      this.validCommands[commandArgs[1]] &&
      this.validCommands[commandArgs[1]].usage.split('/').length === commandArgs.length
    ) {
      return await this.validCommands[commandArgs[1]].func(commandArgs);
    }
    return this.crDefault();
  };

  private crDefault = () => {
    return { success: false, result: null, err: 'This is not a valid command 😕 !!!' };
  };

  private crIntro = () => {
    return {
      success: true,
      result: `Hi There !\n${config.bot} is at ur service 🧞‍♂️\nSend \t/list\tto get a list of all supported commands`,
      err: null,
    };
  };

  private crList = (commandArgs: string[]) => {
    let result = `List of available commands are\n`;
    Object.entries(this.validCommands).map(([key, value]) => {
      result += `\n${key}\n\tDesc  :\t${value.desc}\n\tUsage :\t${value.usage}`;
    });
    return { success: true, result: result, err: null };
  };

  private crChainId = (commandArgs: string[]) => {
    return { success: true, result: `ChainId of ${config.network} Network:\t${config.chainId}`, err: null };
  };

  private crLatestBlock = async (commandArgs: string[]) => {
    try {
      const provider = new ethers.providers.JsonRpcProvider(config.provider);
      const latestBlock: any = await provider.getBlockNumber();
      return { success: true, result: `Latest Block of ${config.network} Network:\t${latestBlock}`, err: null };
    } catch (err) {
      console.log(err);
      return { success: false, result: null, err: 'Unable to get Latest Block 😖' };
    }
  };

  private crBalance = async (commandArgs: string[]) => {
    try {
      console.log(config.provider);
      const provider = new ethers.providers.JsonRpcProvider(config.provider);
      const balance: any = await provider.getBalance(commandArgs[2]);
      return { success: true, result: `Balance:\t${balance / 1e18} ${config.unit}`, err: null };
    } catch (err) {
      console.log(err);
      return { success: false, result: null, err: 'Unable to get Balance 😖' };
    }
  };

  private crTxCount = async (commandArgs: string[]) => {
    try {
      const provider = new ethers.providers.JsonRpcProvider(config.provider);
      const txCount: any = await provider.getTransactionCount(commandArgs[2]);
      return { success: true, result: `Transaction Count:\t${txCount}`, err: null };
    } catch (err) {
      console.log(err);
      return { success: false, result: null, err: 'Unable to get Transaction Count 😖' };
    }
  };
}
