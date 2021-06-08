export interface TokenType {
  admin: { token: string }
  editor: { token: string }
}

export interface UserInfo {
  roles: string | string[]
  introduction: string
  avatar: string
  name: string
}

export interface UserType {
  'admin-token': UserInfo
  'editor-token': UserInfo
}

export const tokens: TokenType = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
}

export const users: UserType = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  }
}
