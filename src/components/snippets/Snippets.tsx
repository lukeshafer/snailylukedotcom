import { For, createSignal } from 'solid-js';
import type snippetsData from '../../data/snippets.json';
import Highlight from 'solid-highlight';

export default function Snippets(props: { snippets: typeof snippetsData }) {
	// eslint-disable-next-line solid/reactivity
	const [currentSnippet, setCurrentSnippet] = createSignal(props.snippets[0]);

	return (
		<div class="grid grid-cols-4">
			<ul>
				<For each={props.snippets}>
					{(snippet) => (
						<li>
							<button onClick={() => setCurrentSnippet(snippet)}>
								{snippet.name}
							</button>
						</li>
					)}
				</For>
			</ul>
			<pre>
				<Highlight autoDetect={false} language="html">{`
			<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<title>Document</title>
			</head>
			<body>
				
			</body>
			</html>
			`}</Highlight>
			</pre>
			<div class="col-span-3">{currentSnippet().content}</div>
		</div>
	);
}
