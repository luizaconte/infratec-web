const FiorilliWebExtension = function () {
  this.ngZone = null;
  this.successCallback = null;
  this.errorCallback = null;
};

(function ($) {
  let _chromeExtensionId = 'hcbeidgfmkgomnehecnfelbcppoifoee';
  let _firefoxExtensionId = 'webextension@fiorilli.com.br';

  let _installUrlFirefox = 'https://addons.mozilla.org/firefox/addon/fiorilli-web-extension';
  let _installUrlChrome = 'https://chrome.google.com/webstore/detail/' + _chromeExtensionId;

  let eventPageRequestName = 'br.com.fiorilli.webextension.request';
  let eventPageResponseName = 'br.com.fiorilli.webextension.response';

  let pendingCommands = {};

  $.Promise = function (ngZone) {
    this.ngZone = ngZone;
    this.successCallback = function () {
    };
    this.errorCallback = null;
  };

  $.Promise.prototype.success = function (callback) {
    this.successCallback = callback;
    return this;
  };

  $.Promise.prototype.error = function (callback) {
    this.errorCallback = callback;
    return this;
  };

  $.Promise.prototype._invokeSuccess = function (result) {
    let _sucessCallback = function () {
      $._log('Success ignored (no callback registered)');
    };
    let callback = this.successCallback || _sucessCallback;
    this._apply(function () {
      callback(result);
    });
  };

  $.Promise.prototype._invokeError = function (result) {
    let _errorCallback = function () {
      $._log('Error ignored (no callback registered)');
    };
    let callback = this.errorCallback || _errorCallback;
    this._apply(function () {
      callback(result);
    });
  };

  $.Promise.prototype._apply = function (callback) {
    if (this.ngZone) {
      this.ngZone.run(function () {
        callback();
      });
    } else {
      callback();
    }
  };

  $.redirectToInstallPage = function () {
    window.open(navigator.userAgent.indexOf('Chrome') >= 0 ? _installUrlChrome : _installUrlFirefox, '_blank');
  };

  $._createContext = function (args) {
    let promise = new $.Promise(this.ngZone);
    if (args && args.success) {
      promise.success(args.success);
    }
    if (args && args.error) {
      promise.error(args.error);
    }
    return {
      promise: promise
    };
  }

  $.init = function (args) {
    if (args.ready) {
      this.ready = args.ready;
    }

    if (args.ngZone) {
      this.ngZone = args.ngZone;
    }

    let context = $._createContext(args);
    let metaId = document.querySelector('#' + CSS.escape(navigator.userAgent.indexOf('Chrome') >= 0 ? _chromeExtensionId : _firefoxExtensionId));
    if (metaId) {
      $._sendCommand(context, 'initialize', null);
    } else {
      setTimeout(function () {
        context.promise._invokeError({
          success: false,
          hasExtension: false,
          exception: 'extension not installed'
        });
      }, 1000);
    }
    return context.promise;
  }

  $.listCertificates = function (args) {
    let context = $._createContext(args);
    $._sendCommand(context, 'listCertificates', null);
    return context.promise;
  }

  $.readCertificate = function (args) {
    if (!args) {
      args = {};
    }
    let request = {
      thumbprint: args.thumbprint
    };
    let context = $._createContext(args);
    $._sendCommand(context, 'readCertificate', request);
    return context.promise;
  }

  $.chooseCertificate = function (args) {
    let context = $._createContext(args);
    $._sendCommand(context, 'chooseCertificate', null);
    return context.promise;
  }

  $.signData = function (args) {
    if (!args) {
      args = {};
    }
    let request = {
      content: args.content,
      thumbprint: args.thumbprint,
      certificate: args.certificate || {}
    };
    let context = $._createContext(args);
    $._sendCommand(context, 'signData', request);
    return context.promise;
  }

  $.signPDF = function (args) {
    if (!args) {
      args = {};
    }
    let request = {
      content: args.content,
      contentPath: args.contentPath,
      thumbprint: args.thumbprint,
      certificate: args.certificate || {},
      pdf: args.pdf || {}
    };
    let context = $._createContext(args);
    $._sendCommand(context, 'signPDF', request);
    return context.promise;
  }

  $.signXMLElement = function (args) {
    if (!args) {
      args = {};
    }
    let request = {
      content: args.content,
      elements: args.elements,
      thumbprint: args.thumbprint,
      certificate: args.certificate || {}
    };
    let context = $._createContext(args);
    $._sendCommand(context, 'signXMLElement', request);
    return context.promise;
  }

  $.pdfViewer = function (args) {
    if (!args) {
      args = {};
    }
    let request = {
      content: args.content,
      thumbprint: args.thumbprint
    };
    let context = $._createContext(args);
    $._sendCommand(context, 'pdfViewer', request);
    return context.promise;
  }

  $.openXMLSignature = function (args) {
    if (!args) {
      args = {};
    }
    let request = {
      content: args.content
    };
    let context = $._createContext(args);
    $._sendCommand(context, 'openXMLSignature', request);
    return context.promise;
  }

  $.openPDFSignature = function (args) {
    if (!args) {
      args = {};
    }
    let request = {
      content: args.content
    };
    let context = $._createContext(args);
    $._sendCommand(context, 'openPDFSignature', request);
    return context.promise;
  }

  $._sendCommand = function (context, command, request) {
    let requestId = this._generateUUID();
    let requestContext = {
      context: context,
      request: {
        requestName: eventPageRequestName,
        message: {
          requestId: requestId,
          command: command,
          request: request
        }
      }
    };
    pendingCommands[requestId] = requestContext;
    window.postMessage(requestContext.request, '*');
  }

  $._onResponseReceived = function (response) {
    let request = pendingCommands[response.message.requestId];
    delete pendingCommands[response.message.requestId];
    if (request) {
      if (response.message.success) {
        request.context.promise._invokeSuccess(response.message);
      } else {
        request.context.promise._invokeError(response.message);
      }
    }
  }

  $._generateUUID = function () {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (value) => (value ^ Math.random() * 16 >> value / 4).toString(16));
  };

  $._log = function (message, data) {
    if (data) {
      window.console.log('%c[Fiorilli Web Extension SDK]', 'color: green; font-weight: bold;', message, data);
    } else {
      window.console.log('%c[Fiorilli Web Extension SDK]', 'color: green; font-weight: bold;', message);
    }
  }

  window.addEventListener('message', function (event) {
    if (event && event.data && event.data.responseName === eventPageResponseName) {
      $._onResponseReceived(event.data);
    }
  });
}(FiorilliWebExtension.prototype));

if (typeof exports === 'object') {
  if (Object.defineProperties) {
    Object.defineProperties(exports, {
      'default': {
        value: FiorilliWebExtension
      },
      '__esModule': {
        value: true
      },
      'FiorilliWebExtension': {
        value: FiorilliWebExtension
      }
    });
  } else {
    exports['default'] = FiorilliWebExtension;
    exports.__esModule = true;
    exports.FiorilliWebExtension = FiorilliWebExtension;
  }
}
