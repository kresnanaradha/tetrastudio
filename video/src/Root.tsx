import { Composition } from 'remotion'
import { DURATION, FPS, LiveReel } from './LiveReel'

export const RemotionRoot = () => (
  <Composition id="LiveReel" component={LiveReel} durationInFrames={DURATION} fps={FPS} width={1080} height={1920} />
)
