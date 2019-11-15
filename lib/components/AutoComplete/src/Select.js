"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _reactLifecyclesCompat = require("react-lifecycles-compat");

var _KeyCode = _interopRequireDefault(require("../../../utils/KeyCode.js"));

var _classnames2 = _interopRequireDefault(require("classnames"));

var _rcAnimate = _interopRequireDefault(require("rc-animate"));

var _componentClasses = _interopRequireDefault(require("component-classes"));

var _index = require("../../Menu/src/index.js");

var _warning = _interopRequireDefault(require("warning"));

var _Option = _interopRequireDefault(require("./Option"));

var _index2 = _interopRequireDefault(require("../../Icon/index.js"));

var _util = require("./util");

var _SelectTrigger = _interopRequireDefault(require("./SelectTrigger"));

var _PropTypes = require("./PropTypes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function noop() {}

function chaining() {
  for (var _len = arguments.length, fns = new Array(_len), _key = 0; _key < _len; _key++) {
    fns[_key] = arguments[_key];
  }

  return function () {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    // eslint-disable-line
    // eslint-disable-line
    for (var i = 0; i < fns.length; i++) {
      if (fns[i] && typeof fns[i] === 'function') {
        fns[i].apply(this, args);
      }
    }
  };
}

var Select =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Select, _React$Component);

  function Select(_props) {
    var _this;

    _classCallCheck(this, Select);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Select).call(this, _props));

    _defineProperty(_assertThisInitialized(_this), "onInputChange", function (event) {
      var tokenSeparators = _this.props.tokenSeparators;
      var val = event.target.value;

      if ((0, _util.isMultipleOrTags)(_this.props) && tokenSeparators.length && (0, _util.includesSeparators)(val, tokenSeparators)) {
        var nextValue = _this.getValueByInput(val);

        if (nextValue !== undefined) {
          _this.fireChange(nextValue);
        }

        _this.setOpenState(false, true);

        _this.setInputValue('', false);

        return;
      }

      _this.setInputValue(val);

      _this.setState({
        open: true
      });

      if ((0, _util.isCombobox)(_this.props)) {
        _this.fireChange([val]);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onDropdownVisibleChange", function (open) {
      if (open && !_this._focused) {
        _this.clearBlurTime();

        _this.timeoutFocus();

        _this._focused = true;

        _this.updateFocusClassName();
      }

      _this.setOpenState(open);
    });

    _defineProperty(_assertThisInitialized(_this), "onKeyDown", function (event) {
      var props = _this.props;

      if (props.disabled) {
        return;
      }

      var keyCode = event.keyCode;

      if (_this.state.open && !_this.getInputDOMNode()) {
        _this.onInputKeyDown(event);
      } else if (keyCode === _KeyCode["default"].ENTER || keyCode === _KeyCode["default"].DOWN) {
        _this.setOpenState(true);

        event.preventDefault();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onInputKeyDown", function (event) {
      var props = _this.props;

      if (props.disabled) {
        return;
      }

      var state = _this.state;
      var keyCode = event.keyCode;

      if ((0, _util.isMultipleOrTags)(props) && !event.target.value && keyCode === _KeyCode["default"].BACKSPACE) {
        event.preventDefault();
        var value = state.value;

        if (value.length) {
          _this.removeSelected(value[value.length - 1]);
        }

        return;
      }

      if (keyCode === _KeyCode["default"].DOWN) {
        if (!state.open) {
          _this.openIfHasChildren();

          event.preventDefault();
          event.stopPropagation();
          return;
        }
      } else if (keyCode === _KeyCode["default"].ENTER && state.open) {
        // Aviod trigger form submit when select item
        // https://github.com/ant-design/ant-design/issues/10861
        event.preventDefault();
      } else if (keyCode === _KeyCode["default"].ESC) {
        if (state.open) {
          _this.setOpenState(false);

          event.preventDefault();
          event.stopPropagation();
        }

        return;
      }

      if (state.open) {
        var menu = _this.selectTriggerRef.getInnerMenu();

        if (menu && menu.onKeyDown(event, _this.handleBackfill)) {
          event.preventDefault();
          event.stopPropagation();
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onMenuSelect", function (_ref) {
      var item = _ref.item;

      if (!item) {
        return;
      }

      var value = _this.state.value;
      var props = _this.props;
      var selectedValue = (0, _util.getValuePropValue)(item);
      var lastValue = value[value.length - 1];

      _this.fireSelect(selectedValue);

      if ((0, _util.isMultipleOrTags)(props)) {
        if ((0, _util.findIndexInValueBySingleValue)(value, selectedValue) !== -1) {
          return;
        }

        value = value.concat([selectedValue]);
      } else {
        if (lastValue && lastValue === selectedValue && selectedValue !== _this.state.backfillValue) {
          _this.setOpenState(false, true);

          return;
        }

        value = [selectedValue];

        _this.setOpenState(false, true);
      }

      _this.fireChange(value);

      var inputValue;

      if ((0, _util.isCombobox)(props)) {
        inputValue = (0, _util.getPropValue)(item, props.optionLabelProp);
      } else {
        inputValue = '';
      }

      if (props.autoClearSearchValue) {
        _this.setInputValue(inputValue, false);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onMenuDeselect", function (_ref2) {
      var item = _ref2.item,
          domEvent = _ref2.domEvent;

      if (domEvent.type === 'click') {
        _this.removeSelected((0, _util.getValuePropValue)(item));
      }

      var _assertThisInitialize = _assertThisInitialized(_this),
          props = _assertThisInitialize.props;

      if (props.autoClearSearchValue) {
        _this.setInputValue('', false);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onArrowClick", function (e) {
      e.stopPropagation();
      e.preventDefault();

      if (!_this.props.disabled) {
        _this.setOpenState(!_this.state.open, !_this.state.open);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onPlaceholderClick", function () {
      if (_this.getInputDOMNode()) {
        _this.getInputDOMNode().focus();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onOuterFocus", function (e) {
      if (_this.props.disabled) {
        e.preventDefault();
        return;
      }

      _this.clearBlurTime();

      if (!(0, _util.isMultipleOrTagsOrCombobox)(_this.props) && e.target === _this.getInputDOMNode()) {
        return;
      }

      if (_this._focused) {
        return;
      }

      _this._focused = true;

      _this.updateFocusClassName();

      _this.timeoutFocus();
    });

    _defineProperty(_assertThisInitialized(_this), "onPopupFocus", function () {
      // fix ie scrollbar, focus element again
      _this.maybeFocus(true, true);
    });

    _defineProperty(_assertThisInitialized(_this), "onOuterBlur", function (e) {
      if (_this.props.disabled) {
        e.preventDefault();
        return;
      }

      _this.blurTimer = setTimeout(function () {
        _this._focused = false;

        _this.updateFocusClassName();

        var props = _this.props;
        var value = _this.state.value;
        var inputValue = _this.state.inputValue;

        if ((0, _util.isSingleMode)(props) && props.showSearch && inputValue && props.defaultActiveFirstOption) {
          var options = _this._options || [];

          if (options.length) {
            var firstOption = (0, _util.findFirstMenuItem)(options);

            if (firstOption) {
              value = [(0, _util.getValuePropValue)(firstOption)];

              _this.fireChange(value);
            }
          }
        } else if ((0, _util.isMultipleOrTags)(props) && inputValue) {
          _this.state.inputValue = _this.getInputDOMNode().value = ''; // eslint-disable-line react/no-direct-mutation-state

          value = _this.getValueByInput(inputValue);

          if (value !== undefined) {
            _this.fireChange(value);
          }
        }

        props.onBlur(_this.getVLForOnChange(value));

        _this.setOpenState(false);
      }, 10);
    });

    _defineProperty(_assertThisInitialized(_this), "onClearSelection", function (event) {
      var props = _this.props;
      var state = _this.state;

      if (props.disabled) {
        return;
      }

      var inputValue = state.inputValue,
          value = state.value;
      event.stopPropagation();

      if (inputValue || value.length) {
        if (value.length) {
          _this.fireChange([]);
        }

        _this.setOpenState(false, true);

        if (inputValue) {
          _this.setInputValue('');
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onChoiceAnimationLeave", function () {
      _this.forcePopupAlign();
    });

    _defineProperty(_assertThisInitialized(_this), "getOptionInfoBySingleValue", function (value, optionsInfo) {
      var info;
      optionsInfo = optionsInfo || _this.state.optionsInfo;

      if (optionsInfo[(0, _util.getMapKey)(value)]) {
        info = optionsInfo[(0, _util.getMapKey)(value)];
      }

      if (info) {
        return info;
      }

      var defaultLabel = value;

      if (_this.props.labelInValue) {
        var label = (0, _util.getLabelFromPropsValue)(_this.props.value, value);

        if (label !== undefined) {
          defaultLabel = label;
        }
      }

      var defaultInfo = {
        option: _react["default"].createElement(_Option["default"], {
          value: value,
          key: value
        }, value),
        value: value,
        label: defaultLabel
      };
      return defaultInfo;
    });

    _defineProperty(_assertThisInitialized(_this), "getOptionBySingleValue", function (value) {
      var _this$getOptionInfoBy = _this.getOptionInfoBySingleValue(value),
          option = _this$getOptionInfoBy.option;

      return option;
    });

    _defineProperty(_assertThisInitialized(_this), "getOptionsBySingleValue", function (values) {
      return values.map(function (value) {
        return _this.getOptionBySingleValue(value);
      });
    });

    _defineProperty(_assertThisInitialized(_this), "getValueByLabel", function (label) {
      if (label === undefined) {
        return null;
      }

      var value = null;
      Object.keys(_this.state.optionsInfo).forEach(function (key) {
        var info = _this.state.optionsInfo[key];

        if ((0, _util.toArray)(info.label).join('') === label) {
          value = info.value;
        }
      });
      return value;
    });

    _defineProperty(_assertThisInitialized(_this), "getVLBySingleValue", function (value) {
      if (_this.props.labelInValue) {
        return {
          key: value,
          label: _this.getLabelBySingleValue(value)
        };
      }

      return value;
    });

    _defineProperty(_assertThisInitialized(_this), "getVLForOnChange", function (vls_) {
      var vls = vls_;

      if (vls !== undefined) {
        if (!_this.props.labelInValue) {
          vls = vls.map(function (v) {
            return v;
          });
        } else {
          vls = vls.map(function (vl) {
            return {
              key: vl,
              label: _this.getLabelBySingleValue(vl)
            };
          });
        }

        return (0, _util.isMultipleOrTags)(_this.props) ? vls : vls[0];
      }

      return vls;
    });

    _defineProperty(_assertThisInitialized(_this), "getLabelBySingleValue", function (value, optionsInfo) {
      var _this$getOptionInfoBy2 = _this.getOptionInfoBySingleValue(value, optionsInfo),
          label = _this$getOptionInfoBy2.label;

      return label;
    });

    _defineProperty(_assertThisInitialized(_this), "getDropdownContainer", function () {
      if (!_this.dropdownContainer) {
        _this.dropdownContainer = document.createElement('div');
        document.body.appendChild(_this.dropdownContainer);
      }

      return _this.dropdownContainer;
    });

    _defineProperty(_assertThisInitialized(_this), "getPlaceholderElement", function () {
      var _assertThisInitialize2 = _assertThisInitialized(_this),
          props = _assertThisInitialize2.props,
          state = _assertThisInitialize2.state;

      var hidden = false;

      if (state.inputValue) {
        hidden = true;
      }

      if (state.value.length) {
        hidden = true;
      }

      if ((0, _util.isCombobox)(props) && state.value.length === 1 && !state.value[0]) {
        hidden = false;
      }

      var placeholder = props.placeholder;

      if (placeholder) {
        return _react["default"].createElement("div", _extends({
          onMouseDown: _util.preventDefaultEvent,
          style: _objectSpread({
            display: hidden ? 'none' : 'block'
          }, _util.UNSELECTABLE_STYLE)
        }, _util.UNSELECTABLE_ATTRIBUTE, {
          onClick: _this.onPlaceholderClick,
          className: "".concat(props.prefixCls, "-selection__placeholder")
        }), placeholder);
      }

      return null;
    });

    _defineProperty(_assertThisInitialized(_this), "getInputElement", function () {
      var props = _this.props;
      var inputElement = props.getInputElement ? props.getInputElement() : _react["default"].createElement("input", {
        id: props.id,
        autoComplete: "off"
      });
      var inputCls = (0, _classnames2["default"])(inputElement.props.className, _defineProperty({}, "".concat(props.prefixCls, "-search__field"), true)); // https://github.com/ant-design/ant-design/issues/4992#issuecomment-281542159
      // Add space to the end of the inputValue as the width measurement tolerance

      return _react["default"].createElement("div", {
        className: "".concat(props.prefixCls, "-search__field__wrap")
      }, _react["default"].cloneElement(inputElement, {
        ref: _this.saveInputRef,
        onChange: _this.onInputChange,
        onKeyDown: chaining(_this.onInputKeyDown, inputElement.props.onKeyDown, _this.props.onInputKeyDown),
        value: _this.state.inputValue,
        disabled: props.disabled,
        className: inputCls
      }), _react["default"].createElement("span", {
        ref: _this.saveInputMirrorRef,
        className: "".concat(props.prefixCls, "-search__field__mirror")
      }, _this.state.inputValue, "\xA0"));
    });

    _defineProperty(_assertThisInitialized(_this), "getInputDOMNode", function () {
      return _this.topCtrlRef ? _this.topCtrlRef.querySelector('input,textarea,div[contentEditable]') : _this.inputRef;
    });

    _defineProperty(_assertThisInitialized(_this), "getInputMirrorDOMNode", function () {
      return _this.inputMirrorRef;
    });

    _defineProperty(_assertThisInitialized(_this), "getPopupDOMNode", function () {
      return _this.selectTriggerRef.getPopupDOMNode();
    });

    _defineProperty(_assertThisInitialized(_this), "getPopupMenuComponent", function () {
      return _this.selectTriggerRef.getInnerMenu();
    });

    _defineProperty(_assertThisInitialized(_this), "setOpenState", function (open, needFocus) {
      var _assertThisInitialize3 = _assertThisInitialized(_this),
          props = _assertThisInitialize3.props,
          state = _assertThisInitialize3.state;

      if (state.open === open) {
        _this.maybeFocus(open, needFocus);

        return;
      }

      var nextState = {
        open: open,
        backfillValue: undefined
      }; // clear search input value when open is false in singleMode.

      if (!open && (0, _util.isSingleMode)(props) && props.showSearch) {
        _this.setInputValue('', false);
      }

      if (!open) {
        _this.maybeFocus(open, needFocus);
      }

      _this.setState(nextState, function () {
        if (open) {
          _this.maybeFocus(open, needFocus);
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "setInputValue", function (inputValue) {
      var fireSearch = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      if (inputValue !== _this.state.inputValue) {
        _this.setState({
          inputValue: inputValue
        }, _this.forcePopupAlign);

        if (fireSearch) {
          _this.props.onSearch(inputValue);
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "getValueByInput", function (string) {
      var _this$props = _this.props,
          multiple = _this$props.multiple,
          tokenSeparators = _this$props.tokenSeparators;
      var nextValue = _this.state.value;
      var hasNewValue = false;
      (0, _util.splitBySeparators)(string, tokenSeparators).forEach(function (label) {
        var selectedValue = [label];

        if (multiple) {
          var value = _this.getValueByLabel(label);

          if (value && (0, _util.findIndexInValueBySingleValue)(nextValue, value) === -1) {
            nextValue = nextValue.concat(value);
            hasNewValue = true;

            _this.fireSelect(value);
          }
        } else {
          // tag
          if ((0, _util.findIndexInValueBySingleValue)(nextValue, label) === -1) {
            nextValue = nextValue.concat(selectedValue);
            hasNewValue = true;

            _this.fireSelect(label);
          }
        }
      });
      return hasNewValue ? nextValue : undefined;
    });

    _defineProperty(_assertThisInitialized(_this), "getRealOpenState", function () {
      var open = _this.state.open;
      var options = _this._options || [];

      if ((0, _util.isMultipleOrTagsOrCombobox)(_this.props) || !_this.props.showSearch) {
        if (open && !options.length) {
          open = false;
        }
      }

      return open;
    });

    _defineProperty(_assertThisInitialized(_this), "handleBackfill", function (item) {
      if (!_this.props.backfill || !((0, _util.isSingleMode)(_this.props) || (0, _util.isCombobox)(_this.props))) {
        return;
      }

      var key = (0, _util.getValuePropValue)(item);

      if ((0, _util.isCombobox)(_this.props)) {
        _this.setInputValue(key, false);
      }

      _this.setState({
        value: [key],
        backfillValue: key
      });
    });

    _defineProperty(_assertThisInitialized(_this), "filterOption", function (input, child) {
      var defaultFilter = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _util.defaultFilterFn;
      var value = _this.state.value;
      var lastValue = value[value.length - 1];

      if (!input || lastValue && lastValue === _this.state.backfillValue) {
        return true;
      }

      var filterFn = _this.props.filterOption;

      if ('filterOption' in _this.props) {
        if (_this.props.filterOption === true) {
          filterFn = defaultFilter;
        }
      } else {
        filterFn = defaultFilter;
      }

      if (!filterFn) {
        return true;
      } else if (typeof filterFn === 'function') {
        return filterFn.call(_assertThisInitialized(_this), input, child);
      } else if (child.props.disabled) {
        return false;
      }

      return true;
    });

    _defineProperty(_assertThisInitialized(_this), "timeoutFocus", function () {
      if (_this.focusTimer) {
        _this.clearFocusTime();
      }

      _this.focusTimer = setTimeout(function () {
        _this.props.onFocus();
      }, 10);
    });

    _defineProperty(_assertThisInitialized(_this), "clearFocusTime", function () {
      if (_this.focusTimer) {
        clearTimeout(_this.focusTimer);
        _this.focusTimer = null;
      }
    });

    _defineProperty(_assertThisInitialized(_this), "clearBlurTime", function () {
      if (_this.blurTimer) {
        clearTimeout(_this.blurTimer);
        _this.blurTimer = null;
      }
    });

    _defineProperty(_assertThisInitialized(_this), "updateFocusClassName", function () {
      var _assertThisInitialize4 = _assertThisInitialized(_this),
          rootRef = _assertThisInitialize4.rootRef,
          props = _assertThisInitialize4.props; // avoid setState and its side effect


      if (_this._focused) {
        (0, _componentClasses["default"])(rootRef).add("".concat(props.prefixCls, "-focused"));
      } else {
        (0, _componentClasses["default"])(rootRef).remove("".concat(props.prefixCls, "-focused"));
      }
    });

    _defineProperty(_assertThisInitialized(_this), "maybeFocus", function (open, needFocus) {
      if (needFocus || open) {
        var input = _this.getInputDOMNode();

        var _document = document,
            activeElement = _document.activeElement;

        if (input && (open || (0, _util.isMultipleOrTagsOrCombobox)(_this.props))) {
          if (activeElement !== input) {
            input.focus();
            _this._focused = true;
          }
        } else {
          if (activeElement !== _this.selectionRef) {
            _this.selectionRef.focus();

            _this._focused = true;
          }
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "removeSelected", function (selectedKey, e) {
      var props = _this.props;

      if (props.disabled || _this.isChildDisabled(selectedKey)) {
        return;
      } // Do not trigger Trigger popup


      if (e && e.stopPropagation) {
        e.stopPropagation();
      }

      var value = _this.state.value.filter(function (singleValue) {
        return singleValue !== selectedKey;
      });

      var canMultiple = (0, _util.isMultipleOrTags)(props);

      if (canMultiple) {
        var event = selectedKey;

        if (props.labelInValue) {
          event = {
            key: selectedKey,
            label: _this.getLabelBySingleValue(selectedKey)
          };
        }

        props.onDeselect(event, _this.getOptionBySingleValue(selectedKey));
      }

      _this.fireChange(value);
    });

    _defineProperty(_assertThisInitialized(_this), "openIfHasChildren", function () {
      var props = _this.props;

      if (_react["default"].Children.count(props.children) || (0, _util.isSingleMode)(props)) {
        _this.setOpenState(true);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "fireSelect", function (value) {
      _this.props.onSelect(_this.getVLBySingleValue(value), _this.getOptionBySingleValue(value));
    });

    _defineProperty(_assertThisInitialized(_this), "fireChange", function (value) {
      var props = _this.props;

      if (!('value' in props)) {
        _this.setState({
          value: value
        }, _this.forcePopupAlign);
      }

      var vls = _this.getVLForOnChange(value);

      var options = _this.getOptionsBySingleValue(value);

      props.onChange(vls, (0, _util.isMultipleOrTags)(_this.props) ? options : options[0]);
    });

    _defineProperty(_assertThisInitialized(_this), "isChildDisabled", function (key) {
      return (0, _util.childrenToArray)(_this.props.children).some(function (child) {
        var childValue = (0, _util.getValuePropValue)(child);
        return childValue === key && child.props && child.props.disabled;
      });
    });

    _defineProperty(_assertThisInitialized(_this), "forcePopupAlign", function () {
      _this.selectTriggerRef.triggerRef.forcePopupAlign();
    });

    _defineProperty(_assertThisInitialized(_this), "renderFilterOptions", function () {
      var inputValue = _this.state.inputValue;
      var _this$props2 = _this.props,
          children = _this$props2.children,
          tags = _this$props2.tags,
          filterOption = _this$props2.filterOption,
          notFoundContent = _this$props2.notFoundContent;
      var menuItems = [];
      var childrenKeys = [];

      var options = _this.renderFilterOptionsFromChildren(children, childrenKeys, menuItems);

      if (tags) {
        // tags value must be string
        var value = _this.state.value;
        value = value.filter(function (singleValue) {
          return childrenKeys.indexOf(singleValue) === -1 && (!inputValue || String(singleValue).indexOf(String(inputValue)) > -1);
        });
        value.forEach(function (singleValue) {
          var key = singleValue;

          var menuItem = _react["default"].createElement(_index.Item, {
            style: _util.UNSELECTABLE_STYLE,
            role: "option",
            attribute: _util.UNSELECTABLE_ATTRIBUTE,
            value: key,
            key: key
          }, key);

          options.push(menuItem);
          menuItems.push(menuItem);
        });

        if (inputValue) {
          var notFindInputItem = menuItems.every(function (option) {
            // this.filterOption return true has two meaning,
            // 1, some one exists after filtering
            // 2, filterOption is set to false
            // condition 2 does not mean the option has same value with inputValue
            var filterFn = function filterFn() {
              return (0, _util.getValuePropValue)(option) === inputValue;
            };

            if (filterOption !== false) {
              return !_this.filterOption.call(_assertThisInitialized(_this), inputValue, option, filterFn);
            }

            return !filterFn();
          });

          if (notFindInputItem) {
            options.unshift(_react["default"].createElement(_index.Item, {
              style: _util.UNSELECTABLE_STYLE,
              role: "option",
              attribute: _util.UNSELECTABLE_ATTRIBUTE,
              value: inputValue,
              key: inputValue
            }, inputValue));
          }
        }
      }

      if (!options.length && notFoundContent) {
        options = [_react["default"].createElement(_index.Item, {
          style: _util.UNSELECTABLE_STYLE,
          attribute: _util.UNSELECTABLE_ATTRIBUTE,
          disabled: true,
          role: "option",
          value: "NOT_FOUND",
          key: "NOT_FOUND"
        }, notFoundContent)];
      }

      return options;
    });

    _defineProperty(_assertThisInitialized(_this), "renderFilterOptionsFromChildren", function (children, childrenKeys, menuItems) {
      var sel = [];
      var props = _this.props;
      var inputValue = _this.state.inputValue;
      var tags = props.tags;

      _react["default"].Children.forEach(children, function (child) {
        if (!child) {
          return;
        }

        if (child.type.isSelectOptGroup) {
          var innerItems = _this.renderFilterOptionsFromChildren(child.props.children, childrenKeys, menuItems);

          if (innerItems.length) {
            var label = child.props.label;
            var key = child.key;

            if (!key && typeof label === 'string') {
              key = label;
            } else if (!label && key) {
              label = key;
            }

            sel.push(_react["default"].createElement(_index.ItemGroup, {
              key: key,
              title: label
            }, innerItems));
          }

          return;
        }

        (0, _warning["default"])(child.type.isSelectOption, 'the children of `Select` should be `Select.Option` or `Select.OptGroup`, ' + "instead of `".concat(child.type.name || child.type.displayName || child.type, "`."));
        var childValue = (0, _util.getValuePropValue)(child);
        (0, _util.validateOptionValue)(childValue, _this.props);

        if (_this.filterOption(inputValue, child)) {
          var menuItem = _react["default"].createElement(_index.Item, _extends({
            style: _util.UNSELECTABLE_STYLE,
            attribute: _util.UNSELECTABLE_ATTRIBUTE,
            value: childValue,
            key: childValue,
            role: "option"
          }, child.props));

          sel.push(menuItem);
          menuItems.push(menuItem);
        }

        if (tags) {
          childrenKeys.push(childValue);
        }
      });

      return sel;
    });

    _defineProperty(_assertThisInitialized(_this), "renderTopControlNode", function () {
      var _this$state = _this.state,
          value = _this$state.value,
          open = _this$state.open,
          inputValue = _this$state.inputValue;
      var props = _this.props;
      var choiceTransitionName = props.choiceTransitionName,
          prefixCls = props.prefixCls,
          maxTagTextLength = props.maxTagTextLength,
          maxTagCount = props.maxTagCount,
          maxTagPlaceholder = props.maxTagPlaceholder,
          showSearch = props.showSearch,
          removeIcon = props.removeIcon;
      var className = "".concat(prefixCls, "-selection__rendered"); // search input is inside topControlNode in single, multiple & combobox. 2016/04/13

      var innerNode = null;

      if ((0, _util.isSingleMode)(props)) {
        var selectedValue = null;

        if (value.length) {
          var showSelectedValue = false;
          var opacity = 1;

          if (!showSearch) {
            showSelectedValue = true;
          } else {
            if (open) {
              showSelectedValue = !inputValue;

              if (showSelectedValue) {
                opacity = 0.4;
              }
            } else {
              showSelectedValue = true;
            }
          }

          var singleValue = value[0];

          var _this$getOptionInfoBy3 = _this.getOptionInfoBySingleValue(singleValue),
              label = _this$getOptionInfoBy3.label,
              title = _this$getOptionInfoBy3.title;

          selectedValue = _react["default"].createElement("div", {
            key: "value",
            className: "".concat(prefixCls, "-selection-selected-value"),
            title: (0, _util.toTitle)(title || label),
            style: {
              display: showSelectedValue ? 'block' : 'none',
              opacity: opacity
            }
          }, label);
        }

        if (!showSearch) {
          innerNode = [selectedValue];
        } else {
          innerNode = [selectedValue, _react["default"].createElement("div", {
            className: "".concat(prefixCls, "-search ").concat(prefixCls, "-search--inline"),
            key: "input",
            style: {
              display: open ? 'block' : 'none'
            }
          }, _this.getInputElement())];
        }
      } else {
        var selectedValueNodes = [];
        var limitedCountValue = value;
        var maxTagPlaceholderEl;

        if (maxTagCount !== undefined && value.length > maxTagCount) {
          limitedCountValue = limitedCountValue.slice(0, maxTagCount);

          var omittedValues = _this.getVLForOnChange(value.slice(maxTagCount, value.length));

          var content = "+ ".concat(value.length - maxTagCount, " ...");

          if (maxTagPlaceholder) {
            content = typeof maxTagPlaceholder === 'function' ? maxTagPlaceholder(omittedValues) : maxTagPlaceholder;
          }

          maxTagPlaceholderEl = _react["default"].createElement("li", _extends({
            style: _util.UNSELECTABLE_STYLE
          }, _util.UNSELECTABLE_ATTRIBUTE, {
            onMouseDown: _util.preventDefaultEvent,
            className: "".concat(prefixCls, "-selection__choice ").concat(prefixCls, "-selection__choice__disabled"),
            key: 'maxTagPlaceholder',
            title: (0, _util.toTitle)(content)
          }), _react["default"].createElement("div", {
            className: "".concat(prefixCls, "-selection__choice__content")
          }, content));
        }

        if ((0, _util.isMultipleOrTags)(props)) {
          selectedValueNodes = limitedCountValue.map(function (singleValue) {
            var info = _this.getOptionInfoBySingleValue(singleValue);

            var content = info.label;
            var title = info.title || content;

            if (maxTagTextLength && typeof content === 'string' && content.length > maxTagTextLength) {
              content = "".concat(content.slice(0, maxTagTextLength), "...");
            }

            var disabled = _this.isChildDisabled(singleValue);

            var choiceClassName = disabled ? "".concat(prefixCls, "-selection__choice ").concat(prefixCls, "-selection__choice__disabled") : "".concat(prefixCls, "-selection__choice");
            return _react["default"].createElement("li", _extends({
              style: _util.UNSELECTABLE_STYLE
            }, _util.UNSELECTABLE_ATTRIBUTE, {
              onMouseDown: _util.preventDefaultEvent,
              className: choiceClassName,
              key: singleValue,
              title: (0, _util.toTitle)(title)
            }), _react["default"].createElement("div", {
              className: "".concat(prefixCls, "-selection__choice__content")
            }, content), disabled ? null : _react["default"].createElement("span", {
              onClick: function onClick(event) {
                _this.removeSelected(singleValue, event);
              },
              className: "".concat(prefixCls, "-selection__choice__remove")
            }, removeIcon || _react["default"].createElement("i", {
              className: "".concat(prefixCls, "-selection__choice__remove-icon")
            }, "\xD7")));
          });
        }

        if (maxTagPlaceholderEl) {
          selectedValueNodes.push(maxTagPlaceholderEl);
        }

        selectedValueNodes.push(_react["default"].createElement("li", {
          className: "".concat(prefixCls, "-search ").concat(prefixCls, "-search--inline"),
          key: "__input"
        }, _this.getInputElement()));

        if ((0, _util.isMultipleOrTags)(props) && choiceTransitionName) {
          innerNode = _react["default"].createElement(_rcAnimate["default"], {
            onLeave: _this.onChoiceAnimationLeave,
            component: "ul",
            transitionName: choiceTransitionName
          }, selectedValueNodes);
        } else {
          innerNode = _react["default"].createElement("ul", null, selectedValueNodes);
        }
      }

      return _react["default"].createElement("div", {
        className: className,
        ref: _this.saveTopCtrlRef
      }, _this.getPlaceholderElement(), innerNode);
    });

    var _optionsInfo = Select.getOptionsInfoFromProps(_props);

    _this.state = {
      value: Select.getValueFromProps(_props, true),
      // true: use default value
      inputValue: _props.combobox ? Select.getInputValueForCombobox(_props, _optionsInfo, true // use default value
      ) : '',
      open: _props.defaultOpen,
      optionsInfo: _optionsInfo,
      // a flag for aviod redundant getOptionsInfoFromProps call
      skipBuildOptionsInfo: true
    };
    _this.saveInputRef = (0, _util.saveRef)(_assertThisInitialized(_this), 'inputRef');
    _this.saveInputMirrorRef = (0, _util.saveRef)(_assertThisInitialized(_this), 'inputMirrorRef');
    _this.saveTopCtrlRef = (0, _util.saveRef)(_assertThisInitialized(_this), 'topCtrlRef');
    _this.saveSelectTriggerRef = (0, _util.saveRef)(_assertThisInitialized(_this), 'selectTriggerRef');
    _this.saveRootRef = (0, _util.saveRef)(_assertThisInitialized(_this), 'rootRef');
    _this.saveSelectionRef = (0, _util.saveRef)(_assertThisInitialized(_this), 'selectionRef');
    return _this;
  }

  _createClass(Select, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.autoFocus) {
        this.focus();
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      if ((0, _util.isMultipleOrTags)(this.props)) {
        var inputNode = this.getInputDOMNode();
        var mirrorNode = this.getInputMirrorDOMNode();

        if (inputNode.value) {
          inputNode.style.width = '';
          inputNode.style.width = "".concat(mirrorNode.clientWidth, "px");
        } else {
          inputNode.style.width = '';
        }
      }

      this.forcePopupAlign();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.clearFocusTime();
      this.clearBlurTime();

      if (this.dropdownContainer) {
        _reactDom["default"].unmountComponentAtNode(this.dropdownContainer);

        document.body.removeChild(this.dropdownContainer);
        this.dropdownContainer = null;
      }
    }
  }, {
    key: "focus",
    value: function focus() {
      if ((0, _util.isSingleMode)(this.props)) {
        this.selectionRef.focus();
      } else {
        this.getInputDOMNode().focus();
      }
    }
  }, {
    key: "blur",
    value: function blur() {
      if ((0, _util.isSingleMode)(this.props)) {
        this.selectionRef.blur();
      } else {
        this.getInputDOMNode().blur();
      }
    }
  }, {
    key: "renderClear",
    value: function renderClear() {
      var _this$props3 = this.props,
          prefixCls = _this$props3.prefixCls,
          allowClear = _this$props3.allowClear,
          clearIcon = _this$props3.clearIcon;
      var _this$state2 = this.state,
          value = _this$state2.value,
          inputValue = _this$state2.inputValue;

      var clear = _react["default"].createElement(_index2["default"], _extends({
        type: "close-circle-fill",
        key: "clear",
        className: "".concat(prefixCls, "-selection__clear"),
        onMouseDown: _util.preventDefaultEvent,
        style: _util.UNSELECTABLE_STYLE
      }, _util.UNSELECTABLE_ATTRIBUTE, {
        onClick: this.onClearSelection
      }));

      if (!allowClear) {
        return null;
      }

      if ((0, _util.isCombobox)(this.props)) {
        if (inputValue) {
          return clear;
        }

        return null;
      }

      if (inputValue || value.length) {
        return clear;
      }

      return null;
    }
  }, {
    key: "render",
    value: function render() {
      var _rootCls;

      var props = this.props;
      var multiple = (0, _util.isMultipleOrTags)(props);
      var state = this.state;
      var className = props.className,
          disabled = props.disabled,
          prefixCls = props.prefixCls,
          inputIcon = props.inputIcon;
      var ctrlNode = this.renderTopControlNode();
      var open = this.state.open;

      if (open) {
        this._options = this.renderFilterOptions();
      }

      var realOpen = this.getRealOpenState();
      var options = this._options || [];
      var dataOrAriaAttributeProps = {};

      for (var key in props) {
        if (props.hasOwnProperty(key) && (key.substr(0, 5) === 'data-' || key.substr(0, 5) === 'aria-' || key === 'role')) {
          dataOrAriaAttributeProps[key] = props[key];
        }
      }

      var extraSelectionProps = _objectSpread({}, dataOrAriaAttributeProps);

      if (!(0, _util.isMultipleOrTagsOrCombobox)(props)) {
        extraSelectionProps = _objectSpread({}, extraSelectionProps, {
          onKeyDown: this.onKeyDown,
          tabIndex: props.disabled ? -1 : 0
        });
      }

      var rootCls = (_rootCls = {}, _defineProperty(_rootCls, className, !!className), _defineProperty(_rootCls, prefixCls, 1), _defineProperty(_rootCls, "".concat(prefixCls, "-open"), open), _defineProperty(_rootCls, "".concat(prefixCls, "-focused"), open || !!this._focused), _defineProperty(_rootCls, "".concat(prefixCls, "-combobox"), (0, _util.isCombobox)(props)), _defineProperty(_rootCls, "".concat(prefixCls, "-disabled"), disabled), _defineProperty(_rootCls, "".concat(prefixCls, "-enabled"), !disabled), _defineProperty(_rootCls, "".concat(prefixCls, "-allow-clear"), !!props.allowClear), _defineProperty(_rootCls, "".concat(prefixCls, "-no-arrow"), !props.showArrow), _rootCls);
      return _react["default"].createElement(_SelectTrigger["default"], {
        onPopupFocus: this.onPopupFocus,
        onMouseEnter: this.props.onMouseEnter,
        onMouseLeave: this.props.onMouseLeave,
        dropdownAlign: props.dropdownAlign,
        dropdownClassName: props.dropdownClassName,
        dropdownMatchSelectWidth: props.dropdownMatchSelectWidth,
        defaultActiveFirstOption: props.defaultActiveFirstOption,
        dropdownMenuStyle: props.dropdownMenuStyle,
        transitionName: props.transitionName,
        animation: props.animation,
        prefixCls: props.prefixCls,
        dropdownStyle: props.dropdownStyle,
        combobox: props.combobox,
        showSearch: props.showSearch,
        options: options,
        multiple: multiple,
        disabled: disabled,
        visible: realOpen,
        inputValue: state.inputValue,
        value: state.value,
        backfillValue: state.backfillValue,
        firstActiveValue: props.firstActiveValue,
        onDropdownVisibleChange: this.onDropdownVisibleChange,
        getPopupContainer: props.getPopupContainer,
        onMenuSelect: this.onMenuSelect,
        onMenuDeselect: this.onMenuDeselect,
        onPopupScroll: props.onPopupScroll,
        showAction: props.showAction,
        ref: this.saveSelectTriggerRef
      }, _react["default"].createElement("div", {
        id: props.id,
        style: props.style,
        ref: this.saveRootRef,
        onBlur: this.onOuterBlur,
        onFocus: this.onOuterFocus,
        className: (0, _classnames2["default"])(rootCls)
      }, _react["default"].createElement("div", _extends({
        ref: this.saveSelectionRef,
        key: "selection",
        className: "".concat(prefixCls, "-selection\n            ").concat(prefixCls, "-selection--").concat(multiple ? 'multiple' : 'single'),
        role: "combobox",
        "aria-autocomplete": "list",
        "aria-haspopup": "true",
        "aria-expanded": realOpen
      }, extraSelectionProps), ctrlNode, this.renderClear(), multiple || !props.showArrow ? null : _react["default"].createElement("span", _extends({
        key: "arrow",
        className: "".concat(prefixCls, "-arrow"),
        style: _util.UNSELECTABLE_STYLE
      }, _util.UNSELECTABLE_ATTRIBUTE, {
        onClick: this.onArrowClick
      }), inputIcon || _react["default"].createElement("i", {
        className: "".concat(prefixCls, "-arrow-icon")
      })))));
    }
  }]);

  return Select;
}(_react["default"].Component);

_defineProperty(Select, "propTypes", _PropTypes.SelectPropTypes);

_defineProperty(Select, "defaultProps", {
  prefixCls: 'rc-select',
  defaultOpen: false,
  labelInValue: false,
  defaultActiveFirstOption: true,
  showSearch: true,
  allowClear: false,
  placeholder: '',
  onChange: noop,
  onFocus: noop,
  onBlur: noop,
  onSelect: noop,
  onSearch: noop,
  onDeselect: noop,
  onInputKeyDown: noop,
  showArrow: true,
  dropdownMatchSelectWidth: true,
  dropdownStyle: {},
  dropdownMenuStyle: {},
  optionFilterProp: 'value',
  optionLabelProp: 'value',
  notFoundContent: 'Not Found',
  backfill: false,
  showAction: ['click'],
  tokenSeparators: [],
  autoClearSearchValue: true
});

_defineProperty(Select, "getDerivedStateFromProps", function (nextProps, prevState) {
  var optionsInfo = prevState.skipBuildOptionsInfo ? prevState.optionsInfo : Select.getOptionsInfoFromProps(nextProps, prevState);
  var newState = {
    optionsInfo: optionsInfo,
    skipBuildOptionsInfo: false
  };

  if ('open' in nextProps) {
    newState.open = nextProps.open;
  }

  if ('value' in nextProps) {
    var value = Select.getValueFromProps(nextProps);
    newState.value = value;

    if (nextProps.combobox) {
      newState.inputValue = Select.getInputValueForCombobox(nextProps, optionsInfo);
    }
  }

  return newState;
});

_defineProperty(Select, "getOptionsFromChildren", function (children) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  _react["default"].Children.forEach(children, function (child) {
    if (!child) {
      return;
    }

    if (child.type.isSelectOptGroup) {
      Select.getOptionsFromChildren(child.props.children, options);
    } else {
      options.push(child);
    }
  });

  return options;
});

_defineProperty(Select, "getInputValueForCombobox", function (props, optionsInfo, useDefaultValue) {
  var value = [];

  if ('value' in props && !useDefaultValue) {
    value = (0, _util.toArray)(props.value);
  }

  if ('defaultValue' in props && useDefaultValue) {
    value = (0, _util.toArray)(props.defaultValue);
  }

  if (value.length) {
    value = value[0];
  } else {
    return '';
  }

  var label = value;

  if (props.labelInValue) {
    label = value.label;
  } else if (optionsInfo[(0, _util.getMapKey)(value)]) {
    label = optionsInfo[(0, _util.getMapKey)(value)].label;
  }

  if (label === undefined) {
    label = '';
  }

  return label;
});

_defineProperty(Select, "getLabelFromOption", function (props, option) {
  return (0, _util.getPropValue)(option, props.optionLabelProp);
});

_defineProperty(Select, "getOptionsInfoFromProps", function (props, preState) {
  var options = Select.getOptionsFromChildren(props.children);
  var optionsInfo = {};
  options.forEach(function (option) {
    var singleValue = (0, _util.getValuePropValue)(option);
    optionsInfo[(0, _util.getMapKey)(singleValue)] = {
      option: option,
      value: singleValue,
      label: Select.getLabelFromOption(props, option),
      title: option.props.title
    };
  });

  if (preState) {
    // keep option info in pre state value.
    var oldOptionsInfo = preState.optionsInfo;
    var value = preState.value;
    value.forEach(function (v) {
      var key = (0, _util.getMapKey)(v);

      if (!optionsInfo[key] && oldOptionsInfo[key] !== undefined) {
        optionsInfo[key] = oldOptionsInfo[key];
      }
    });
  }

  return optionsInfo;
});

_defineProperty(Select, "getValueFromProps", function (props, useDefaultValue) {
  var value = [];

  if ('value' in props && !useDefaultValue) {
    value = (0, _util.toArray)(props.value);
  }

  if ('defaultValue' in props && useDefaultValue) {
    value = (0, _util.toArray)(props.defaultValue);
  }

  if (props.labelInValue) {
    value = value.map(function (v) {
      return v.key;
    });
  }

  return value;
});

Select.displayName = 'Select';
(0, _reactLifecyclesCompat.polyfill)(Select);
var _default = Select;
exports["default"] = _default;