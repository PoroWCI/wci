import React from 'react'
import styled, { keyframes } from 'styled-components'
import { useHistory } from 'react-router-dom'

import { notFound, global } from '@images/index'

interface StarProps {
  top: number
  left: number
  alternate: number
}

const rotate = keyframes`
  40% { opacity: 0.3; }
  90%,100% { opacity: 1; transform: scale(1.2); }
`

const spin = keyframes`
  100% { 
    transform: rotate(-360deg);
    transition: transform 20s;
  }
`

const moveAstronaut = keyframes`
  100% { 
    transform: translate(-160px, -160px); 
  }
`

const rotateAstronaut = keyframes`
  100% { 
    transform:rotate(-720deg); 
  }
`

const Wrapper = styled.div`
  position: relative;
  background: black;
  background-repeat: repeat-x;
  background-size: cover;
  background-position: left top;
  height: 100%;
  overflow: hidden;
`

const Stars = styled.div`
  background: url(${notFound.overlay.default});
  background-repeat: repeat;
  background-size: contain;
  background-position: left top;
`

const Infos = styled.div`
  padding: 17% 5% 10% 5%;
  text-align: center;
`

const GlowingStars = styled.div``
const Planets = styled.div``
const Objects = styled.div``

const Star = styled.div<StarProps>`
  position: absolute;
  top: ${(props) => props.top}%;
  left: ${(props) => props.left}%;
  border-radius: 100%;
  background-color: #fff;
  width: 3px;
  height: 3px;
  opacity: 0.3;
  will-change: opacity;
  animation: ${rotate} 2s infinite ease-in-out alternate
    ${(props) => props.alternate}s;
`

const AstronautBox = styled.div`
  z-index: 110;
  position: absolute;
  top: 60%;
  right: 20%;
  will-change: transform;
  animation: ${moveAstronaut} 50s infinite linear both alternate;
`

const BackHome = styled.img`
  position: absolute;
  bottom: 15px;
  left: 15px;
  cursor: pointer;
`

const Earth = styled.img`
  position: absolute;
  pointer-events: none;
  top: 20%;
  left: 15%;
  animation: ${spin} 100s infinite linear both;
`

const Logo = styled.img`
  pointer-events: none;
`

const Moon = styled.img`
  position: absolute;
  pointer-events: none;
  top: 12%;
  left: 25%;
`

const Astronaut = styled.img`
  z-index: 90;
  pointer-events: none;
  animation: ${rotateAstronaut} 200s infinite linear both alternate;
`

const NoMatch: React.FunctionComponent<{}> = () => {
  const navigation = useHistory()

  return (
    <Wrapper>
      <Stars>
        <Infos>
          <Logo src={notFound.logo.default} width={300} alt="" />
        </Infos>
        <Objects>
          <Planets>
            <Earth src={notFound.earth.default} width={100} alt="" />
            <Moon src={notFound.moon.default} width={80} alt="" />
          </Planets>
          <AstronautBox>
            <Astronaut src={notFound.astronaut.default} width={140} alt="" />
          </AstronautBox>
        </Objects>
        <GlowingStars>
          <Star top={80} left={25} alternate={1} />
          <Star top={20} left={40} alternate={3} />
          <Star top={25} left={25} alternate={5} />
          <Star top={75} left={80} alternate={7} />
          <Star top={90} left={50} alternate={9} />
        </GlowingStars>
      </Stars>
      <BackHome
        src={global.logo.default}
        width={120}
        alt=""
        onClick={() => navigation.push('/')}
      />
    </Wrapper>
  )
}

export default NoMatch
