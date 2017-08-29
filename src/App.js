import React, { Component } from 'react'
import styled from 'styled-components/native'
import { connect } from 'react-redux'
import { Observable } from 'rxjs'
import { AppRegistry } from 'react-native'
import { CoolDownButton } from './CoolDownButton'
import { gatherWood, burnWood, tick } from './ducks/actions'
import { fire$, up } from './Fire'
const oneSec = 1000
const fireStrength = fire => {
  if (!fire) return 'the fire is dead.'
  if (fire === 1) return 'the fire is flickering.'
  if (fire === 2) return 'the fire is smoldering.'
  if (fire === 3) return 'the fire is burning.'
  if (fire === 4) return 'the fire is roaring.'
}
const roomTemperature = fire => {
  if (!fire) return 'the room is freezing.'
  if (fire === 1) return 'the room is cold.'
  if (fire === 2) return 'the room is mild.'
  if (fire === 3) return 'the room is warm.'
}
// const addWood = fire => {
//   fire++
// }

const addFireState = fire => {}
class App extends Component {
  state = {
    events: [],
  }
  updateState(x) {
    this.setState({
      events: [...this.state.events, fireStrength(x), roomTemperature(x)],
    })
  }
  componentDidMount() {
    fire$.subscribe(x => this.updateState(x))
    Observable.fromEvent(document, 'click').subscribe(x => up())
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
            <AnyText>A dark room</AnyText>
          </Header>
          <LocationSlider>
            <LocationActions>
              <CoolDownButton
                title="burn"
                tick={oneSec}
                cooldown={10}
                todo={() => this.props.burnWood()}
              />
              <CoolDownButton
                title="gather"
                tick={oneSec}
                cooldown={20}
                todo={() => this.props.gatherWood()}
              />
            </LocationActions>
            <Stores>
              <AnyText>
                wood: {this.props.appData.wood}
              </AnyText>
            </Stores>
          </LocationSlider>
        </Main>

        {/* <p>
          {this.state.fire}
        </p>
        <button onClick={() => this.whatever()}>Stoke fire</button>
        {this.state.events.map(x =>
          <p key={x}>
            {x}
          </p>,
        )} */}
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

const Root = styled.View`
  flex: 1;
  flex-direction: row;
`
const Main = styled.View`
  flex: 6;
  flex-direction: column;
`
const EventColumn = styled.View`flex: 1;`
const Header = styled.View`flex: 1;`
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
const StokeButton = styled.TouchableWithoutFeedback``
const StokeCooldown = styled.View`
  width: ${p => p.cooldown * 8};
  height: 50;
  background-color: gray;
  position: absolute;
`
const AnyText = styled.Text``
const CenterText = styled.Text`text-align: center;`
