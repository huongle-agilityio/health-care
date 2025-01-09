// Types
import { ListInfo } from '@/types';

// Utils
import { formatUserInfo } from '..';

describe('formatUserInfo', () => {
  it('Should format user information into ListInfo array', () => {
    const userInfo = {
      name: 'John Doe',
      phone: '123-456-7890',
      email: 'john.doe@example.com',
    };

    const expectedOutput: ListInfo[] = [
      {
        title: 'Name',
        value: 'John Doe',
      },
      {
        title: 'Phone',
        value: '123-456-7890',
      },
      {
        title: 'Email',
        value: 'john.doe@example.com',
      },
    ];

    expect(formatUserInfo(userInfo)).toEqual(expectedOutput);
  });

  it('Should return an empty array if no user information', () => {
    const userInfo = {
      name: '',
      phone: '',
      email: '',
    };

    const expectedOutput: ListInfo[] = [
      {
        title: 'Name',
        value: '',
      },
      {
        title: 'Phone',
        value: '',
      },
      {
        title: 'Email',
        value: '',
      },
    ];

    expect(formatUserInfo(userInfo)).toEqual(expectedOutput);
  });

  it('Should return an array with value empty with which field do not have value', () => {
    const userInfo = {
      name: 'Jane Doe',
      phone: '',
      email: 'jane.doe@example.com',
    };

    const expectedOutput: ListInfo[] = [
      {
        title: 'Name',
        value: 'Jane Doe',
      },
      {
        title: 'Phone',
        value: '',
      },
      {
        title: 'Email',
        value: 'jane.doe@example.com',
      },
    ];

    expect(formatUserInfo(userInfo)).toEqual(expectedOutput);
  });
});
