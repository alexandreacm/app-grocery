import React, { useRef } from 'react';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';

import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Label, Button, TextInput } from '@/components';

import useAuth from '@/hooks/useAuth';

import colors from '@/config/colors';

import StatusBarColor from '@/config/StatusBarColor';

import { StyledContainer as StyledMainContainer } from '@/helpers/commonStyles';

const validation = yup.object().shape({
  username: yup
    .string()
    .required('Você deve preencher o campo usuário.')
    .test(
      'leadingTrailingSpaces',
      'O campo usuário contém espaços em branco',
      value => {
        const spaceRegex = /[\s\uFEFF\xA0]/;
        return !spaceRegex.test(value);
      }
    ),
  password: yup
    .string()
    .required('Você deve preencher o campo senha.')
    .min(6, 'Sua senha precisa conter no mínimo 6 caracteres.')
    .test(
      'leadingTrailingSpaces',
      'O campo senha contém espaços em branco',
      value => {
        const spaceRegex = /[\s\uFEFF\xA0]/;
        return !spaceRegex.test(value);
      }
    )
});

const logo = require('../../assets/images/logo_super.jpg');

const SignIn = () => {
  const { signIn, isLoading, errorMessage, hasError } = useAuth();

  const passwordRef = useRef(null);
  const { navigate } = useNavigation();

  const { control, handleSubmit, errors } = useForm({
    resolver: yupResolver(validation)
  });

  const handleRecoveryPassword = () => {
    navigate('recovery-password');
  };

  const onHandleSubmit = data => {
    const { username, password } = data;
    signIn({ username, password });
  };

  const handleUsernameSubmit = () => passwordRef.current?.focus();

  return (
    <>
      <StatusBarColor
        backgroundColor={colors.WHITE}
        isPrimaryColorDark={false}
      />

      <StyledMainContainer
        justifyContent='center'
        paddingLeft={16}
        paddingRight={16}
        backgroundColor={colors.WHITE}
      >
        <StyledContainer>
          <StyledImage source={logo} width={50} height={50} />

          <Controller
            control={control}
            name='username'
            defaultValue=''
            render={({ onChange, value }) => (
              <TextInput
                returnKeyType='next'
                keyboardType='email-address'
                onSubmitEditing={handleUsernameSubmit}
                autoCompleteType='email'
                width='100%'
                label='Usuário'
                value={value}
                onChangeText={onChange}
                marginBottom={16}
                hasError={hasError}
              />
            )}
          />

          <Controller
            control={control}
            name='password'
            defaultValue=''
            render={({ onChange, value }) => (
              <TextInput
                onSubmitEditing={handleSubmit(onHandleSubmit)}
                forwardRef={passwordRef}
                width='100%'
                label='Senha'
                value={value}
                onChangeText={onChange}
                marginBottom={16}
                hasError={hasError}
                secureTextEntry
              />
            )}
          />

          {!errorMessage && Object.keys(errors).length > 0 ? (
            <Label
              textAlign='left'
              fontWeight={400}
              fontSize={12}
              color={colors.DANGER}
            >
              {errors?.username?.message || errors?.password?.message}
            </Label>
          ) : (
            <Label
              textAlign='left'
              width='100%'
              fontWeight={400}
              fontSize={12}
              marginBottom={8}
              color={colors.DANGER}
            >
              {errorMessage}
            </Label>
          )}

          <Button isLoading={isLoading} onPress={handleSubmit(onHandleSubmit)}>
            <Label color={colors.WHITE}>Acessar</Label>
          </Button>
          <StyledForgotPasswordButton onPress={handleRecoveryPassword}>
            <Label fontSize={12} fontWeight={400}>
              Esqueceu a senha?
            </Label>
          </StyledForgotPasswordButton>
        </StyledContainer>
      </StyledMainContainer>
    </>
  );
};

export const StyledImage = styled.Image`
  width: 100px;
  height: 100px;
  margin-bottom: 30px;
`;

export const StyledContainer = styled.View`
  flex: 1;
  background-color: ${colors.WHITE};
  justify-content: center;
  align-items: center;
`;

export const StyledForgotPasswordButton = styled.TouchableOpacity`
  margin-top: 32px;
`;

export default SignIn;
