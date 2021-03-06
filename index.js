import _JSON$stringify from "@babel/runtime-corejs3/core-js-stable/json/stringify";
import _typeof from "@babel/runtime-corejs3/helpers/typeof";
import _concatInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/concat";
import _toConsumableArray from "@babel/runtime-corejs3/helpers/toConsumableArray";
import _classCallCheck from "@babel/runtime-corejs3/helpers/classCallCheck";
import _createClass from "@babel/runtime-corejs3/helpers/createClass";
import _assertThisInitialized from "@babel/runtime-corejs3/helpers/assertThisInitialized";
import _inherits from "@babel/runtime-corejs3/helpers/inherits";
import _createSuper from "@babel/runtime-corejs3/helpers/createSuper";
import _defineProperty from "@babel/runtime-corejs3/helpers/defineProperty";
import React from "react";
import PropTypes from "prop-types";
import swaggerUIConstructor, { presets } from "./swagger-ui";

var SwaggerUI = /*#__PURE__*/function (_React$Component) {
  _inherits(SwaggerUI, _React$Component);

  var _super = _createSuper(SwaggerUI);

  function SwaggerUI(props) {
    var _this;

    _classCallCheck(this, SwaggerUI);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "requestInterceptor", function (req) {
      if (typeof _this.props.requestInterceptor === "function") {
        return _this.props.requestInterceptor(req);
      }

      return req;
    });

    _defineProperty(_assertThisInitialized(_this), "responseInterceptor", function (res) {
      if (typeof _this.props.responseInterceptor === "function") {
        return _this.props.responseInterceptor(res);
      }

      return res;
    });

    _defineProperty(_assertThisInitialized(_this), "onComplete", function () {
      if (typeof _this.props.onComplete === "function") {
        return _this.props.onComplete(_this.system);
      }
    });

    _this.SwaggerUIComponent = null;
    _this.system = null;
    return _this;
  }

  _createClass(SwaggerUI, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _context;

      var ui = swaggerUIConstructor({
        plugins: this.props.plugins,
        spec: this.props.spec,
        url: this.props.url,
        defaultModelsExpandDepth: this.props.defaultModelsExpandDepth,
        presets: _concatInstanceProperty(_context = [presets.apis]).call(_context, _toConsumableArray(this.props.presets)),
        requestInterceptor: this.requestInterceptor,
        responseInterceptor: this.responseInterceptor,
        onComplete: this.onComplete,
        docExpansion: this.props.docExpansion,
        supportedSubmitMethods: this.props.supportedSubmitMethods,
        defaultModelExpandDepth: this.props.defaultModelExpandDepth,
        displayOperationId: this.props.displayOperationId,
        showMutatedRequest: typeof this.props.showMutatedRequest === "boolean" ? this.props.showMutatedRequest : true,
        deepLinking: typeof this.props.deepLinking === "boolean" ? this.props.deepLinking : false
      });
      this.system = ui;
      this.SwaggerUIComponent = ui.getComponent("App", "root");
      this.forceUpdate();
    }
  }, {
    key: "render",
    value: function render() {
      return this.SwaggerUIComponent ? /*#__PURE__*/React.createElement(this.SwaggerUIComponent, null) : null;
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (this.props.url !== prevProps.url) {
        // flush current content
        this.system.specActions.updateSpec("");

        if (this.props.url) {
          // update the internal URL
          this.system.specActions.updateUrl(this.props.url); // trigger remote definition fetch

          this.system.specActions.download(this.props.url);
        }
      }

      if (this.props.spec !== prevProps.spec && this.props.spec) {
        if (_typeof(this.props.spec) === "object") {
          this.system.specActions.updateSpec(_JSON$stringify(this.props.spec));
        } else {
          this.system.specActions.updateSpec(this.props.spec);
        }
      }
    }
  }]);

  return SwaggerUI;
}(React.Component);

export { SwaggerUI as default };
SwaggerUI.propTypes = {
  spec: PropTypes.oneOf([PropTypes.string, PropTypes.object]),
  url: PropTypes.string,
  requestInterceptor: PropTypes.func,
  responseInterceptor: PropTypes.func,
  onComplete: PropTypes.func,
  docExpansion: PropTypes.oneOf(['list', 'full', 'none']),
  supportedSubmitMethods: PropTypes.arrayOf(PropTypes.oneOf(['get', 'put', 'post', 'delete', 'options', 'head', 'patch', 'trace'])),
  plugins: PropTypes.arrayOf(PropTypes.object),
  displayOperationId: PropTypes.bool,
  showMutatedRequest: PropTypes.bool,
  defaultModelExpandDepth: PropTypes.number,
  presets: PropTypes.arrayOf(PropTypes.func),
  deepLinking: PropTypes.bool
};
SwaggerUI.defaultProps = {
  supportedSubmitMethods: ['get', 'put', 'post', 'delete', 'options', 'head', 'patch', 'trace'],
  docExpansion: "list",
  defaultModelsExpandDepth: 1,
  presets: [],
  deepLinking: false
};

