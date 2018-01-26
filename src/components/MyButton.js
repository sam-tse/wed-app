import React from 'react'

export default class MyButton extends React.Component {

state = {
    isSelected: false
  }

  componentWillReceiveProps(nextProps) {
     const { values, value } = this.props
     console.log(2)
      this.setState({isSelected: values.value === value});
  }

  buttonClick = () => {
    const { values, value } = this.props
     values.numOfAdults=value
  }
  
  render() {
    // let isActive = this.context.router.route.location.pathname === this.props.to
    // let className = isActive ? 'uk-active' : ''
     const { values, value } = this.props

    return (
      <div>
      <button className='uk-button uk-button-default' type="button" onClick={ this.buttonClick }>{value}</button>
      {this.state.isSelected ? 'SAM' : 'tse'}
      </div>
    )
  }
}


