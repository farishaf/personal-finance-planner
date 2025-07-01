import { colors } from '@/utils/color';
import React from 'react'
import Typography from './Typography/Typography';

const LandingSideSection = () => {
  return (
      <>
        <div
          style={{
            fontSize: "24px",
            fontWeight: "600",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "32px",
              height: "32px",
              backgroundColor: colors.light.fade,
              color: colors.dark.primary,
              borderRadius: "8px",
              fontWeight: "bold",
            }}
          >
            <Typography type="title-md">
              $
            </Typography>
          </span>
          <Typography type="title-lg">
            Personal Finance Planner
          </Typography>
        </div>
        <Typography type="body-lg">
          <blockquote
            style={{
              fontStyle: "italic",
              maxWidth: "80%",
              borderLeft: `3px solid ${colors.orange.primary}`,
              paddingLeft: "20px",
              margin: "40px 0",
            }}
          >
            &quot;Take control of your financial future with our comprehensive planning
            tools. Your journey to financial freedom starts here.&quot;
            <br />
            <cite
              style={{
                display: "block",
                marginTop: "12px",
                fontWeight: "500",
                fontStyle: "normal",
                color: colors.dark.fade,
              }}
            >
              — Financial Times
            </cite>
          </blockquote>
        </Typography>
        <div style={{ fontSize: "14px", color: colors.dark.fade }}>
          © {new Date().getFullYear()} Personal Finance Planner. All rights reserved.
        </div>
      </>
  )
}

export default LandingSideSection;