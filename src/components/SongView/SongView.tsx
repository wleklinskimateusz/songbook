import React, { FC } from 'react'
import {songs} from '../../data'
import { Container, Title } from './styles';

interface SongViewProps {
    song: number;
}

export const SongView:FC<SongViewProps> = ({song}) => {
  return (
    <Container>
        <Title>{songs[song].title}</Title>
    </Container>
  )
}
