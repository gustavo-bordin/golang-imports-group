const vscode = require('vscode');
const {formatImportsFromSelectedFile, formatImportsFromAllFiles} = require('./src/commands');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	let fromSelectedFileName = 'golang-imports-group.orderImportsSelectedFile'

	let fromSelectedFileCmd = vscode.commands.registerCommand(
		fromSelectedFileName, formatImportsFromSelectedFile
	)
	
	let fromAllFilesName = 'golang-imports-group.orderImportsAllFiles'

	let fromAllFilesCmd = vscode.commands.registerCommand(
		fromAllFilesName, formatImportsFromAllFiles
	);

	console.log("came here")
	context.subscriptions.push(fromSelectedFileCmd, fromAllFilesCmd);
	console.log("came here2")

}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
