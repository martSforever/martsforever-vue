import NoticeContainer from './a-notice-container'

const noticeContainers = {}

const DefaultNoticeOptions = {
  vertical: 'end',
  horizontal: 'end',
  type: 'info',
  message: 'this is notice message'
}

export default {
  info(options) {
    let o = Object.assign({}, DefaultNoticeOptions, options)
    let noticeContainer = noticeContainers[`${o.horizontal}-${o.vertical}`]
    if (!noticeContainer) {
      noticeContainer = NoticeContainer.newInstance({horizontal: o.horizontal, vertical: o.vertical})
      noticeContainers[`${o.horizontal}-${o.vertical}`] = noticeContainer
    }
    return noticeContainer.addNotice(o)
  },
}

