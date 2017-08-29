import React, { Component } from 'react'
import styled from 'styled-components/native'
import { connect } from 'react-redux'
import { Observable } from 'rxjs'
import { AppRegistry } from 'react-native'
import { CoolDownButton } from './CoolDownButton'
import { gatherWood, burnWood, tick, fireBurning } from './ducks/actions'
import { fire$, putSomeLogsOn, fireStrength } from './Fire'
const oneSec = 1000

const roomTemperature = fire => {
  if (!fire) return 'the room is freezing.'
  if (fire === 1) return 'the room is cold.'
  if (fire === 2) return 'the room is mild.'
  if (fire === 3) return 'the room is warm.'
  if (fire >= 4) return 'the room is hot.'
}

const addFireState = fire => {}
class App extends Component {
  state = {
    events: [],
    location: 0,
  }
  changeLocation(newLocation) {
    this.setState({ location: newLocation })
  }
  updateState(x) {
    this.setState({
      events: [roomTemperature(x), fireStrength(x), ...this.state.events],
    })
    this.props.fireBurning(x)
  }
  burnWood() {
    this.props.burnWood()
    putSomeLogsOn()
  }
  componentDidMount() {
    fire$.subscribe(x => this.updateState(x))
    //NOTE: need a way to start subscribing on state change
  }
  gatherWood() {
    this.props.gatherWood()
  }
  render() {
    return (
      <Root>
        <EventColumn>
          {this.state.events.map((x, i) =>
            <AnyText key={i}>
              {x}
            </AnyText>,
          )}
        </EventColumn>
        <Main>
          <Header>
            <Touch onPress={() => this.changeLocation(0)}>
              <AnyText>
                {this.props.appData.fire ? 'A firelit room' : 'A dark room'}
              </AnyText>
            </Touch>
            <Touch onPress={() => this.changeLocation(1)}>
              <AnyText>A silent forest</AnyText>
            </Touch>
          </Header>
          <LocationSlider>
            <LocationActions>
              {!this.state.location
                ? <CoolDownButton
                    title={
                      this.props.appData.fire ? 'stoke fire' : 'light fire'
                    }
                    tick={oneSec}
                    cooldown={10}
                    todo={() => this.burnWood()}
                  />
                : <CoolDownButton
                    title="gather"
                    tick={oneSec}
                    cooldown={20}
                    todo={() => this.props.gatherWood()}
                  />}
            </LocationActions>
            <Stores>
              <AnyText>Stores</AnyText>
              <Border>
                <AnyText>
                  wood: {this.props.appData.wood}
                </AnyText>
              </Border>
            </Stores>
          </LocationSlider>
        </Main>
      </Root>
    )
  }
}
function mapStateToProps(state) {
  return {
    appData: state.appData,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    burnWood: () => dispatch(burnWood()),
    gatherWood: () => dispatch(gatherWood()),
    tick: () => dispatch(tick()),
    fireBurning: x => dispatch(fireBurning(x)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

const Root = styled.View`
  flex: 1;
  flex-direction: row;
`
const Touch = styled.TouchableWithoutFeedback``
const Main = styled.View`
  flex: 6;
  flex-direction: column;
`
const EventColumn = styled.View`flex: 1;`
const Header = styled.View`
  flex: 1;
  flex-direction: row;
`
const LocationSlider = styled.View`
  flex: 7;
  flex-direction: row;
`

const LocationActions = styled.View`flex: 4;`
const Stores = styled.View`flex: 1;`
const Stoke = styled.View`
  width: 80px;
  height: 50;
  background-color: red;
  justify-content: center;
`
const Border = styled.View`border-width: 1;`
const StokeButton = styled.TouchableWithoutFeedback``
const StokeCooldown = styled.View`
  width: ${p => p.cooldown * 8};
  height: 50;
  background-color: gray;
  position: absolute;
`
const AnyText = styled.Text`padding: 10px 10px 10px 10px;`
const CenterText = styled.Text`text-align: center;`
