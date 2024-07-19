import { Heading, Text, View, useTheme } from '@aws-amplify/ui-react'

import type { AuthenticatorProps } from '@aws-amplify/ui-react'

export const components: AuthenticatorProps['components'] = {
  Header() {
    return <View marginTop="30%" />
  },

  SignIn: {
    Header() {
      const { tokens } = useTheme()

      return (
        <Heading level={3} textAlign="center">
          <Text paddingTop={tokens.space.xxl} fontWeight="bold" fontSize="2rem" color="#1C3880">
            名入れ丸ごとサポート
          </Text>
        </Heading>
      )
    }
  }
}

export const formFields: AuthenticatorProps['formFields'] = {
  signIn: {
    username: {
      placeholder: 'メールアドレスを入力してください',
      label: 'ユーザーID'
    },
    password: {
      placeholder: 'パスワードを入力してください',
      label: 'パスワード'
    }
  },
  resetPassword: {
    username: {
      placeholder: 'メールアドレスを入力してください'
    }
  }
}

export const vocabularies = {
  ja: {
    Username: 'ユーザーID',
    Password: 'パスワード',
    Submit: '送信',
    Code: 'コード',
    'Sign in': 'ログイン',
    'Code *': 'コード *',
    'New Password': '新しいパスワード',
    'Change Password': 'パスワードを変更',
    'Confirm Password': '新しいパスワード(確認用)',
    'Back to Sign In': 'ログイン画面に戻る',
    'Send code': 'コードを送信',
    'Resend Code': 'コードを再送',
    'Enter your username': 'ユーザー名を入力してください',
    'Enter your password': 'パスワードを入力してください',
    'Enter your Password': 'パスワードを入力してください',
    'Please confirm your Password': 'パスワードを再度入力してください',
    'Password does not conform to policy: Password must satisfy regular expression pattern: ^\\S.*\\S$':
      'パスワードは半角英数字6文字以上（英字のみ不可、数字のみ可）で入力してください',
    'Password does not conform to policy: Password not long enough':
      'パスワードは半角英数字6文字以上（英字のみ不可、数字のみ可）で入力してください',
    'Forgot your password?': 'パスワードをお忘れですか？',
    'Reset Password': 'パスワードをリセット',
    'User does not exist.': 'ユーザーが存在しません',
    'User already exists.': 'ユーザーは既に存在します',
    'Incorrect username or password.': 'ユーザー名またはパスワードが違います',
    'Invalid password format': 'パスワードのフォーマットが不正です',
    'CUSTOM_AUTH is not enabled for the client.': '入力値が不正です',
    'Username cannot be empty': 'ユーザー名は必須です',
    'Username/client id combination not found.': 'ユーザー名が存在しません',
    'Attempt limit exceeded, please try after some time.': '試行回数が超過しました。しばらくしてから再度お試しください',
    'Your passwords must match': 'パスワードが一致しません',
    'Invalid verification code provided, please try again.': 'コードが不正です。再度お試しください'
  }
}
