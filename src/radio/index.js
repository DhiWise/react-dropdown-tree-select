import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

export const refUpdater = ({ checked }) => input => {
  if (input) {
    input.checked = checked
  }
}

class RadioButton extends PureComponent {
  static propTypes = {
    name: PropTypes.string.isRequired,
    checked: PropTypes.bool,
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
    readOnly: PropTypes.bool,
  }

  render() {
    const { name, checked, onChange, disabled, readOnly, ...rest } = this.props

    const isDisabled = disabled || readOnly

    return (
      <div className="radioBoxWrap">
        <input
          type="radio"
          name={name}
          ref={refUpdater({ checked })}
          onChange={onChange}
          disabled={isDisabled}
          {...rest}
        />
        <span class="spark-radio-inner" />
      </div>
    )
  }
}

export default RadioButton
