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

	context.subscriptions.push(fromSelectedFileCmd, fromAllFilesCmd);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
