// Through the options literal, the behaviour of the editor can be easily customized.
// Here are a few examples of config options that can be passed to the editor.
// You can also call editor.updateOptions at any time to change the options.

if ("launchQueue" in window) {
	// @ts-ignore
	window.launchQueue.setConsumer((launchParams) => {
		if (launchParams.files && launchParams.files.length) {
			console.log(launchParams);
			handleFiles(launchParams.files);
		}
	});
}

async function handleFiles(files) {
	for (const file of files) {
		const blob = await file.getFile();
		blob.handle = file;
		const text = await blob.text();

		console.log(`${file.name} handled, content: ${text}`);
		const editor = monaco.editor.create(
			document.getElementById("container"),
			{
				value: text,
				language: "javascript",

				lineNumbers: "off",
				roundedSelection: false,
				scrollBeyondLastLine: false,
				readOnly: false,
				theme: "vs-dark",
			}
		);
	}
}
