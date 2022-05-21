const vscode = require('vscode')

function getFileContent(activeEditor) {
    return activeEditor.document.getText()
}

function getImportsRange(documentText) {
    let start = 1;
    let documentLines = documentText.split('\n')
    for (var line of documentLines) {
        if (line.includes('import (')) {
            break;
        }
        start++;
    }

    let end = start;
    for (var line of documentLines.slice(start)) {
        if (line.includes(')')) {
            break;
        }
        end++;
    }

    return {
        end,
        start,
    };
};

function importGroupsToString(importsGroup) {
    return Object.keys(importsGroup)
    .filter((key) => importsGroup[key].length)
    .map((key) => importsGroup[key].join('\n'))
    .join('\n\n');
}

function saveImportsGroup(importsGroup, importRanges, activeEditor) {
    const edit = new vscode.WorkspaceEdit();
    const range = new vscode.Range(
        importRanges.start,
        0,
        importRanges.end - 1,
        Number.MAX_VALUE
    );

    let importsParsed = importGroupsToString(importsGroup)
    console.log("imports parsed", importsParsed)
    let documentUri = activeEditor.document.uri
    
    edit.replace(documentUri, range, importsParsed);
    vscode.workspace.applyEdit(edit).then(activeEditor.document.save);
}


module.exports = {
    getFileContent,
    getImportsRange,
    saveImportsGroup
}
