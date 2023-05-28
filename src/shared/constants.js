import CheckList from '@editorjs/checklist'
import Code from '@editorjs/code'
import Delimiter from '@editorjs/delimiter'
import Embed from '@editorjs/embed'
import Header from '@editorjs/header'
import InlineCode from '@editorjs/inline-code'
import LinkTool from '@editorjs/link'
import List from '@editorjs/list'
import Marker from '@editorjs/marker'
import Quote from '@editorjs/quote'
import Raw from '@editorjs/raw'
import SimpleImage from '@editorjs/simple-image'
import Table from '@editorjs/table'
import Warning from '@editorjs/warning'
import Paragraph from 'editorjs-paragraph-with-alignment'

export const BLOG_TYPE = {
  Chronicle: 'ky-su',
  JobExperience: 'kinh-nghiem-cong-viec',
  PointOfView: 'goc-nhin',
  Trips: 'nhung-chuyen-di'
}

export const BLOG_TYPE_NAME_MAP = {
  [BLOG_TYPE.Chronicle]: 'Ký sự',
  [BLOG_TYPE.JobExperience]: 'Kinh nghiệm công việc',
  [BLOG_TYPE.PointOfView]: 'Góc nhìn',
  [BLOG_TYPE.Trips]: 'Những chuyến đi'
}

export const INTRODUCTION_BLOG_TYPE_MAP = {
  [BLOG_TYPE.Chronicle]: 'Ký sự là nơi tôi ghi lại những suy nghĩ thường nhật:',
  [BLOG_TYPE.JobExperience]: 'Đây là nơi tôi ghi chú lại những kinh nghiệm trong công việc, những kiến thức mà tôi muốn viết ra để "học" và "nhớ"',
  [BLOG_TYPE.PointOfView]: 'Góc nhìn của tôi về mọi thứ trên đời:',
  [BLOG_TYPE.Trips]: 'Nơi tôi chia sẻ những khoảnh khắc đáng nhớ, những câu chuyện thú vị trong những chuyến đi chơi:'
}

export const INTRODUCTION = `Tôi là Lê Hải Long, Senior Front-end Developer với khoảng 4 năm kinh nghiệm. Tôi yêu thích việc tạo ra những trang web đẹp mắt với UI/UX thuận tiện cho người sử dụng.
Tôi chủ yếu làm việc với Reactjs cùng những libraries xoay quanh nó, tuy nhiên, tôi cũng có thể làm và đang học thêm về back-end để hướng bản thân đi theo hướng full-stack. Ngoài coding, tôi thích chơi thể thao, nghe nhạc, chụp ảnh và đi du lịch trải nghiệm.
Dưới đây là CV tôi đính kèm, có chi tiết hơn về kinh nghiệm làm việc và những dự án tôi đã từng tham gia:`

export const BLOGS_INTRODUCTION = 'Tạp bút là nơi tôi viết về mọi thứ, chú yếu là những suy nghĩ, chia sẻ hoặc có thể là những "ghi chú" mà tôi muốn lưu lại:'

export const DEFAULT_BLOG_TITLE = "Tạp bút"

export const OWNER_EMAIL = 'longhaile.ar@gmail.com';

export const BlogsRef = '/blogs/tap-but';


export const EDITOR_JS_TOOLS = {
  embed: Embed,
  paragraph: {
    class: Paragraph,
    inlineToolbar: true,
  },
  table: Table,
  list: List,
  warning: Warning,
  code: Code,
  linkTool: LinkTool,
  raw: Raw,
  header: Header,
  quote: Quote,
  marker: Marker,
  checklist: CheckList,
  delimiter: Delimiter,
  inlineCode: InlineCode,
  simpleImage: SimpleImage,
}
