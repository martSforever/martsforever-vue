import NoticeContainer from './a-notice-container'


const noticeContainers = {
  'start-start': NoticeContainer.newInstance({horizontal: 'start', vertical: 'start'}),
  'start-center': NoticeContainer.newInstance({horizontal: 'start', vertical: 'center'}),
  'start-end': NoticeContainer.newInstance({horizontal: 'start', vertical: 'end'}),
  'center-start': NoticeContainer.newInstance({horizontal: 'center', vertical: 'start'}),
  'center-center': NoticeContainer.newInstance({horizontal: 'center', vertical: 'center'}),
  'center-end': NoticeContainer.newInstance({horizontal: 'center', vertical: 'end'}),
  'end-start': NoticeContainer.newInstance({horizontal: 'end', vertical: 'start'}),
  'end-center': NoticeContainer.newInstance({horizontal: 'end', vertical: 'center'}),
  'end-end': NoticeContainer.newInstance({horizontal: 'end', vertical: 'end'}),
}

const DefaultNoticeOptions = {
  vertical: 'end',
  horizontal: 'end',
  type: 'info',
  message: 'this is notice message'
}

export default {
  info(options) {
    let o = Object.assign({}, DefaultNoticeOptions, options)
    noticeContainers[`${o.horizontal}-${o.vertical}`].addNotice(o)
  },
}

