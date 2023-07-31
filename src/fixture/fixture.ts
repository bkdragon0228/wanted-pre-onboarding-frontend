import { Todos } from '../hook/useTodos';

export const initalFormSetting = {
  initialValues: {
    email: '',
    password: '',
  },
  validations: {
    email: {
      required: {
        value: true,
        message: '입력해주세요.',
      },
      pattern: {
        value:
          '^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$',
        message: '이메일 형식에 맞게 작성해주세요.',
      },
    },
    password: {
      required: {
        value: true,
        message: '입력해주세요.',
      },
      custom: {
        isValid: (password: string) => password.length >= 8,
        message: '비밀번호는 8자리 이상으로 작성해주세요.',
      },
    },
  },
};

export const sampleTodos: Todos = [
  { id: 1, todo: '자기', isCompleted: false, userId: 1 },
  { id: 1, todo: '일어나기', isCompleted: false, userId: 1 },
];
