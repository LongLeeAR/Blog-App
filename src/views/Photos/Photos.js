import React from 'react';
import {Layout} from 'shared/components';

const Photos = () => {
  return (
    <Layout
      title="Photos"
      imgUrl="https://s.w.org/images/core/emoji/14.0.0/svg/1f4f7.svg"
      introduction="Một số ảnh của tôi ở trên instagram:"
    >
      <div loading="lazy" data-mc-src="e0bf7b07-e9b8-4092-a43b-c0a42e0bccef#null"></div>
    </Layout>
  )
}

export default Photos;
