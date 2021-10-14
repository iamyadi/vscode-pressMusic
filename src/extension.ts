// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import PlayCenter from './playCenter';

let documentChangeListenerDisposer: vscode.Disposable|null = null;
let statusBarPause: vscode.StatusBarItem;
let statusBarPlay: vscode.StatusBarItem;

let isStop = false;
// config values
let enabled = true;
let playCenter:PlayCenter|null = null;
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	vscode.workspace.onDidChangeConfiguration(onDidChangeConfiguration);
    onDidChangeConfiguration();
}

// this method is called when your extension is deactivated
export function deactivate() {
	if(playCenter) {
		playCenter.dispose();
	}
	if (documentChangeListenerDisposer) {
        documentChangeListenerDisposer.dispose();
        documentChangeListenerDisposer = null;
    }
}

function onDidChangeConfiguration() {
	const config = vscode.workspace.getConfiguration('pressMusic');
	enabled = config.get<boolean>('enabled', true);
	if(enabled){
		init(config);
	} else {
		deactivate();
	}
}
function init(config: vscode.WorkspaceConfiguration){
	// clear all
	deactivate();
	// set status bar item
	setVolContraller();
	// set listener
	playCenter = new PlayCenter(config.get<string>('type', 'piano'));
	documentChangeListenerDisposer = vscode.workspace.onDidChangeTextDocument(onDidChangeTextDocument);
}

function setVolContraller(){
	const pauseCommandId = 'pressMusic.pause';
	vscode.commands.registerCommand(pauseCommandId, onchangeVolume);

	statusBarPause = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 300);
	statusBarPause.command = pauseCommandId;
	statusBarPause.text = "$(debug-pause) PressMusic";
	statusBarPause.tooltip = "stop press music!";
	
	statusBarPlay = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 300);
	statusBarPlay.command = pauseCommandId;
	statusBarPlay.text = "$(run) PressMusic";
	statusBarPlay.tooltip = "play press music!";

	statusBarPause.show();
}

function changeVolumeController(){
	if(isStop){
		statusBarPause.hide();
		statusBarPlay.show();
	} else {
		statusBarPlay.hide();
		statusBarPause.show();
	}
}

function onchangeVolume() {
	isStop = !isStop;
	changeVolumeController();
	vscode.window.showInformationMessage(isStop ? 'pressMusic已经暂停!!!' : '已经开启pressMusic，enjoy~~~');
}

function onDidChangeTextDocument(event: vscode.TextDocumentChangeEvent){
	const text = event.contentChanges?.[0].text;
	!isStop && playCenter?.play(text);
}