const vscode = require('vscode')
const path = require('path')
const fs = require('fs')


function getModuleName() {
    try {
        let workspacePath = vscode.workspace.workspaceFolders[0].uri.path
        let modPath = path.join(workspacePath, "go.mod")
        let data = fs.readFileSync(modPath).toString()
        let moduleNameReg = new RegExp("(?<=module ).*")
        let moduleName =moduleNameReg.exec(data)

        return moduleName[0]
    } catch (err) {
        vscode.window.showInformationMessage("Could not get module name")
    }
}


module.exports = {
    getModuleName
}
