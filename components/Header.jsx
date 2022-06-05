import React from 'react';

import Image from '/voxeliface/components/Image';
import DefaultHeader from '/voxeliface/components/Header';
export default function Header(props) {
    return (
        <DefaultHeader brand={<>
            {props.image ??
                <Image
                    src="/img/banners/brand_text.svg"
                    width={192}
                    height={48}
                />
            }
        </>} {...props}/>
    );
};