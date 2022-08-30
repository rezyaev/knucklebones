export type TCell = number | null;
export type TColumn = [TCell, TCell, TCell];
export type TBoard = [TColumn, TColumn, TColumn];

export type TGamemode = "PvAI" | "LPvP" | "OPvP";
