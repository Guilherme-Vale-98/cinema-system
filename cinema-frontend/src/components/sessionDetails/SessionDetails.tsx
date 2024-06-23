import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { RootState } from '../../redux/store';


type Props = {}

const SessionDetails = (props: Props) => {
    const {movieTitle,sessionId} = useParams<{movieTitle:string, sessionId: string}>();

  return (
    <div>SessionDetails:{movieTitle}: {sessionId}</div>
  )
}

export default SessionDetails