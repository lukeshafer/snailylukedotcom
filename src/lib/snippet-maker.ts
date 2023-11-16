const template = document.createElement('template');
template.innerHTML = `
	<style>
		snippet-maker {
			font-family: monospace;
			font-weight: 600;
			padding: 1rem;

			& textarea {
				color: #ddd;
				background-color: #111111;
				padding: 0.4rem;
				display: block;
				width: 100%;
				height: 10rem;
				margin-bottom: 1rem;
			}

			& .content {
				color: #ddd;
				background-color: #111111;
				border: 1px solid #ddd;
				padding: 0.4rem;
				display: block;
				min-height: 10rem;
				position: relative;
				--content: 'Click to copy';
			}

			& .content .copy {
				content: var(--content);
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				opacity: 0;
				transition: opacity 0.2s ease;
				background-color: rgba(0, 0, 0, 0.5);
			}

			& .content:hover .copy {
				opacity: 1;
			}
		}
	</style>

	<textarea placeholder="Enter your snippet here"></textarea>
	<div class="content">
		<div class="copy">Click to copy</div>
		<output></output>
	</div>
`;

export class SnippetMaker extends HTMLElement {
	connectedCallback() {
		this.appendChild(template.content.cloneNode(true));
		const textarea = this.querySelector('textarea')!;
		const content = this.querySelector('.content')!;
		const output = this.querySelector('output')!;
		const copy = this.querySelector('.copy')!;
		let timeout: number;

		textarea.addEventListener('input', () => {
			clearTimeout(timeout);
			const str = textarea.value;
			const stringified = JSON.stringify(str, null, 2);

			timeout = setTimeout(() => {
				output.textContent = stringified;
			}, 250);
		});

		content.addEventListener('click', () => {
			navigator.clipboard.writeText(output.value);
			copy.textContent = 'Copied to clipboard!';
			setTimeout(() => {
				copy.textContent = 'Click to copy';
			}, 1000);
		});
	}
}

customElements.define('snippet-maker', SnippetMaker);
