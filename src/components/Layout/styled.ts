// Lib
import styled from "styled-components";
import { Layout } from "antd";

const { Content } = Layout;

export const Wrapper = styled(Layout)`
  min-height: 100vh;
  background-color: transparent;
`;

export const AntDLayout = styled(Layout)`
  background-color: transparent;
`;

export const ContentContainer = styled(Content)`
  padding: 32px;
  min-height: calc(100vh-64px);
  position: relative;
`;
