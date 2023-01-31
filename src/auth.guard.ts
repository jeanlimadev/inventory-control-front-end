export default function AuthGuard(to: any, from: any, next: any) {
  const token = getCookie("token");

  if (token) {
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
