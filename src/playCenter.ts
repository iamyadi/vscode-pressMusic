import * as vscode from 'vscode';
import player from './player';

const keymMap = {
    q: 1,
    w: 2,
    e: 3,
    r: 4,
    t: 5,
    y: 6,
    u: 7,
    i: 8,
    o: 9,
    p: 10,
    a: 1,
    s: 2,
    d: 3,
    f: 4,
    g: 5,
    h: 6,
    j: 7,
    k: 8,
    l: 9,
    z: 1,
    x: 2,
    c: 3,
    v: 4,
    b: 5,
    n: 6,
    m: 7,
    otherDo: 11,
    otherTi: 12,
};

export default class PlayCenter{
    opt: string;
    timer: NodeJS.Timeout | undefined;
    constructor(opt: string){
        this.opt = opt || 'default';
        this.reminder();
    }
    reminder(){
        const config = vscode.workspace.getConfiguration('pressMusic');
        const reminderTime = config.get<number>('reminderTime', 1);
        const reminderEnabled = config.get<boolean>('reminderEnabled', true);
        if(!reminderEnabled){
            return;
        }
        this.timer = setInterval(()=>{
            this.play('reminderTime');
            vscode.window.showInformationMessage('是时候休息一下啦啦啦~~~ pressMusic reminder');
        }, reminderTime*60*60*1000);
    }
    play(text: string){
        if(text === 'reminderTime') {
            player.play(`./music/reminder.mp3`, {}, (err: any)=>{
                console.log('err:', err);
            });
            return;
        }
        let keyText = '';
        if(text === '\n'){
            keyText = 'otherDo';
        } else if (text.trim() === ""){
            keyText = 'otherTi';
        } else {
            keyText = text.trim();
        }

        player.play(`./music/${keymMap[keyText]}.mp3`, {}, (err: any)=>{
            console.log('err:', err);
        });
    }
    dispose(){
        this.timer && clearInterval(this.timer);
    }
}