import { Layout } from "shared/components"
import { INTRODUCTION } from "shared/constants"
import BlogsRightSection from "views/Blogs/BlogsRightSection"

export const About =  () => {

  return <Layout
    isAboutPage
    isEditable={false}
    title={"Đôi dòng về bản thân:"}
    imgUrl="https://s.w.org/images/core/emoji/14.0.0/svg/270d-1f3fc.svg"
    introduction={INTRODUCTION}
    rightContent={<BlogsRightSection />}
  >
    <p className="blogt-text">
      
    </p>
  </Layout>
}