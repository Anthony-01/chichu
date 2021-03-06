/**
 * 封装websocket
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var network;
(function (network) {
    /**
     * 套接字处理
     */
    var TcpSocket = (function (_super) {
        __extends(TcpSocket, _super);
        /**
        * 构造套接字
        */
        function TcpSocket(host, port) {
            var _this = _super.call(this) || this;
            /**
             *套接字状态
             */
            _this.m_eSocketStatus = 0 /* soc_unConnect */;
            //设置数据格式为二进制，默认为字符串
            _this.type = egret.WebSocket.TYPE_BINARY;
            //数据监听
            _this.addEventListener(egret.ProgressEvent.SOCKET_DATA, _this.onReceiveMessage, _this);
            //连接监听
            _this.addEventListener(egret.Event.CONNECT, _this.onSocketConnect, _this);
            //关闭监听
            _this.addEventListener(egret.Event.CLOSE, _this.onSocketClose, _this);
            //异常监听
            _this.addEventListener(egret.IOErrorEvent.IO_ERROR, _this.onSocketError, _this);
            return _this;
        }
        /**
        * 将套接字连接到指定的主机和端口
        * @param host 要连接到的主机的名称或 IP 地址
        * @param port 要连接到的端口号
        */
        TcpSocket.prototype.connect = function (host, port) {
            //设置状态
            this.setConnectStatus(1 /* soc_connecting */);
            _super.prototype.connect.call(this, host, port);
        };
        /**
         * 根据提供的url连接
         * @param url 全地址。如ws://echo.websocket.org:80
         */
        TcpSocket.prototype.connectByUrl = function (url) {
            var ws = "ws://" + url;
            _super.prototype.connectByUrl.call(this, ws);
        };
        /**
         * 关闭连接
         */
        TcpSocket.prototype.close = function () {
            //socket关闭
            _super.prototype.close.call(this);
            //释放服务模块
            this.setServiceModule(null);
        };
        /**
        * TCP服务实例
        */
        TcpSocket.prototype.setServiceModule = function (serviceModule) {
            if (this.m_SocketServiceModule)
                this.m_SocketServiceModule = null;
            this.m_SocketServiceModule = serviceModule;
        };
        /**
         * 连接监听
         */
        TcpSocket.prototype.onSocketConnect = function (e) {
            if (this.m_SocketServiceModule) {
                this.m_SocketServiceModule.socketConnectSuccess();
            }
        };
        /**
         * 数据监听
         */
        TcpSocket.prototype.onReceiveMessage = function (e) {
            //加入缓冲队列
            if (this.m_SocketServiceModule) {
                var socket = (e.target);
                //读取数据流
                var buffer = new utils.ByteArray();
                socket.readBytes(buffer.getByteArray(), 0);
                console.log("\u63A5\u6536\u957F\u5EA6=======" + buffer.getLength());
                this.m_SocketServiceModule.pushRecvBuffer(buffer);
            }
        };
        /**
         * 关闭监听
         */
        TcpSocket.prototype.onSocketClose = function (e) {
            //服务关闭
            if (this.m_SocketServiceModule && this.m_SocketServiceModule.getServiceModule()) {
                this.m_SocketServiceModule.getServiceModule().closeService();
            }
            //设置socket状态
            this.setConnectStatus(0 /* soc_unConnect */);
            console.log("socket close");
        };
        /**
         * 异常监听
         */
        TcpSocket.prototype.onSocketError = function (e) {
            //失败通知
            if (this.m_SocketServiceModule) {
                if (this.isConnected()) {
                    //需断线重连
                    this.m_SocketServiceModule.onReconnect();
                }
                else {
                    //连接异常 连接接错误 超时
                    this.m_SocketServiceModule.onReconnect();
                }
            }
            //设置socket状态
            this.setConnectStatus(3 /* soc_error */);
            console.log("socket error");
        };
        /**
         * 连接状态
         */
        TcpSocket.prototype.setConnectStatus = function (status) {
            this.m_eSocketStatus = status;
        };
        /**
         * 连接状态
         */
        TcpSocket.prototype.isConnected = function () {
            return this.m_eSocketStatus == 2 /* soc_connected */;
        };
        return TcpSocket;
    }(egret.WebSocket));
    network.TcpSocket = TcpSocket;
})(network || (network = {}));
