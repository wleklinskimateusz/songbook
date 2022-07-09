import React, { FC } from 'react'
import {songs} from '../../data'
import { Container, Lyrics, Title } from './styles';

interface SongViewProps {
    song: number;
}

export const SongView:FC<SongViewProps> = ({song}) => {
  const currentSong = songs[song]
  return (
    <Container>
        <Title>{currentSong.title}</Title>
        <Lyrics>{currentSong.lyrics}</Lyrics>
    </Container>
  )
}
