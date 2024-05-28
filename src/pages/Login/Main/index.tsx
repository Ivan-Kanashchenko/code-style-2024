// Components
import { LoginForm } from "./components";
// Styled
import { ContentContainer, PageWrapper } from "./styled";

export const Login = () => {
  return (
    <PageWrapper>
      <ContentContainer>
        <LoginForm />
      </ContentContainer>
    </PageWrapper>
  );
};
