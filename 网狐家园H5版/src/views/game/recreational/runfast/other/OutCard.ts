namespace game {
    export namespace runfast {

        const OFF = [{
            x: 310,
            y: 65,
            offX: 30,
            scale: 0.7
        },{
            x: 415,
            y: 17,
            offX: 30,
            scale: 0.7
        },{
            x: 30,
            y: 17,
            offX: 30,
            scale: 0.7
        },{
            x: 30,
            y: 17,
            offX: 30,
            scale: 0.7
        }];

        export class OutCard {

            private _chairId: number;

            private _main: GameViewLayer;

            private _outContainer: eui.Group;

           constructor (chairId: number, main: GameViewLayer) {
               this._chairId = chairId;
               this._main = main;
               this._outContainer = main._gameView["runfast_out_card_container_" + chairId];
           }

           setOutCard(viewId: number, cbCardsData?: number[]) {
               if (viewId == df.INVALID_ITEM) {
                   this._outContainer.removeChildren();
                   return;
               }

               this._outContainer.removeChildren();
               //将cbCardsData添加到container中
               cbCardsData.forEach((value, index) => {
                   this.addPoker(value, index, cbCardsData.length);
               })
           }

           clearOutCard() {
               this._outContainer.removeChildren();
           }

           private getString(index: number): string {
               let back = "";
               switch (index) {
                   case 0 : {
                       back += "runfast_game_word_pass_png";
                       break;
                   }
                   case 1 : {
                       // back += "runfast_game_word_pass_png";
                       break;
                   }
                   case 2 : {
                       back += "runfast_game_action_shunzi_png";
                       break;
                   }
                   case 3 : {
                       // back += "runfast_game_word_pass_png";
                       break;
                   }
                   case 4 : {
                       // back += "runfast_game_action_liandui_png";
                       break;
                   }
                   case 5 : {
                       back += "runfast_game_action_three_png";
                       break;
                   }
                   case 6 : {
                       // back += "runfast_game_word_pass_png";
                       break;
                   }
                   case 10 : {
                       back += "runfast_game_action_bomb_png";
                       break;
                   }
                   default : {
                       console.log("设置文字错误");
                       return
                   }
               }
               return back;
           }

           /**
            * 要不起，顺子，三条等等。。。
            * */
           setLabel(index: number) {

               let str = this.getString(index);

               this._outContainer.removeChildren();

               //如果viewId为0，则设为中心，否则设为其他
               let label = new egret.Bitmap();
               let texTure = RES.getRes(str);
               // console.log(cmd.runfast.SUB_S_POKER_KIND[0]);
               label.texture = texTure;
               if (this._chairId == 0) {
                   utils.setAnchorCenter(label);
               }
               if (this._chairId == 1) {
                   label.x = OFF[this._chairId].x - 100;
               } else {
                   label.x = OFF[this._chairId].x;
               }
               label.y = OFF[this._chairId].y;
               this._outContainer.addChild(label);
           }

           private addPoker(value: number, index: number, length: number) {
               let poker = new Poker(value);
               if(this._chairId == 0) {
                   utils.setAnchorCenter(poker);
               }
               // utils.setAnchorCenter(poker);
               poker.x = OFF[this._chairId].x + this.getIndex(index, length) * OFF[this._chairId].offX;
               poker.y = OFF[this._chairId].y;
               poker.scaleX = poker.scaleY = OFF[this._chairId].scale;
               this._outContainer.addChild(poker);
           }


           private getIndex(value: number, length: number): number {
               let back = 0;
               switch (this._chairId) {
                   case 0 : {
                       back = length % 2 ? value - Math.floor(length / 2) : value - length / 2;
                       break;
                   }
                   case 1 : {
                       back = value - length + 1;
                       break;
                   }
                   case 2 :
                   case 3 : {
                       back = value;
                       break;
                   }
               }
               return back;
           }

        }
    }
}