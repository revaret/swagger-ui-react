"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _swaggerUi = _interopRequireWildcard(require("./swagger-ui"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class SwaggerUI extends _react.default.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "requestInterceptor", req => {
      if (typeof this.props.requestInterceptor === "function") {
        return this.props.requestInterceptor(req);
      }

      return req;
    });

    _defineProperty(this, "responseInterceptor", res => {
      if (typeof this.props.responseInterceptor === "function") {
        return this.props.responseInterceptor(res);
      }

      return res;
    });

    _defineProperty(this, "onComplete", () => {
      if (typeof this.props.onComplete === "function") {
        return this.props.onComplete(this.system);
      }
    });

    this.SwaggerUIComponent = null;
    this.system = null;
  }

  componentDidMount() {
    const ui = (0, _swaggerUi.default)({
      plugins: this.props.plugins,
      spec: this.props.spec,
      url: this.props.url,
      defaultModelsExpandDepth: this.props.defaultModelsExpandDepth,
      presets: [_swaggerUi.presets.apis, ...this.props.presets],
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

  render() {
    return this.SwaggerUIComponent ? /*#__PURE__*/_react.default.createElement(this.SwaggerUIComponent, null) : null;
  }

  componentDidUpdate(prevProps) {
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
      if (typeof this.props.spec === "object") {
        this.system.specActions.updateSpec(JSON.stringify(this.props.spec));
      } else {
        this.system.specActions.updateSpec(this.props.spec);
      }
    }
  }

}

exports.default = SwaggerUI;
SwaggerUI.propTypes = {
  spec: _propTypes.default.oneOf([_propTypes.default.string, _propTypes.default.object]),
  url: _propTypes.default.string,
  requestInterceptor: _propTypes.default.func,
  responseInterceptor: _propTypes.default.func,
  onComplete: _propTypes.default.func,
  docExpansion: _propTypes.default.oneOf(['list', 'full', 'none']),
  supportedSubmitMethods: _propTypes.default.arrayOf(_propTypes.default.oneOf(['get', 'put', 'post', 'delete', 'options', 'head', 'patch', 'trace'])),
  plugins: _propTypes.default.arrayOf(_propTypes.default.object),
  displayOperationId: _propTypes.default.bool,
  showMutatedRequest: _propTypes.default.bool,
  defaultModelExpandDepth: _propTypes.default.number,
  presets: _propTypes.default.arrayOf(_propTypes.default.func),
  deepLinking: _propTypes.default.bool
};
SwaggerUI.defaultProps = {
  supportedSubmitMethods: ['get', 'put', 'post', 'delete', 'options', 'head', 'patch', 'trace'],
  docExpansion: "list",
  defaultModelsExpandDepth: 1,
  presets: [],
  deepLinking: false
};

