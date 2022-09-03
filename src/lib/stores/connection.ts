import { isEmpty } from "lodash-es";
import type { DataConnection } from "peerjs";
import { writable } from "svelte/store";

export type TMessage = { type: "move"; data: { index: number; dice: number } };

export function isTMessage(message: unknown): message is TMessage {
	return (
		message instanceof Object &&
		(message as TMessage).type === "move" &&
		!isEmpty((message as TMessage).data)
	);
}

export const connection = writable<DataConnection>();
