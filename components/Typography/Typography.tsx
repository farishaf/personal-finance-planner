import { useMemo } from "react";
import styled from "styled-components";
import {
  breakpoints, types, xxlSize, xlSize, lgSize, mdSize, smSize, xsSize,
} from "./sizing";

interface TypographyProps {
  type: string;
  color?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

interface TypographySizeProps {
    xxl: string;
    xl: string;
    lg: string;
    md: string;
    sm: string;
    xs: string;
}

interface StyledTextProps {
    family: TypographySizeProps;
    weight: TypographySizeProps;
    size: TypographySizeProps;
    lineheight: TypographySizeProps;
    letterSpacing: TypographySizeProps;
}

const StyledText = styled.span<StyledTextProps>`
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  outline: none;
  color: ${(props) => (props.color ? props.color : "inherit")};

  font-family: ${(props) => props.family.xxl}, "sans-serif";
  font-size: ${(props) => props.size.xxl};
  font-weight: ${(props) => props.weight.xxl};
  line-height: ${(props) => props.lineheight.xxl};
  letter-spacing: ${(props) => props.letterSpacing.xxl};

  @media screen and (max-width: ${breakpoints.xl}) {
    font-family: ${(props) => props.family.xl}, "sans-serif";
    font-size: ${(props) => props.size.xl};
    font-weight: ${(props) => props.weight.xl};
    line-height: ${(props) => props.lineheight.xl};
    letter-spacing: ${(props) => props.letterSpacing.xl};
  }

  @media screen and (max-width: ${breakpoints.lg}) {
    font-family: ${(props) => props.family.lg}, "sans-serif";
    font-size: ${(props) => props.size.lg};
    font-weight: ${(props) => props.weight.lg};
    line-height: ${(props) => props.lineheight.lg};
    letter-spacing: ${(props) => props.letterSpacing.lg};
  }

  @media screen and (max-width: ${breakpoints.md}) {
    font-family: ${(props) => props.family.md}, "sans-serif";
    font-size: ${(props) => props.size.md};
    font-weight: ${(props) => props.weight.md};
    line-height: ${(props) => props.lineheight.md};
    letter-spacing: ${(props) => props.letterSpacing.md};
  }

  @media screen and (max-width: ${breakpoints.sm}) {
    font-family: ${(props) => props.family.sm}, "sans-serif";
    font-size: ${(props) => props.size.sm};
    font-weight: ${(props) => props.weight.sm};
    line-height: ${(props) => props.lineheight.sm};
    letter-spacing: ${(props) => props.letterSpacing.sm};
  }

  @media screen and (max-width: ${breakpoints.xs}) {
    font-family: ${(props) => props.family.xs}, "sans-serif";
    font-size: ${(props) => props.size.xs};
    font-weight: ${(props) => props.weight.xs};
    line-height: ${(props) => props.lineheight.xs};
    letter-spacing: ${(props) => props.letterSpacing.xs};
  }
`;

const Typography = ({
  type: typeProp = "body-lg",
  color = "inherit",
  style,
  children,
}: TypographyProps) => {
  const type = types.includes(typeProp) ? typeProp : "body-lg";

  const family = useMemo(() => ({
      xxl: xxlSize[type].family,
      xl: xlSize[type].family,
      lg: lgSize[type].family,
      md: mdSize[type].family,
      sm: smSize[type].family,
      xs: xsSize[type].family,
    }), [type]);

    const weight = useMemo(() => ({
      xxl: xxlSize[type].weight,
      xl: xlSize[type].weight,
      lg: lgSize[type].weight,
      md: mdSize[type].weight,
      sm: smSize[type].weight,
      xs: xsSize[type].weight,
    }), [type]);

  const size = useMemo(() => ({
      xxl: xxlSize[type].size,
      xl: xlSize[type].size,
      lg: lgSize[type].size,
      md: mdSize[type].size,
      sm: smSize[type].size,
      xs: xsSize[type].size,
    }), [type]);

  const lineHeight = useMemo(() => ({
      xxl: xxlSize[type].lineHeight,
      xl: xlSize[type].lineHeight,
      lg: lgSize[type].lineHeight,
      md: mdSize[type].lineHeight,
      sm: smSize[type].lineHeight,
      xs: xsSize[type].lineHeight,
    }), [type]);

  const letterSpacing = useMemo(() => ({
      xxl: xxlSize[type].letterSpacing,
      xl: xlSize[type].letterSpacing,
      lg: lgSize[type].letterSpacing,
      md: mdSize[type].letterSpacing,
      sm: smSize[type].letterSpacing,
      xs: xsSize[type].letterSpacing,
    }), [type]);

  return (
    <StyledText
      size={size}
      family={family}
      weight={weight}
      lineheight={lineHeight}
      letterSpacing={letterSpacing}
      color={color}
      style={style}
    >
      {children}
    </StyledText>
  );
};

export default Typography;
