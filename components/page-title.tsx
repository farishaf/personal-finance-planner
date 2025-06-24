import React from 'react'
import Typography from './Typography/Typography';

interface PageTitleProps {
    title: string;
    subTitle: string;
}
const PageTitle = ({title, subTitle}: PageTitleProps) => {
  return (
    <div
        style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "start",
        }}
    >
        <Typography type="title-2xl">{title}</Typography>
        <Typography type="body-lg" color="#666666">{subTitle}</Typography>
    </div>
  )
}

export default PageTitle;