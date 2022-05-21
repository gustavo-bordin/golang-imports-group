const vscode = require('vscode')
const {getModuleName} = require('./go')
const {getFileContent, getImportsRange, saveImportsGroup} = require('./vscode')


const BUILTIN_TYPE = "builtin"
const THIRD_PARTY_TYPE = "thirdParty"
const LOCAL_TYPE = "local"

const BLT = "B/L/T"
const BTL = "B/T/L"

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

function getImportsOrder() {
    let extSettings = vscode.workspace.getConfiguration('goImportsGroup')
    let importOrder = extSettings.get("importsOrder")
    let importGroups = {}

    if(importOrder == BTL) {
        importGroups[BUILTIN_TYPE] = []
        importGroups[THIRD_PARTY_TYPE] = []
        importGroups[LOCAL_TYPE] = []
    } else if(importOrder == BLT) {
        importGroups[BUILTIN_TYPE] = []
        importGroups[LOCAL_TYPE] = []
        importGroups[THIRD_PARTY_TYPE] = []
    }  else {
        importGroups[BUILTIN_TYPE] = []
        importGroups[THIRD_PARTY_TYPE] = []
        importGroups[LOCAL_TYPE] = []
    }


    return importGroups
}

function getImportGroups(importsList) {
    let importsGroup = getImportsOrder()
    

    importsList.filter(n => n).forEach(import_ => {
        let importType = getImportType(import_)
        importsGroup[importType].push(import_)
    })

    return importsGroup
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
