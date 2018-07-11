;(function(window) {
    function isInWKWebview() {
        return !!(window.webkit &&
            window.webkit.messageHandlers &&
            window.webkit.messageHandlers.appMethodHandler);
    }

    function isInAppAndroid() {
        return !!window.app;
    }

    var isInWk = isInWKWebview();
    var isInAndroid = isInWKWebview() || isInAppAndroid();

    function isInApp(){
        return isInWk || isInAndroid;
    }

    console.log(isInWk, isInAndroid);

    window.app = window.app || {};


    var appInfo = {
        currentId: 0
    };

    var callbacks = {};

    function isFunction(functionToCheck) {
        return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
    }

    ['openWebView', 'closeWebView', 'getVersion', 'shareGameText', 'shareGameImage', 'shareLink'].forEach(function(key) {
        if (app[key]) {
            return;
        }
        app[key] = function() {
            var argumentsToPass = [];
            for (var i = 0; i < arguments.length - 1; ++i) {
                argumentsToPass.push(arguments[i]);
            }
            var cb = null;
            if (arguments.length && isFunction(arguments[arguments.length - 1])) {
                cb = arguments[arguments.length - 1];
            } else {
                argumentsToPass.push(arguments[arguments.length - 1]);
            }

            console.log('parameters', argumentsToPass)
            console.log('callback: ', cb)

            var callbackId = 'p' + (appInfo.currentId++);
            callbacks[callbackId] = cb;
            if (isInWk) {
                try {
                    window.webkit.messageHandlers.appMethodHandler.postMessage({
                        callbackId: callbackId,
                        methodName: key,
                        parameters: JSON.stringify(argumentsToPass)
                    });
                } catch (exception) {
                    alert(exception);
                }
            } else {
                alert("请在Sacbox内运行我们的应用。")
            }
        };
    });

    window.resolveCallback = function(callbackId, data, error) {
        if (!error && callbacks[callbackId]) {
            callbacks[callbackId](data);
        }
        delete callbacks[callbackId];
    }
})(window);