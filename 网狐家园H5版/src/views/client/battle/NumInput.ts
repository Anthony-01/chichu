namespace client {
    export class NumInput extends eui.Component {
        private _scene: any;
        private _showData: any;
        private _orignalData: number = 1;
        private _inputValue: number = 1;
        private _changeListener: any;
        constructor(scene, showData, changeListener) {
            super();
            this._scene = scene;
            this._showData = showData
            this.skinName = skins.BattleNumInput;
            this.touchEnabled = false;
            this._changeListener = changeListener;
            this.onInitInput();
        }
        private _inputText: eui.TextInput;
        private onInitInput() {
            let btn = this.getChildByName("bt_min");
            btn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onButtonClick, this);

            btn = this.getChildByName("bt_plus");
            btn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onButtonClick, this);

            //输入文本
            let textInput = this.getChildByName("numInput") as eui.TextInput;
            textInput.addEventListener(egret.Event.CHANGE, this.onChange, this);
            textInput.text = `${this._showData.lMinBaseScore}`;
            textInput.inputType = egret.TextFieldInputType.TEL;
            this._inputText = textInput;
        }

        private onChange(e: egret.Event) {
            let textInput = e.target as eui.TextInput;
            if (textInput.text == "") 
                return;

            if (!isNaN(Number(textInput.text))) {
                if (Number(textInput.text) < this._showData.lMinBaseScore) {
                    textInput.text = `${this._showData.lMinBaseScore}`;
                } else if (Number(textInput.text) <= this._showData.lMaxBaseScore) {
    
                }else {
                    textInput.text = `${this._showData.lMaxBaseScore}`;
                }
            } else {
                textInput.text = `${this._showData.lMinBaseScore}`;
            }

            if (null != this._changeListener) {
                this._changeListener(Number(textInput.text));
            }
        }

        private onButtonClick(e: egret.Event) {
            let button = <eui.Button>e.target;
            let name = button.name;

            egret.Tween.get(button)
                .to({ scaleX: 1.1, scaleY: 1.1 }, 100)
                .to({ scaleX: 1.0, scaleY: 1.0 }, 100);

            switch (name) {
                case "bt_plus":
                    {
                        if (Number(this._inputText.text) + 1 <= this._showData.lMaxBaseScore) {
                            this._inputText.text = `${Number(this._inputText.text) + 1}`;
                        }
                    }
                    break
                case "bt_min":
                    {
                        if (Number(this._inputText.text) - 1 >= this._showData.lMinBaseScore) {
                            this._inputText.text = `${Number(this._inputText.text) - 1}`;
                        }
                    }
                    break;
            }

            if (null != this._changeListener) {
                this._changeListener(this.getInputValue());
            }
        }

        private setOrignalCell(cellScore: number) {
            let textInput = this.getChildByName("numInput") as eui.TextInput;
            textInput.text = `${cellScore}`;
        }

        private getInputValue() {
            return this._inputText.text;
        }
    }
}