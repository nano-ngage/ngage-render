export const USER = 'SETUSER';

export function setUser(user) {
  return {
    type: USER,
    user: user
  };
}
