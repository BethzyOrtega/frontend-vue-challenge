export default defineNuxtRouteMiddleware((to) => {
   const auth = useCookie("auth");

    if (to.path === "/") {
    return navigateTo("/login");
  }

  const publicRoutes = [
    "/",
    "/login",
    "/onboarding",
    "/onboarding/success",
  ];

  const isPublic = publicRoutes.includes(to.path);

  if (auth.value && to.path === "/login") {
    return navigateTo("/onboarding");
  }

  if (!auth.value && !isPublic) {
    return navigateTo("/login");
  }
});