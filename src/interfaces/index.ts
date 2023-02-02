interface IResponseDTO {
  success: boolean;
  result: string | null;
  err: string | null;
}
export interface ICommandDTO {
  [key: string]: { desc: string; usage: string; func: (commandArgs: string[]) => IResponseDTO | Promise<IResponseDTO> };
}
