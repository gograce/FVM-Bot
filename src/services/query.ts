import { Service } from 'typedi';
import { ICommandDTO } from '../interfaces';
import config from '../config';
import { ethers } from 'ethers';
import { callApi } from '../helpers/api';
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
      filToEth: {
        desc: 'Convert an address from Fil to Eth format',
        usage: '/filToEth/<FIL_ADDRESS>',
        func: this.crFilToEth,
      },
      ethToFil: {
        desc: 'Convert an address from Eth to FIL format',
        usage: '/ethToFil/<EVM_COMPATIBLE_ADDRESS>',
        func: this.crEthToFil,
      },
      accTx: {
        desc: 'Get Transactions of an address',
        usage: '/accTx/<EVM_COMPATIBLE_ADDRESS or FIL_ADDRESS>',
        func: this.crAccTx,
      },
      txFromHash: {
        desc: 'Get Transaction from tx hash',
        usage: '/txFromHash/<txHash>',
        func: this.crTxFromHash,
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
      result += `\n${key}\n\tDesc  :\t${value.desc}\n\tUsage :\t${value.usage}\n`;
    });
    return { success: true, result: result, err: null };
  };

  private crChainId = (commandArgs: string[]) => {
    return { success: true, result: `ChainId of ${config.network} Network: ${config.chainId}`, err: null };
  };

  private crLatestBlock = async (commandArgs: string[]) => {
    try {
      const provider = new ethers.providers.JsonRpcProvider(config.provider);
      const latestBlock: any = await provider.getBlockNumber();
      return { success: true, result: `Latest Block of ${config.network} Network: ${latestBlock}`, err: null };
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
      return { success: true, result: `Balance: ${balance / 1e18} ${config.unit}`, err: null };
    } catch (err) {
      console.log(err);
      return { success: false, result: null, err: 'Unable to get Balance 😖' };
    }
  };

  private crTxCount = async (commandArgs: string[]) => {
    try {
      const provider = new ethers.providers.JsonRpcProvider(config.provider);
      const txCount: any = await provider.getTransactionCount(commandArgs[2]);
      return { success: true, result: `Transaction Count: ${txCount}`, err: null };
    } catch (err) {
      return { success: false, result: null, err: 'Unable to get Transaction Count 😖' };
    }
  };

  private crFilToEth = async (commandArgs: string[]) => {
    try {
      const url = config.zondaxURL + 'tools/convert/address';
      const body = {
        destination_format: 'eth',
        value: commandArgs[2],
      };
      const res = await callApi(url, config.zondaxToken, body);
      return { success: true, result: `Eth Conversion: ${res}`, err: null };
    } catch (err) {
      return { success: false, result: null, err: 'Unable to Convert 😖' };
    }
  };

  private crEthToFil = async (commandArgs: string[]) => {
    try {
      const url = config.zondaxURL + 'tools/convert/address';
      const body = {
        destination_format: 'fil',
        value: commandArgs[2],
      };
      const res = await callApi(url, config.zondaxToken, body);
      return { success: true, result: `Fil Conversion: ${res}`, err: null };
    } catch (err) {
      return { success: false, result: null, err: 'Unable to Convert 😖' };
    }
  };

  private crAccTx = async (commandArgs: string[]) => {
    try {
      const url = config.zondaxURL + `transactions/address/${commandArgs[2]}`;
      const res = await callApi(url, config.zondaxToken, {});
      return { success: true, result: JSON.stringify(res.Transactions), err: null };
    } catch (err) {
      return { success: false, result: null, err: 'Unable to Get Transactions 😖' };
    }
  };

  private crTxFromHash = async (commandArgs: string[]) => {
    try {
      const url = config.zondaxURL + `transactions/hash/${commandArgs[2]}`;
      const res = await callApi(url, config.zondaxToken, {});
      return { success: true, result: JSON.stringify(res.Transactions), err: null };
    } catch (err) {
      return { success: false, result: null, err: 'Unable to Get Transaction 😖' };
    }
  };
}
