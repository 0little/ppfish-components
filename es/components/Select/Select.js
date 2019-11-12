"use strict";

exports.__esModule = true;
exports.default = void 0;

require("core-js/modules/es6.object.assign");

require("core-js/modules/es6.array.find");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.array.find-index");

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _rcTrigger = _interopRequireDefault(require("rc-trigger"));

var _rcAnimate = _interopRequireDefault(require("rc-animate"));

var _domScrollIntoView = _interopRequireDefault(require("dom-scroll-into-view"));

var _reactLifecyclesCompat = require("react-lifecycles-compat");

var _classnames = _interopRequireDefault(require("classnames"));

var _index = _interopRequireDefault(require("../Button/index.js"));

var _index2 = _interopRequireDefault(require("../Spin/index.js"));

var _index3 = _interopRequireDefault(require("../Icon/index.js"));

var _SelectSearch = _interopRequireDefault(require("./SelectSearch"));

var _placements = _interopRequireDefault(require("./placements"));

var _utils = require("../../utils");

var _isEqual = _interopRequireDefault(require("lodash/isEqual"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var noop = function noop() {};

var Select =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Select, _React$Component);

  //获取所有option的[{label,key,title}]
  //转换传入的value
  Select.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, prevState) {
    var _prevState$prevProps = prevState.prevProps,
        prevProps = _prevState$prevProps === void 0 ? {} : _prevState$prevProps;
    var newState = {
      prevProps: nextProps
    };

    if ('visible' in nextProps && !(0, _isEqual.default)(nextProps.visible, prevProps.visible)) {
      newState.popupVisible = nextProps.visible;
    }

    if ('value' in nextProps) {
      var changedValue = Select.getValueFromProps(nextProps.value, nextProps.labelInValue, nextProps.children);
      var prevValue = Select.getValueFromProps(prevProps.value, prevProps.labelInValue, prevProps.children);

      if (!(0, _isEqual.default)(changedValue, prevValue)) {
        newState.selectValue = changedValue;

        if (nextProps.mode === 'multiple') {
          newState.selectValueForMultiplePanel = changedValue;
        }
      }
    }

    return newState;
  };

  function Select(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "setDropdownWidth", function () {
      if (!_this.props.dropdownMatchSelectWidth) {
        return;
      }

      var width = _reactDom.default.findDOMNode(_assertThisInitialized(_this)).offsetWidth;

      if (width !== _this.state.dropdownWidth) {
        _this.setState({
          dropdownWidth: width
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "updateSearchValue", function (e) {
      var searchValue = e.target.value;

      _this.props.onSearch(searchValue);

      _this.setState({
        searchValue: searchValue
      });
    });

    _defineProperty(_assertThisInitialized(_this), "emptySearchValue", function () {
      var searchValue = '';

      _this.props.onSearch(searchValue);

      _this.setState({
        searchValue: searchValue
      });

      _this.focus();
    });

    _defineProperty(_assertThisInitialized(_this), "selectAllOption", function () {
      _this.setState({
        selectValue: _this.isSelectAll() ? [] : Select.getOptionFromChildren(_this.props.children, [], function (child) {
          return !child.props.disabled;
        })
      });
    });

    _defineProperty(_assertThisInitialized(_this), "emptySelectValue", function () {
      _this.changeVisibleState(false);

      _this.props.onChange();

      _this.setState({
        selectValue: []
      });
    });

    _defineProperty(_assertThisInitialized(_this), "changeVisibleState", function (visible) {
      _this.props.onVisibleChange(visible);

      var changedState = {
        popupVisible: visible
      };
      var defaultActiveFirstOption = _this.props.defaultActiveFirstOption;

      if (visible) {
        // 打开弹出框时，开启激活第一个选项
        if (defaultActiveFirstOption) {
          var firstOption = Select.getOptionFromChildren(_this.props.children, [], function (child) {
            return !child.props.disabled;
          })[0] || {};
          changedState.activeKey = firstOption.key;
        }
      } else {
        changedState.activeKey = undefined;
      }

      _this.setState(changedState, function () {
        visible && _this.focus();
      });
    });

    _defineProperty(_assertThisInitialized(_this), "visibleChangeFromTrigger", function (visible) {
      var selectValueForMultiplePanel = _this.state.selectValueForMultiplePanel;
      var mode = _this.props.mode;

      if (!visible && mode === 'multiple') {
        _this.setState({
          selectValue: selectValueForMultiplePanel
        });
      }

      _this.changeVisibleState(visible);
    });

    _defineProperty(_assertThisInitialized(_this), "focusEvent", function (event) {
      var _this$props = _this.props,
          showSearch = _this$props.showSearch,
          loading = _this$props.loading;
      if (loading) return;
      var targetElement = showSearch ? _this.selectSearch && _this.selectSearch.searchInput.input : _this.selection;

      if (targetElement) {
        targetElement[event]();
      } else {
        setTimeout(function () {
          var targetElement = showSearch ? _this.selectSearch.searchInput.input : _this.selection;
          targetElement && targetElement[event]();
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onOptionClick", function (e, obj, clickInLabel) {
      e && e.stopPropagation();
      var _this$props2 = _this.props,
          onChange = _this$props2.onChange,
          mode = _this$props2.mode,
          onSelect = _this$props2.onSelect,
          labelInValue = _this$props2.labelInValue;
      var selectValue = _this.state.selectValue;
      var index = selectValue.findIndex(function (selected) {
        return selected.key === obj.key;
      });

      if (mode === 'single') {
        _this.changeVisibleState(false);

        _this.setState({
          selectValue: [obj]
        });

        if (index === -1) {
          if (labelInValue) {
            onChange(obj);
          } else {
            onChange(obj.key);
          }
        }
      } else if (mode === 'multiple') {
        var changedValue,
            changedObj = {}; //label 点击

        if (clickInLabel) {
          var selectValueForMultiplePanel = _this.state.selectValueForMultiplePanel;
          var indexInMultiple = selectValueForMultiplePanel.findIndex(function (selected) {
            return selected.key === obj.key;
          });
          changedValue = [].concat(selectValueForMultiplePanel.slice(0, indexInMultiple), selectValueForMultiplePanel.slice(indexInMultiple + 1));
          changedObj = {
            selectValue: changedValue,
            selectValueForMultiplePanel: changedValue
          };
        } else {
          //option 点击
          changedValue = index === -1 ? [].concat(selectValue, [obj]) : [].concat(selectValue.slice(0, index), selectValue.slice(index + 1));
          changedObj = {
            selectValue: changedValue
          };
        }

        _this.setState(changedObj);

        if (clickInLabel) {
          //click on label will trigger the onchange event.
          if (labelInValue) {
            onChange(changedValue);
          } else {
            onChange(changedValue.map(function (selected) {
              return selected.key;
            }));
          }
        }
      } //fire onSelect event => option/label click


      onSelect(obj);
    });

    _defineProperty(_assertThisInitialized(_this), "getProcessedChildren", function (children, dropdownCls) {
      return _react.default.Children.map(children, function (child) {
        var typeOfChildren = Object.prototype.toString.call(child).slice(8, -1).toLowerCase();

        if (!!child && typeOfChildren === 'object' && child.type.isSelectOption) {
          var _this$state = _this.state,
              selectValue = _this$state.selectValue,
              activeKey = _this$state.activeKey;
          var showOptionCheckedIcon = _this.props.showOptionCheckedIcon;
          var value = 'value' in child.props ? child.props.value : child.key; //对children中的Option 进行事件绑定、参数补充

          return _react.default.cloneElement(child, {
            prefixCls: dropdownCls + "-option",
            checked: !!selectValue.find(function (obj) {
              return obj && obj.key === value;
            }),
            value: value,
            activeKey: activeKey,
            showOptionCheckedIcon: showOptionCheckedIcon,
            onOptionClick: _this.onOptionClick,
            onOptionMouseEnter: _this.onOptionMouseEnter,
            ref: value,
            children: _this.getProcessedChildren(child.props.children, dropdownCls)
          });
        } else if (!!child && typeOfChildren === 'object' && child.type.isSelectOptGroup) {
          return _react.default.cloneElement(child, {
            prefixCls: dropdownCls + "-option-group",
            children: _this.getProcessedChildren(child.props.children, dropdownCls)
          });
        } else {
          return child;
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "getFilteredChildren", function (children, ChildrenList) {
      if (ChildrenList === void 0) {
        ChildrenList = [];
      }

      var filterOption = _this.props.filterOption;
      var searchValue = _this.state.searchValue;
      var typeOfOption = Object.prototype.toString.call(filterOption).slice(8, -1).toLowerCase();

      _react.default.Children.forEach(children, function (child) {
        var filterFlag = false;

        if (child && child.type && child.type.isSelectOption) {
          if (typeOfOption === 'function') {
            filterFlag = filterOption(searchValue, child);
          } else if (typeOfOption === 'boolean') {
            filterFlag = filterOption;
          }

          if (filterFlag) {
            ChildrenList.push(child);
          }
        } else if (child && child.type && child.type.isSelectOptGroup) {
          var _children2 = _this.getFilteredChildren(child.props.children);

          ChildrenList.push(_react.default.cloneElement(child, {
            children: _children2,
            _isShow: !!(_children2 && _children2.length) //搜索后分组下没有东西就隐藏该分组

          }));
        }
      });

      return ChildrenList;
    });

    _defineProperty(_assertThisInitialized(_this), "handleCancelSelect", function () {
      var selectValueForMultiplePanel = _this.state.selectValueForMultiplePanel;

      _this.changeVisibleState(false);

      _this.setState({
        selectValue: selectValueForMultiplePanel
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleConfirmSelect", function () {
      var _this$props3 = _this.props,
          onChange = _this$props3.onChange,
          labelInValue = _this$props3.labelInValue;
      var selectValue = _this.state.selectValue;

      _this.changeVisibleState(false);

      _this.setState({
        selectValueForMultiplePanel: selectValue
      });

      var outputSelectedValue = selectValue; // 是否过滤失效的选中项

      if (_this.props.filterInactiveOption) {
        var optionList = Select.getOptionFromChildren(_this.props.children, [], function (child) {
          return !child.props.disabled;
        });
        outputSelectedValue = selectValue.filter(function (item) {
          return !!optionList.find(function (option) {
            return option.key === item.key;
          });
        });
      }

      if (labelInValue) {
        onChange(outputSelectedValue);
      } else {
        onChange(outputSelectedValue.map(function (selected) {
          return selected.key;
        }));
      }
    });

    _defineProperty(_assertThisInitialized(_this), "isSelectAll", function (isMultiplePanel) {
      if (isMultiplePanel === void 0) {
        isMultiplePanel = false;
      }

      var _this$state2 = _this.state,
          selectValueForMultiplePanel = _this$state2.selectValueForMultiplePanel,
          selectValue = _this$state2.selectValue;
      var optionList = Select.getOptionFromChildren(_this.props.children, [], function (child) {
        return !child.props.disabled;
      }); //全选判断逻辑：option中每一项都能在selected中找到（兼容后端搜索的全选判断）

      if (isMultiplePanel) {
        return optionList.length && optionList.every(function (selected) {
          return !!selectValueForMultiplePanel.find(function (option) {
            return option.key === selected.key;
          });
        });
      } else {
        return optionList.every(function (selected) {
          return !!selectValue.find(function (option) {
            return option.key === selected.key;
          });
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleKeyboardEvent", function (e) {
      var keyCode = e.keyCode;

      if (keyCode === _utils.KeyCode.ESC && _this.props.esc) {
        _this.changeVisibleState(false);

        return;
      }

      if (keyCode === _utils.KeyCode.ENTER || keyCode === _utils.KeyCode.UP || keyCode === _utils.KeyCode.DOWN) {
        e.preventDefault();
        var _this$props4 = _this.props,
            children = _this$props4.children,
            mode = _this$props4.mode,
            labelInValue = _this$props4.labelInValue,
            onChange = _this$props4.onChange;
        var _this$state3 = _this.state,
            activeKey = _this$state3.activeKey,
            selectValue = _this$state3.selectValue;
        var optionList = Select.getOptionFromChildren(children, [], function (child) {
          return !child.props.disabled;
        });
        var optionListLen = optionList.length;
        if (!optionListLen) return; //enter

        if (keyCode === _utils.KeyCode.ENTER) {
          var activeTabIndex = optionList.findIndex(function (option) {
            return option.key === activeKey;
          }); // activeKey不在列表中

          if (activeTabIndex !== -1) {
            if (!selectValue.find(function (selected) {
              return selected.key === activeKey;
            })) {
              if (mode === 'single') {
                _this.changeVisibleState(false);

                _this.setState({
                  selectValue: [optionList[activeTabIndex]],
                  activeKey: undefined
                }, function () {
                  if (labelInValue) {
                    onChange(_this.state.selectValue[0]);
                  } else {
                    onChange(_this.state.selectValue.map(function (selected) {
                      return selected.key;
                    })[0]);
                  }
                });
              } else if (mode === 'multiple') {
                _this.setState({
                  selectValue: [].concat(selectValue, [optionList[activeTabIndex]])
                });
              }
            }
          }
        } //38 up 40 down


        if (keyCode === _utils.KeyCode.UP || keyCode === _utils.KeyCode.DOWN) {
          // 有activeKey
          if (activeKey !== undefined) {
            var _activeTabIndex = optionList.findIndex(function (option) {
              return option.key === activeKey;
            }); // activeKey不在列表中


            if (_activeTabIndex === -1) {
              _this.setState({
                activeKey: optionList[0].key
              }, function () {
                _this.setActiveOptionIntoView(optionList[0].key);
              });

              return;
            } // 上按钮


            var nextActiveKey = undefined;

            if (keyCode === _utils.KeyCode.UP) {
              //超出到最后一个
              if (_activeTabIndex === 0) {
                nextActiveKey = optionList[optionListLen - 1].key;
              } else {
                nextActiveKey = optionList[_activeTabIndex - 1].key;
              }
            } else if (keyCode === _utils.KeyCode.DOWN) {
              if (_activeTabIndex + 1 === optionListLen) {
                nextActiveKey = optionList[0].key;
              } else {
                nextActiveKey = optionList[_activeTabIndex + 1].key;
              }
            }

            _this.setState({
              activeKey: nextActiveKey
            }, function () {
              _this.setActiveOptionIntoView(nextActiveKey);
            });
          } else {
            _this.setState({
              activeKey: optionList[0].key
            }, function () {
              _this.setActiveOptionIntoView(optionList[0].key);
            });
          }
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "setActiveOptionIntoView", function (activeKey) {
      (0, _domScrollIntoView.default)(_reactDom.default.findDOMNode(_this.refs[activeKey]), _reactDom.default.findDOMNode(_this.dropdownList), {
        onlyScrollIfNeeded: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "resizeTrigger", function () {
      if (_this.trigger && _this.trigger._component && _this.trigger._component.alignInstance) {
        _this.trigger._component.alignInstance.forceAlign();
      }
    });

    var _this$props5 = _this.props,
        _value = _this$props5.value,
        defaultValue = _this$props5.defaultValue,
        _labelInValue = _this$props5.labelInValue,
        _children = _this$props5.children,
        _visible = _this$props5.visible;
    var initialValue = [];

    if ('value' in _this.props) {
      initialValue = _value;
    } else if ('defaultValue' in _this.props) {
      initialValue = defaultValue;
    }

    var initialSelectValue = Select.getValueFromProps(initialValue, _labelInValue, _children);
    _this.state = {
      searchValue: '',
      selectValue: initialSelectValue,
      selectValueForMultiplePanel: initialSelectValue,
      popupVisible: _visible,
      activeKey: undefined,
      dropdownWidth: null,
      prevProps: props
    };
    return _this;
  }

  var _proto = Select.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.setDropdownWidth();
  };

  _proto.componentDidUpdate = function componentDidUpdate() {
    this.setDropdownWidth();
  } //获取面板宽度
  ;

  // 聚焦
  _proto.focus = function focus() {
    this.focusEvent('focus');
  } // 失焦
  ;

  _proto.blur = function blur() {
    this.focusEvent('blur');
  } //处理 label、option的click操作
  ;

  //下拉框内容
  _proto.getDropdownPanel = function getDropdownPanel() {
    var _classNames,
        _this2 = this,
        _classNames2,
        _classNames3;

    var _this$props6 = this.props,
        allowClear = _this$props6.allowClear,
        children = _this$props6.children,
        dropdownClassName = _this$props6.dropdownClassName,
        dropdownStyle = _this$props6.dropdownStyle,
        errorMessage = _this$props6.errorMessage,
        extraOptions = _this$props6.extraOptions,
        loading = _this$props6.loading,
        maxCount = _this$props6.maxCount,
        maxScrollHeight = _this$props6.maxScrollHeight,
        mode = _this$props6.mode,
        notFoundContent = _this$props6.notFoundContent,
        onPopupScroll = _this$props6.onPopupScroll,
        placeholder = _this$props6.placeholder,
        prefixCls = _this$props6.prefixCls,
        searchInputProps = _this$props6.searchInputProps,
        searchPlaceholder = _this$props6.searchPlaceholder,
        selectAllText = _this$props6.selectAllText,
        showSearch = _this$props6.showSearch,
        showSelectAll = _this$props6.showSelectAll,
        showSingleClear = _this$props6.showSingleClear,
        required = _this$props6.required;
    var _this$state4 = this.state,
        searchValue = _this$state4.searchValue,
        selectValue = _this$state4.selectValue;
    var dropdownCls = prefixCls + "-dropdown"; //获取筛选后的children

    var optionFilteredList = this.getFilteredChildren(this.getProcessedChildren(children, dropdownCls));
    var showNotFoundContent = !Select.getOptionFromChildren(optionFilteredList).length; // optionList为空判断

    var maxCountError = 'maxCount' in this.props && selectValue.length > maxCount; // maxCount值存在且小于选择数量

    var requiredError = mode === 'multiple' && required && !selectValue.length; // required模式下，必须要有option选择

    var multipleConfirmDisabled = maxCountError || requiredError;
    var dropdownPanelCls = (0, _classnames.default)(dropdownCls, (_classNames = {}, _classNames[dropdownClassName] = !!dropdownClassName, _classNames));
    return _react.default.createElement("div", {
      className: dropdownPanelCls,
      onKeyDown: this.handleKeyboardEvent,
      ref: function ref(selection) {
        return _this2.selection = selection;
      },
      style: dropdownStyle,
      tabIndex: "0"
    }, loading ? _react.default.createElement("div", {
      className: dropdownCls + "-loading"
    }, _react.default.createElement("div", null, _react.default.createElement("div", null, _react.default.createElement(_index2.default.Container, {
      style: {
        height: 32,
        justifyContent: 'left'
      }
    }, _react.default.createElement(_index2.default, {
      size: "small",
      tip: "\u52A0\u8F7D\u4E2D..."
    }))))) : _react.default.createElement("div", {
      className: dropdownCls + "-content"
    }, //搜索框
    showSearch && _react.default.createElement(_SelectSearch.default, {
      allowClear: allowClear,
      emitEmpty: this.emptySearchValue,
      prefixCls: dropdownCls + "-search",
      ref: function ref(selectSearch) {
        return _this2.selectSearch = selectSearch;
      },
      searchInputProps: searchInputProps,
      searchPlaceholder: searchPlaceholder,
      searchValue: searchValue,
      updateSearchValue: this.updateSearchValue
    }), _react.default.createElement("div", {
      className: dropdownCls + "-list",
      onScroll: onPopupScroll,
      ref: function ref(dropdownList) {
        return _this2.dropdownList = dropdownList;
      },
      style: {
        maxHeight: maxScrollHeight
      }
    }, //全选按钮-多选未搜索的情况下存在
    !searchValue && showSelectAll && mode === 'multiple' && _react.default.createElement("li", {
      className: (0, _classnames.default)((_classNames2 = {}, _classNames2[dropdownCls + "-option-item"] = true, _classNames2), (_classNames3 = {}, _classNames3['checked checked-icon'] = this.isSelectAll(), _classNames3)),
      onClick: this.selectAllOption
    }, selectAllText), //清空选项按钮-单选未搜索的情况下存在
    !searchValue && showSingleClear && mode === 'single' && _react.default.createElement("li", {
      className: dropdownCls + "-option-item",
      onClick: this.emptySelectValue
    }, placeholder), //预留置顶项
    extraOptions, //列表及空状态框
    showNotFoundContent ? _react.default.createElement("div", {
      className: dropdownCls + "-not-found"
    }, notFoundContent) : _react.default.createElement("div", {
      className: dropdownCls + "-filtered-list"
    }, optionFilteredList)), //多选的点击取消、确定按钮组
    mode === 'multiple' && _react.default.createElement("div", null, maxCountError && _react.default.createElement("div", {
      className: dropdownCls + "-error-panel"
    }, _react.default.createElement("p", {
      className: dropdownCls + "-error-panel-msg"
    }, errorMessage)), _react.default.createElement("div", {
      className: dropdownCls + "-footer"
    }, _react.default.createElement(_index.default, {
      className: dropdownCls + "-footer-btn",
      onClick: this.handleCancelSelect
    }, "\u53D6\u6D88"), _react.default.createElement(_index.default, {
      className: dropdownCls + "-footer-btn",
      onClick: this.handleConfirmSelect,
      disabled: multipleConfirmDisabled,
      type: "primary"
    }, "\u786E\u5B9A")))));
  } // 获取面板内容
  ;

  _proto.getSelectionPanel = function getSelectionPanel() {
    var _classNames4,
        _classNames5,
        _classNames6,
        _classNames7,
        _classNames8,
        _classNames9,
        _classNames10,
        _this3 = this;

    var _this$props7 = this.props,
        className = _this$props7.className,
        tagWidth = _this$props7.tagWidth,
        disabled = _this$props7.disabled,
        labelClear = _this$props7.labelClear,
        loading = _this$props7.loading,
        maxLabelClearPanelHeight = _this$props7.maxLabelClearPanelHeight,
        mode = _this$props7.mode,
        multipleSelectAllText = _this$props7.multipleSelectAllText,
        onMouseEnter = _this$props7.onMouseEnter,
        onMouseLeave = _this$props7.onMouseLeave,
        placeholder = _this$props7.placeholder,
        prefixCls = _this$props7.prefixCls,
        showArrow = _this$props7.showArrow,
        showMultipleSelectAll = _this$props7.showMultipleSelectAll,
        size = _this$props7.size,
        style = _this$props7.style;
    var _this$state5 = this.state,
        selectValue = _this$state5.selectValue,
        selectValueForMultiplePanel = _this$state5.selectValueForMultiplePanel,
        popupVisible = _this$state5.popupVisible;
    var selectionCls = "" + prefixCls;
    var selectionPanelCls = (0, _classnames.default)((_classNames4 = {}, _classNames4["" + selectionCls] = true, _classNames4), (_classNames5 = {}, _classNames5[className] = !!className, _classNames5), (_classNames6 = {}, _classNames6[selectionCls + "-disabled"] = disabled, _classNames6), (_classNames7 = {}, _classNames7["open"] = popupVisible, _classNames7), (_classNames8 = {}, _classNames8[selectionCls + "-large"] = size === 'large', _classNames8), (_classNames9 = {}, _classNames9[selectionCls + "-small"] = size === 'small', _classNames9));
    var panelStyle = Object.assign({}, style);

    if (labelClear) {
      panelStyle.paddingRight = 0;

      if (mode === 'multiple' && selectValueForMultiplePanel.length) {
        panelStyle.height = 'auto';
      }
    }

    var multipleTitle = "";

    if (mode === 'multiple' && !labelClear) {
      var titleArray = selectValueForMultiplePanel.map(function (panel) {
        return panel.title;
      });
      var isShowTitle = titleArray.every(function (title) {
        return !!title;
      });
      multipleTitle = isShowTitle ? titleArray.join("、") : "";
    }

    return _react.default.createElement("div", {
      className: selectionPanelCls,
      onMouseEnter: onMouseEnter,
      onMouseLeave: onMouseLeave,
      style: panelStyle
    }, loading ? _react.default.createElement("div", {
      className: selectionCls + "-loading"
    }, _react.default.createElement("div", null, _react.default.createElement(_index2.default.Container, {
      style: {
        height: 32,
        justifyContent: 'left'
      }
    }, _react.default.createElement(_index2.default, {
      size: "small",
      tip: "\u52A0\u8F7D\u4E2D..."
    })))) : _react.default.createElement("div", {
      className: selectionCls + "-content"
    }, // showArrow并且不是可删除label模式下出现箭头
    showArrow && !labelClear && _react.default.createElement("div", {
      className: selectionCls + "-caret"
    }, _react.default.createElement(_index3.default, {
      type: "down-fill",
      className: (0, _classnames.default)((_classNames10 = {}, _classNames10['open'] = popupVisible, _classNames10))
    })), // 没有值的情况下显示placeholder
    (!selectValue.length && mode === 'single' || !selectValueForMultiplePanel.length && mode === 'multiple') && _react.default.createElement("div", {
      unselectable: "on",
      className: selectionCls + "-placeholder"
    }, placeholder), // 单选模式下有值显示值的label
    mode === 'single' && !!selectValue.length && _react.default.createElement("div", {
      className: selectionCls + "-option-single",
      title: selectValue[0].title
    }, selectValue[0].label), // 多选模式下区分labelClear
    // selectValueForMultiplePanel的更新时机：
    // 1.初始化value、defaultValue
    // 2.props.value 更改
    // 3.多选取消、确定按钮点击
    // 4.label.click事件
    mode === 'multiple' && (labelClear ? //仅在有选中数据时渲染，fix空状态面板上方高度问题
    selectValueForMultiplePanel && selectValueForMultiplePanel.length ? _react.default.createElement(_rcAnimate.default, {
      onEnd: this.resizeTrigger,
      component: "div",
      transitionName: "zoom",
      style: {
        maxHeight: maxLabelClearPanelHeight ? maxLabelClearPanelHeight : null
      },
      className: selectionCls + "-option-clearable-list"
    }, selectValueForMultiplePanel.map(function (option) {
      return _react.default.createElement("div", {
        className: selectionCls + "-option-clearable-option",
        style: {
          width: tagWidth
        },
        key: option.key,
        title: option.title
      }, _react.default.createElement("span", {
        className: selectionCls + "-option-clearable-option-content"
      }, option.label), _react.default.createElement("span", {
        className: selectionCls + "-option-clearable-option-close",
        onClick: function onClick(e) {
          return _this3.onOptionClick(e, option, true);
        }
      }, _react.default.createElement(_index3.default, {
        type: "close-modal-line"
      })));
    })) : null : _react.default.createElement("div", {
      className: selectionCls + "-option-multiple",
      title: multipleTitle
    }, this.isSelectAll(true) && showMultipleSelectAll ? _react.default.createElement("span", null, multipleSelectAllText) : selectValueForMultiplePanel.map(function (option, index) {
      return _react.default.createElement("span", {
        key: option.key,
        className: selectionCls + "-option-multiple-option"
      }, _react.default.createElement("span", null, option.label), index + 1 !== selectValueForMultiplePanel.length && '、');
    })))));
  };

  _proto.render = function render() {
    var _this4 = this;

    var _this$props8 = this.props,
        disabled = _this$props8.disabled,
        dropdownMatchSelectWidth = _this$props8.dropdownMatchSelectWidth,
        getPopupContainer = _this$props8.getPopupContainer,
        placement = _this$props8.placement,
        prefixCls = _this$props8.prefixCls;
    var _this$state6 = this.state,
        popupVisible = _this$state6.popupVisible,
        dropdownWidth = _this$state6.dropdownWidth;
    var popupStyle = {};
    var widthProp = dropdownMatchSelectWidth ? 'width' : 'minWidth';

    if (dropdownWidth) {
      popupStyle[widthProp] = dropdownWidth + "px";
    }

    return _react.default.createElement(_rcTrigger.default, {
      action: disabled ? [] : ['click'],
      builtinPlacements: _placements.default,
      ref: function ref(node) {
        return _this4.trigger = node;
      },
      getPopupContainer: getPopupContainer,
      onPopupVisibleChange: this.visibleChangeFromTrigger,
      popup: this.getDropdownPanel(),
      popupPlacement: placement,
      popupVisible: popupVisible,
      prefixCls: prefixCls + "-popup",
      popupStyle: popupStyle
    }, this.getSelectionPanel());
  };

  return Select;
}(_react.default.Component);

_defineProperty(Select, "propTypes", {
  allowClear: _propTypes.default.bool,
  children: _propTypes.default.node,
  className: _propTypes.default.string,
  tagWidth: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),
  defaultActiveFirstOption: _propTypes.default.bool,
  defaultValue: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number, _propTypes.default.array, _propTypes.default.object]),
  disabled: _propTypes.default.bool,
  dropdownClassName: _propTypes.default.string,
  dropdownMatchSelectWidth: _propTypes.default.bool,
  dropdownStyle: _propTypes.default.object,
  errorMessage: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.node]),
  extraOptions: _propTypes.default.oneOfType([_propTypes.default.node, _propTypes.default.string]),
  filterOption: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.bool]),
  getPopupContainer: _propTypes.default.func,
  labelClear: _propTypes.default.bool,
  labelInValue: _propTypes.default.bool,
  loading: _propTypes.default.bool,
  maxCount: _propTypes.default.number,
  maxLabelClearPanelHeight: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),
  maxScrollHeight: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),
  mode: _propTypes.default.oneOf(['multiple', 'single']),
  multipleSelectAllText: _propTypes.default.string,
  notFoundContent: _propTypes.default.oneOfType([_propTypes.default.node, _propTypes.default.string]),
  onChange: _propTypes.default.func,
  onMouseEnter: _propTypes.default.func,
  onMouseLeave: _propTypes.default.func,
  onPopupScroll: _propTypes.default.func,
  onSearch: _propTypes.default.func,
  onSelect: _propTypes.default.func,
  onVisibleChange: _propTypes.default.func,
  placeholder: _propTypes.default.string,
  placement: _propTypes.default.oneOf(['bottomLeft', 'bottomCenter', 'bottomRight', 'topLeft', 'topCenter', 'topRight']),
  prefixCls: _propTypes.default.string,
  searchInputProps: _propTypes.default.object,
  searchPlaceholder: _propTypes.default.string,
  selectAllText: _propTypes.default.string,
  showArrow: _propTypes.default.bool,
  showMultipleSelectAll: _propTypes.default.bool,
  showOptionCheckedIcon: _propTypes.default.bool,
  showSearch: _propTypes.default.bool,
  showSelectAll: _propTypes.default.bool,
  showSingleClear: _propTypes.default.bool,
  size: _propTypes.default.oneOf(['default', 'small', 'large']),
  style: _propTypes.default.object,
  value: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number, _propTypes.default.array, _propTypes.default.object]),
  visible: _propTypes.default.bool,
  esc: _propTypes.default.bool,
  required: _propTypes.default.bool,
  filterInactiveOption: _propTypes.default.bool // 是否过滤失效的选中项（即不在option列表中）

});

_defineProperty(Select, "defaultProps", {
  allowClear: true,
  tagWidth: 100,
  defaultActiveFirstOption: false,
  disabled: false,
  dropdownMatchSelectWidth: true,
  errorMessage: '超过选项上限',
  filterOption: true,
  labelClear: false,
  labelInValue: false,
  loading: false,
  maxScrollHeight: 250,
  mode: 'single',
  multipleSelectAllText: '所有选项',
  notFoundContent: '无匹配结果',
  onChange: noop,
  onPopupScroll: noop,
  onSearch: noop,
  onSelect: noop,
  onVisibleChange: noop,
  placeholder: '请选择',
  placement: 'bottomLeft',
  prefixCls: 'fishd-select',
  searchInputProps: {},
  searchPlaceholder: '请输入关键字',
  selectAllText: '选择所有',
  showArrow: true,
  showMultipleSelectAll: false,
  showOptionCheckedIcon: true,
  showSearch: false,
  showSelectAll: false,
  showSingleClear: false,
  size: 'default',
  style: {},
  visible: false,
  esc: true,
  required: false,
  filterInactiveOption: false
});

_defineProperty(Select, "getOptionFromChildren", function (children, plainOptionList, filter) {
  if (plainOptionList === void 0) {
    plainOptionList = [];
  }

  _react.default.Children.forEach(children, function (child) {
    if (child && child.type && child.type.isSelectOption) {
      var selectOption = {
        label: child.props.children,
        key: 'value' in child.props ? child.props.value : child.key,
        title: child.props.title
      };

      if (filter) {
        filter(child) && plainOptionList.push(selectOption);
      } else {
        plainOptionList.push(selectOption);
      }
    } else if (child && child.type && child.type.isSelectOptGroup) {
      Select.getOptionFromChildren(child.props.children, plainOptionList, filter);
    } else {//  其余暂时不做处理
    }
  });

  return plainOptionList;
});

_defineProperty(Select, "getValueFromProps", function (value, labelInValue, children) {
  var valueType = Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
  var optionList = Select.getOptionFromChildren(children, []);

  if (labelInValue) {
    //labelInValue数据从传入数据中取
    if (valueType === 'array') {
      return value && value.map(function (obj) {
        var option = optionList.find(function (option) {
          return option.key === obj.key;
        }) || {};
        var label = obj.label || option.label || obj.key;
        var title = obj.title || option.title;
        return {
          key: obj.key,
          label: label,
          title: title
        };
      }) || [];
    } else if (valueType === 'object') {
      var option = optionList.find(function (option) {
        return option.key === value.key;
      }) || {};
      var label = value.label || option.label || value.key;
      var title = value.title || option.title;
      return [{
        key: value.key,
        label: label,
        title: title
      }];
    } else {
      // 其余就给空状态
      return [];
    }
  } else {
    // 非labelInValue数据从option里取
    if (valueType === 'string' || valueType === 'number') value = [value];
    return value && value.map(function (key) {
      var option = optionList.find(function (option) {
        return option.key === key;
      }) || {};
      var label = option.label || key;
      var title = option.title;
      return {
        key: key,
        label: label,
        title: title
      };
    }) || [];
  }
});

(0, _reactLifecyclesCompat.polyfill)(Select);
var _default = Select;
exports.default = _default;