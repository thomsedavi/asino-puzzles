import React from 'react';
import styled from 'styled-components';

interface IconProps {
  title: string;
  type?: 'switch' | 'pencil' | 'up' | 'down' | 'create' | 'delete' | 'selected' | 'unselected';
  fillPrimary?: '--background-color' | '--color' | '--accent' | '--opposite';
  fillSecondary?: '--background-color' | '--color' | '--accent' | '--opposite';
}

export const Icon = (props: IconProps): JSX.Element => {
  return <span title={props.title}><Svg viewBox="0 0 100 100"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              xmlSpace="preserve" >
    {props.type === 'switch' && <>
      <Path fill={props.fillPrimary ?? '--color'} d="M15,35L15,25C15,14,24,5,35,5L65,5C76,5,85,14,85,25L85,35L100,35L75,60L50,35L65,35L65,25L35,25L35,35Z" />
      <Path fill={props.fillPrimary ?? '--color'} d="M85,65L85,75C85,86,76,95,65,95L35,95C24,95,15,84,15,75L15,65L0,65L25,40L50,65L35,65L35,75L65,75L65,65Z" />
    </>}
    {props.type === 'pencil' && <>
      <Path fill={props.fillPrimary ?? '--color'} d="M35,90L100,90L100,100L10,100Z" />
      <Path fill={props.fillPrimary ?? '--color'} d="M80,10L90,20L30,80L20,70Z" />
      <Path fill={props.fillSecondary ?? '--color'} d="M15,75L25,85L0,100Z" />
      <Path fill={props.fillSecondary ?? '--color'} d="M90,0L100,10L95,15L85,5Z" />
    </>}
    {props.type === 'up' && <>
      <Path fill={props.fillPrimary ?? '--color'} d="M50,35L80,65L20,65Z" />
    </>}
    {props.type === 'down' && <>
      <Path fill={props.fillPrimary ?? '--color'} d="M20,35L80,35L50,65Z" />
    </>}
    {props.type === 'create' && <>
      <Path fill={props.fillPrimary ?? '--color'} d="M40,0L60,0L60,40L100,40L100,60L60,60L60,100L40,100L40,60L0,60L0,40L40,40Z" />
    </>}
    {props.type === 'delete' && <>
      <Path fill={props.fillPrimary ?? '--color'} d="M0,40L20,40L30,100L20,100Z" />
      <Path fill={props.fillPrimary ?? '--color'} d="M30,40L70,40L60,100L40,100Z" />
      <Path fill={props.fillPrimary ?? '--color'} d="M80,40L100,40L80,100L70,100Z" />
      <Path fill={props.fillSecondary ?? '--color'} d="M30,0L70,0L80,20L100,20L100,30L0,30L0,20L20,20Z" />
    </>}
    {props.type === 'selected' && <>
      <Circle fill={props.fillPrimary ?? '--color'} stroke={props.fillPrimary ?? '--color'} cx="50" cy="50" r="50" strokeWidth={10} />
    </>}
    {props.type === 'unselected' && <>
      <Circle fill="--background-color" stroke={props.fillPrimary ?? '--color'} cx="50" cy="50" r="50" strokeWidth={10} />
    </>}
  </Svg></span>;
}

const Svg = styled.svg`
  overflow: visible;
  height: 1em;
  width: 1em;
  position: relative;
  top: 0.1em;
`;

interface PathProps {
  fill?: '--background-color' | '--color' | '--accent' | '--opposite';
  stroke?: '--background-color' | '--color' | '--accent' | '--opposite';
}

const Path = styled.path<PathProps>`
  fill: var(${props => props.fill});
  stroke: var(${props => props.stroke});
`;

const Circle = styled.circle<PathProps>`
  fill: var(${props => props.fill});
  stroke: var(${props => props.stroke});
`;
