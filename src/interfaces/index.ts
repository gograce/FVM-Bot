export interface ICommandDTO {
  [key: string]: { desc: string; usage:string; func: (commandArgs: string[]) => {success: boolean, result: string | null, err: string | null} };
}
