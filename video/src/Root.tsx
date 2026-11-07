import { Composition, Still } from 'remotion'
import { DURATION, FPS, LiveReel } from './LiveReel'
import { StoryCta, StoryLive, StoryProcess, StoryServices } from './Stories'

const story = { width: 1080, height: 1920 }

export const RemotionRoot = () => (
  <>
    <Composition id="LiveReel" component={LiveReel} durationInFrames={DURATION} fps={FPS} {...story} />
    <Still id="Story1Live" component={StoryLive} {...story} />
    <Still id="Story2Process" component={StoryProcess} {...story} />
    <Still id="Story3Services" component={StoryServices} {...story} />
    <Still id="Story4Cta" component={StoryCta} {...story} />
  </>
)
