// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
var vscode = require('vscode');
var path = require('path');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "simple-html-template" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    var cmdCompileFolder = vscode.commands.registerCommand('extension.shtCompileFolder', function (uri) {
        if (!uri) return;
        const parsedUri = vscode.Uri.parse(uri);
        const systemPath = parsedUri.path;
        const { parseFolder } = require('sht');
        
        vscode.window.showInformationMessage('compile ' + systemPath);
    });
    var cmdWatchFolder = vscode.commands.registerCommand('extension.shtWatchFolder', function (uri) {
        if (!uri) return;
        const parsedUri = vscode.Uri.parse(uri);
        const systemPath = parsedUri.path;
        const relPath = path.relative(vscode.workspace.rootPath, systemPath);
        const glob = '**/' + relPath + '/**/*.html';
        console.log(relPath);
        const watcher = vscode.workspace.createFileSystemWatcher(glob)
        console.log('Watch ' + glob);
        const { parseFolder } = require('sht');
        const listener = (uri) => {
            parseFolder(systemPath)
        }
        watcher.onDidChange(listener);
        watcher.onDidCreate(listener);
        watcher.onDidDelete(listener);
    });

    // context.subscriptions.push(disposable);
    context.subscriptions.push(cmdCompileFolder);
    context.subscriptions.push(cmdWatchFolder);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;