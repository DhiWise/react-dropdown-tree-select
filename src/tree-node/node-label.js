import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import Checkbox from '../checkbox'
import RadioButton from '../radio'

class NodeLabel extends PureComponent {
  static propTypes = {
    id: PropTypes.string.isRequired,
    actions: PropTypes.array,
    title: PropTypes.string,
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    checked: PropTypes.bool,
    partial: PropTypes.bool,
    disabled: PropTypes.bool,
    dataset: PropTypes.object,
    mode: PropTypes.oneOf(['multiSelect', 'simpleSelect', 'radioSelect', 'hierarchical']),
    showPartiallySelected: PropTypes.bool,
    onCheckboxChange: PropTypes.func,
    readOnly: PropTypes.bool,
    clientId: PropTypes.string,
    isShowIcon: PropTypes.bool,
  }

  handleCheckboxChange = e => {
    const { mode, id, onCheckboxChange } = this.props
    if (mode === 'simpleSelect' || mode === 'radioSelect') {
      onCheckboxChange(id, true)
    } else {
      const {
        target: { checked },
      } = e
      onCheckboxChange(id, checked)
    }
    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation()
  }

  render() {
    const {
      mode,
      title,
      label,
      id,
      partial,
      checked,
      isIcon,
      customIconClick,
      customKey,
      onNodeToggle,
      isTree,
    } = this.props
    const { value, disabled, showPartiallySelected, readOnly, clientId } = this.props
    const nodeLabelProps = { className: 'node-label' }

    // in case of simple select mode, there is no checkbox, so we need to handle the click via the node label
    // but not if the control is in readOnly or disabled state
    const shouldRegisterClickHandler = mode === 'simpleSelect' && !readOnly && !disabled
    if (shouldRegisterClickHandler) {
      nodeLabelProps.onClick = this.handleCheckboxChange
    }

    const sharedProps = { id, value, checked, disabled, readOnly, tabIndex: -1 }
    const className = ['checkbox-item', mode === 'simpleSelect' && 'simple-select'].filter(Boolean).join(' ')

    return (
      <label
        onClick={() => {
          if (isIcon) {
            customIconClick(customKey)
          } else if (isTree) {
            onNodeToggle(id)
          }
        }}
        title={title || label}
        htmlFor={id}
      >
        {isIcon && (
          <i
            role="button"
            tabIndex={-1}
            className="toggle collapsed"
            style={{ marginRight: '6px' }}
            onClick={e => {
              // this.props.onCheckboxChange(id, true)
              // e.stopPropagation()
              // e.nativeEvent.stopImmediatePropagation()
              customIconClick(customKey)
            }}
            aria-hidden
          />
          // </div>
        )}
        {this.props.isShowIcon && (
          <React.Fragment>
            {mode === 'radioSelect' ? (
              <RadioButton
                name={clientId}
                className="radio-item"
                onChange={this.handleCheckboxChange}
                {...sharedProps}
              />
            ) : (
              <Checkbox
                name={id}
                className={className}
                indeterminate={showPartiallySelected && partial}
                onChange={this.handleCheckboxChange}
                {...sharedProps}
              />
            )}
          </React.Fragment>
        )}
        <span {...nodeLabelProps}>{label}</span>
      </label>
    )
  }
}

export default NodeLabel
