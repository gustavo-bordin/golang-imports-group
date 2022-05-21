const vscode = require('vscode')
const {getModuleName} = require('./go')
const {getFileContent, getImportsRange, saveImportsGroup} = require('./vscode')


const BUILTIN_TYPE = "builtin"
const THIRD_PARTY_TYPE = "thirdParty"
const LOCAL_TYPE = "local"

function getImports(fileContent) {
    try {
        let importsRegex = new RegExp("(?<=import \\(\n).*?(?=\\))", "s")
        let imports = importsRegex.exec(fileContent)[0]
        return imports
    } catch(_) {
        vscode.window.showErrorMessage("Could not find imports")
    }
}

function convertImportsToList(imports) {
    return imports.split("\n")
}

function getImportType(import_) { 
    let goModName = getModuleName()
    
    let isBuiltin = !import_.includes(".") && !import_.includes(goModName)
    let isThirdParty = import_.includes(".") && !import_.includes(goModName)
    let isLocal = import_.includes(goModName)

    if(isBuiltin) {
        return BUILTIN_TYPE
    } else if(isThirdParty) {
        return THIRD_PARTY_TYPE
    } else if(isLocal) {
        return LOCAL_TYPE
    }
}

function getImportGroups(importsList) {
    let importGroups = {
        [BUILTIN_TYPE]: [],
        [THIRD_PARTY_TYPE]: [],
        [LOCAL_TYPE]: []
    }

    importsList.filter(n => n).forEach(import_ => {
        let importType = getImportType(import_)
        importGroups[importType].push(import_)
    })

    return importGroups
}

function formatImport(activeEditor) {
    let fileContent = getFileContent(activeEditor)
    let imports = getImports(fileContent)
    let importsList = convertImportsToList(imports)
    let importsGroup = getImportGroups(importsList)
    let importsRange = getImportsRange(fileContent)
    saveImportsGroup(importsGroup,importsRange,activeEditor)
}

module.exports = {
    formatImport,
    getImports,
}
