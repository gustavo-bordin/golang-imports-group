const {formatImport} = require('./imports')
const vscode = require('vscode')

function formatImportsFromAllFiles() {
    let activeEditor = vscode.window.activeTextEditor
    formatImport(activeEditor)
}

function formatImportsFromSelectedFile() {
    let activeEditor = vscode.window.activeTextEditor
    formatImport(activeEditor)
}


module.exports = {
	formatImportsFromAllFiles,
	formatImportsFromSelectedFile
}
