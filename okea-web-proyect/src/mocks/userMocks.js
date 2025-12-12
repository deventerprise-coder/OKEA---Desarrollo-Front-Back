// src/mocks/userMocks.js
export const emptyUser = {
  id: null,
  name: "",
  email: "",
  avatarUrl: "",
};

export function createUserFromLogin({ email, name }) {
  const safeEmail = email || "usuario@okea.com";
  const safeName = name || safeEmail.split("@")[0] || "Usuario OKEA";

  return {
    id: 1,
    name: safeName,
    email: safeEmail,
    avatarUrl: "", // luego lo usaremos para la foto
  };
}