import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {addEventListener} from '../../utils';
import './FooterToolbar.less';

class FooterToolbar extends React.Component {
  static defaultProps = {
    children: null,
    className: '',
    prefixCls: 'fishd-footer-toolbar',
  };

  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    prefixCls: PropTypes.string,
    target: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      offset: 0
    };
  }

  componentDidMount() {
    this.setToolbarPosition();
    const target = this.props.target && this.props.target() || window;
    this.scrollListener = addEventListener(target, 'scroll', () => {
      this.setToolbarPosition();
    });
  }

  componentWillUnmount() {
    if (this.scrollListener) {
      this.scrollListener.remove();
    }
  }

  setToolbarPosition = () => {
    const {target} = this.props;
    const {height} = getComputedStyle(this.wrapper);
    const wrapperHeight = Number.parseInt(height);

    let targetElement = document.documentElement;
    if (target && typeof target === 'function' && target() !== window) {
      targetElement = target();
    }
    const offsetObj = {
      containerHeight: targetElement.clientHeight,
      containerScrollTop: targetElement.scrollTop,
    };

    const offset = offsetObj.containerHeight + offsetObj.containerScrollTop - wrapperHeight;
    const maxOffset = targetElement.scrollHeight - wrapperHeight;
    this.setState({
      offset: offset > maxOffset ? maxOffset : offset
    });
  };

  render() {
    const {children, className, prefixCls} = this.props;
    return (
      <div
        className={classNames({[className]: true, [prefixCls]: true})}
        style={{position: 'absolute', top: this.state.offset}}
        ref={(wrapper) => {
          this.wrapper = wrapper;
        }}
      >
        <div className={`${prefixCls}-inner`}>
          {children}
        </div>
      </div>
    );
  }
}

export default FooterToolbar;

