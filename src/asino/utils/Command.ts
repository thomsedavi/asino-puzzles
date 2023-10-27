import { Variables } from "../Variables";
import { AsinoCommand, CommandResult } from "../types/Command";
import { getNumberResultFromAsinoNumber } from "./Number";

export const getCommandResultFromAsinoCommand = (command: AsinoCommand, variables: Variables): CommandResult => {
  let newReferences = variables;

  if (command.numberVariableDictionary !== undefined) {
    newReferences = variables.clone().addParameters(command);
  }

  if (command.commandId !== undefined) {
    const commandResult = variables.commandDictionary[command.commandId];

    if (commandResult !== undefined)
      return getCommandResultFromAsinoCommand(commandResult, variables);
  }

  const result: CommandResult = {};

  command.letter !== undefined && (result.letter = command.letter);
  command.dx1 !== undefined && (result.dx1 = getNumberResultFromAsinoNumber(command.dx1, newReferences));
  command.dx2 !== undefined && (result.dx2 = getNumberResultFromAsinoNumber(command.dx2, newReferences));
  command.dx !== undefined && (result.dx = getNumberResultFromAsinoNumber(command.dx, newReferences));
  command.dy1 !== undefined && (result.dy1 = getNumberResultFromAsinoNumber(command.dy1, newReferences));
  command.dy2 !== undefined && (result.dy2 = getNumberResultFromAsinoNumber(command.dy2, newReferences));
  command.dy !== undefined && (result.dy = getNumberResultFromAsinoNumber(command.dy, newReferences));
  command.x1 !== undefined && (result.x1 = getNumberResultFromAsinoNumber(command.x1, newReferences));
  command.x2 !== undefined && (result.x2 = getNumberResultFromAsinoNumber(command.x2, newReferences));
  command.x !== undefined && (result.x = getNumberResultFromAsinoNumber(command.x, newReferences));
  command.y1 !== undefined && (result.y1 = getNumberResultFromAsinoNumber(command.y1, newReferences));
  command.y2 !== undefined && (result.y2 = getNumberResultFromAsinoNumber(command.y2, newReferences));
  command.y !== undefined && (result.y = getNumberResultFromAsinoNumber(command.y, newReferences));

  return result;
}
