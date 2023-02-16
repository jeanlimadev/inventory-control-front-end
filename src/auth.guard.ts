export default async function AuthGuard(to: any, from: any, next: any) {
  const token = getCookie("token");

  const tokenIsValid = await fetch(
    `${import.meta.env.VITE_API_URL}/users/verify-token`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  ).then((response) => response.status === 200);

  if (token && tokenIsValid) {
    next();
  } else {
    next({
      path: "/login",
      query: { redirect: to.fullPath },
    });
  }
}

function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()!.split(";").shift();
}
