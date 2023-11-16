/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface CustomEventMap {
	snippetclick: CustomEvent<{
		node: Node;
	}>;
}
declare global {
	interface HTMLElement {
		//adds definition to Document, but you can do the same with HTMLElement
		addEventListener<K extends keyof CustomEventMap>(
			type: K,
			listener: (this: HTMLElement, ev: CustomEventMap[K]) => void
		): void;
		dispatchEvent<K extends keyof CustomEventMap>(ev: CustomEventMap[K]): void;
	}
	interface Node {
		//adds definition to Document, but you can do the same with HTMLElement
		addEventListener<K extends keyof CustomEventMap>(
			type: K,
			listener: (this: Node, ev: CustomEventMap[K]) => void
		): void;
		dispatchEvent<K extends keyof CustomEventMap>(ev: CustomEventMap[K]): void;
	}
	interface Document {
		//adds definition to Document, but you can do the same with HTMLElement
		addEventListener<K extends keyof CustomEventMap>(
			type: K,
			listener: (this: Document, ev: CustomEventMap[K]) => void
		): void;
		dispatchEvent<K extends keyof CustomEventMap>(ev: CustomEventMap[K]): void;
	}
}
export {};
