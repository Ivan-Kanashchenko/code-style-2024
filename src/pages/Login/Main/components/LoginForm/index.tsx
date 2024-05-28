// Lib
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
// Hooks
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { useNotification } from "hooks";
// Actions
import { setUser, userLogin } from "redux/slices";
// Selectors
import { isAuth } from "redux/selectors";
// Constants
import { sidebarMenuItems } from "consts";
// Helpers
import { resolver } from "./validation";
// Utils
import {
  apiAuthentication,
  firebaseAuthentication,
} from "utils/authentication";
import { errorHandler } from "utils/errorHandler";
import { token } from "utils/handleToken";
// Components
import { Checkbox, Input, PasswordInput } from "components/Form";
// Styles
import { Button } from "styled/Buttons";
import {
  Form,
  Heading,
  Title,
  TitlesContainer,
  InputsContainer,
} from "./styled";

interface LocationState {
  from?: {
    pathname?: string;
  };
}

export interface LoginFormTypes {
  email?: string;
  password?: string;
  rememberMe?: boolean;
}

export const LoginForm = () => {
  const isAuthorized = useAppSelector(isAuth);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { openNotification } = useNotification();

  const [isLoading, setIsLoading] = useState(false);

  //react-router-dom don`t have this interface
  const from =
    (location.state as LocationState)?.from?.pathname ||
    sidebarMenuItems.admin[0].path;

  useEffect(() => {
    if (!isAuthorized) return;

    const access = token.access.get();

    if (!access) return;

    navigate(from, { replace: true });
  }, []);

  const { handleSubmit, control } = useForm<LoginFormTypes>({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    resolver,
  });

  const onSubmit: SubmitHandler<LoginFormTypes> = async ({
    email,
    password,
    rememberMe,
  }) => {
    setIsLoading(true);

    try {
      const { idToken } = await firebaseAuthentication({
        email,
        password,
      });

      if (idToken) {
        const { accessToken, refreshToken, user } = await apiAuthentication(
          idToken,
        );

        token.access.set(
          accessToken,
          rememberMe ? "localStorage" : "sessionStorage",
        );
        token.refresh.set(
          refreshToken,
          rememberMe ? "localStorage" : "sessionStorage",
        );

        dispatch(setUser(user));
        dispatch(userLogin());

        navigate(from, { replace: true });
      }
    } catch (error) {
      errorHandler({ error, openNotification });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <TitlesContainer>
        <Heading>Login</Heading>

        <Title>Please login to your account</Title>
      </TitlesContainer>

      <InputsContainer>
        <Controller
          name={"email"}
          control={control}
          render={({ field, fieldState }) => (
            <Input
              label="Username or email"
              disabled={isLoading}
              {...field}
              fieldState={fieldState}
            />
          )}
        />

        <Controller
          name={"password"}
          control={control}
          render={({ field, fieldState }) => (
            <PasswordInput
              label="Password"
              disabled={isLoading}
              {...field}
              fieldState={fieldState}
            />
          )}
        />
      </InputsContainer>

      <Controller
        name={"rememberMe"}
        control={control}
        render={({ field }) => (
          <Checkbox
            label="Keep me logged in"
            {...field}
            disabled={isLoading}
            checked={field.value}
            onChange={e => field.onChange(e.target.checked)}
          />
        )}
      />

      <Button.Login type="primary" htmlType="submit" loading={isLoading}>
        Log in
      </Button.Login>
    </Form>
  );
};
