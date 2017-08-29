import React, { Component } from 'react'
import styled from 'styled-components/native'
import { Observable } from 'rxjs'
const ButtonWidth = 100
const timeleftAsWidth = (timeInSeconds, cooldown) => {
  // console.log(timeInSeconds * ButtonWidth / cooldown)
  return timeInSeconds * ButtonWidth / cooldown
}
export class CoolDownButton extends Component {
  state = {
    timeleft: 0,
  }
  decrement(x) {
    if (this.state.timeleft)
      this.setState({ timeleft: this.props.cooldown - x - 1 })
  }
  startCooldown() {
    if (this.state.timeleft === 0) {
      console.log('do stuff', this.props.cooldown)
      this.setState({ timeleft: this.props.cooldown })
      console.log(this.state.timeleft, this.props.cooldown)

      this.props.todo()
      Observable.interval(this.props.tick)
        .take(this.props.cooldown)
        .subscribe(x => this.decrement(x))
    }
  }
  render() {
    console.log()
    return (
      <StokeButton onPress={() => this.startCooldown()}>
        <Stoke>
          <StokeCooldown
            timeleft={this.state.timeleft}
            cooldown={this.props.cooldown}
          />

          <CenterText>
            {this.props.title}
          </CenterText>
        </Stoke>
      </StokeButton>
    )
  }
}
const Stoke = styled.View`
  width: ${ButtonWidth};
  height: 30;
  justify-content: center;
  border-width: 1;
`
const StokeButton = styled.TouchableWithoutFeedback``
const StokeCooldown = styled.View`
  width: ${p => timeleftAsWidth(p.timeleft, p.cooldown)};
  height: 30;
  background-color: gray;
  position: absolute;
`
const CenterText = styled.Text`text-align: center;`
