import type { DataConnection } from "peerjs";
import { writable } from "svelte/store";

export type TMessage = { type: "move" | "restart"; data?: { index: number; dice: number } };

export function isTMessage(message: unknown): message is TMessage {
	const type = (message as TMessage).type;
	return (message instanceof Object && type === "move") || type === "restart";
}

export const connection = writable<DataConnection>();
