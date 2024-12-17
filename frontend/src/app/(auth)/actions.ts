'use server';

interface LoginResponse {
  token: string;
  type: string;
  username: string;
  roles: string[];
}

interface ErrorResponse {
  status: string;
  message: string;
  errors: string[];
  timestamp: string;
}

export const signIn = async (
  prevState: { message: string; errors: string[] },
  formData: FormData
) => {
  const payload = {
    username: formData.get('username'),
    password: formData.get('password'),
  };

  const resp = await fetch('http://localhost:8080/v1/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!resp.ok) {
    const data = (await resp.json()) as ErrorResponse;

    return {
      message: data.message,
      errors: data.errors,
    };
  }

  const data = (await resp.json()) as LoginResponse;

  return {
    message: '',
    errors: [],
  };
};
