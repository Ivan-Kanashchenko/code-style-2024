import { ThemeConfig } from "antd";

export const theme = {
  color: {
    brand: "#002E07",
    brandBackground: "#002E07",
    brandDisabled: "#002E07",
    borderLight: "#002E07",
    borderMedium: "#002E07",
    lightBlue: "#002E07",
    blue: "#002E07",
    yellow: "#002E07",
    red: "#002E07",
    white: "#002E07",
    black: "#002E07",
    error: "#002E07",
    failed: "#002E07",
    disabled: "#002E07",
    active: "#002E07",
    lightGreen: "#002E07",
    gray: "#002E07",
    darkGray: "#002E07",

    background: {
      primary: "#F5F5F5",
      gray: "#F5F5F5",
      brand: "#F5F5F5",
      lightgray: "#F5F5F5",
      neutral: "#F5F5F5",
      secondary: "#F5F5F5",
      secondary2: "#F5F5F5",
    },

    text: {
      primaty1: "#EFF7EE",
      primary2: "#EFF7EE",
      secondary: "#EFF7EE",
      tertiary: "#EFF7EE",
      disabled: "#EFF7EE",
    },
    status: {
      success: "#EFF7EE",
      warning: "#EFF7EE",
      neutral: "#EFF7EE",
      danger: "#EFF7EE",
    },
  },

  shadow: {
    table: "0px 0px 6px rgba(0, 0, 0, 0.12)",
    light: "0px 1px 4px rgba(0, 0, 0, 0.06)",
    bold: "0px 4px 32px rgba(0, 0, 0, 0.2)",
    none: "none",
  },

  borderRadius: {
    base: "8px",
  },

  fontSize: {
    base: "14px",
    md: "16px",
    heading: "28px",
    subheading: "20px",
    blockheading: "18px",
  },

  lineHeight: {
    base: "20px",
    md: "24px",
    subheading: "28px",
    heading: "32px",
  },

  fontWeight: {
    thin: 100,
    extralight: 200,
    light: 300,
    regular: 400,
    medium: 500,
    semiBold: 600,
    bold: 700,
    extraBold: 800,
    black: 900,
  },

  breakpoints: {
    xxl: "1440px",
    xl: "1280px",
    l: "1024px",
    ml: "991px",
    m: "768px",
    s: "512px",
    xs: "480px",
    desktop: "1440px",
    tabletLandscape: "1024px",
  },
};

export const config: ThemeConfig = {
  token: {
    colorLink: theme.color.brand,
    colorLinkActive: theme.color.brand,
    colorLinkHover: theme.color.brand,
    colorPrimary: theme.color.brand,
    colorPrimaryBg: theme.color.brand,
    colorInfo: theme.color.blue,
    fontSize: 16,
    colorPrimaryBorderHover: theme.color.brand,
    colorBorder: theme.color.borderMedium,
    colorBorderSecondary: theme.color.borderMedium,
    borderRadius: 8,
    colorErrorHover: theme.color.brand,
  },
  components: {
    Input: {
      activeShadow: "inset 0px 0px 0px 0.5px",
      errorActiveShadow: "inset 0px 0px 0px 0.5px #E13A2F",
      colorErrorBorderHover: "rgb(225, 58, 47)",
    },
    DatePicker: {
      activeShadow: "inset 0px 0px 0px 0.5px",
      errorActiveShadow: "inset 0px 0px 0px 0.5px #E13A2F",
      colorErrorBorderHover: "rgb(225, 58, 47)",
    },
    Select: {
      colorErrorBorderHover: "rgb(225, 58, 47)",
    },
  },
};
