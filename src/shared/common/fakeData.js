import { BLOG_TYPE } from "shared/constants"

const blogA = {
  id: '123',
  title: 'Chuyến đi cuối năm',
  category: BLOG_TYPE.Trips,
  date: 1674838800000,
  coverImage: 'tadung.jpg',
  preview: `Chuyến đi Dak Nong - Lâm Đồng - Đà Lạt thực sự là một trong những trải nghiệm phượt thú vị và để lại cho tôi rất nhiều cảm xúc tích cực.
  Tôi đã ấp ủ chuyến đi Tà Đùng từ rất lâu, nhưng dịp giáng sinh vừa rồi mới có cơ hội để thực hiện hoá nó với cô bạn gái mới quen. Ở thời điểm 
  mà người người nhà nhà tề tựu bên những cây thông Noel thì tôi và bạn gái lại chọn...đi phượt rừng núi.
  Chúng tôi chẳng lên kế hoạch gì tỉ mỉ chi tiết, cứ thế tới 2 ngày trước khi đi tôi mới vội vàng đặt phòng homestay, quần áo cũng trước ngày đi mới giặt kịp khô.
  Hẹn nhau khởi hành lúc 4h sáng nhưng thực tế thì 4h30 tôi mới lọ mọ ra khỏi nhà để qua đón bạn gái, vì cũng là chuyến đi chơi xa đầu tiên nên cả em và tôi đều rất hứng khởi.
  Sài Gòn mấy ngày cuối năm có chút lạnh lạnh, chúng tôi khởi hành lúc 5h hơn men theo quốc lộ 17 đi Dak Nong...`
}

const blogB = {
  id: '456',
  title: 'Chuyện cai nghiện mạng xã hội',
  category: BLOG_TYPE.Chronicle,
  date: 1676713534098,
  coverImage: 'socials.png',
  preview: `Tôi đã nhận thấy từ lâu việc mạng xã hội thực sự lấy đi rất nhiều thời gian trong ngày, và chuyện mà chúng ta bắt đầu một điểm "mở" để sa vào
  việc nhìn chằm vào điện thoại suốt một lúc lâu là chuyện rất dễ xảy ra, nó làm ngắt quãng sự tập trung vốn có cho công việc và phần nào đó triệt tiêu khá nhiều năng lượng của bản thân.
  Tôi đã nghe đâu đó là một câu tiếng Anh mà dịch nôm na nó ra nghĩa là "Sự phân tâm là thuốc độc ảnh hưởng tới thành công", chỉ vậy thôi, rất ngắn gọn, và rất đúng, ít nhất là với bản thân tôi.
  "Đóng góp" phần lớn vào sự phân tâm đó của tôi có lẽ là mạng xã hội...`
}

const blogC = {
  id: '789',
  title: 'Chuyện những người đồng nghiệp',
  category: BLOG_TYPE.PointOfView,
  date: 1676713534098,
  coverImage: 'co-workers.JPG',
  preview: `Năm vừa qua đúng là một năm đầy những thay đổi trong công việc, tôi rời một dự án đã gắn bó với mình từ những ngày đầu vào công ty để qua một team mới mà ở đó hầu như tôi không quen biết ai...`
}

const blogD = {
  id: '123435534',
  title: 'Valentine "đặc biệt"',
  category: BLOG_TYPE.Chronicle,
  date: 1676713534098,
  coverImage: '',
  preview: `Tôi viết vài dòng để lưu lại một trong những ngày có nhiều điều đáng yêu và đáng nhớ trong cuộc đời. Vào lại Sài Gòn sau Tết, nhiệt đồ môi trường thay đổi có lẽ làm tôi bị cảm cúm, không may thay,
  đúng ngày lễ Tình Nhân, cơn sốt lại không có dấu hiệu giảm bớt mà còn nặng hơn.
  `
}

export const blogs = [blogA, blogB, blogC]

