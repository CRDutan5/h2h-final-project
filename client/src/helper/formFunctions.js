export const handleLogin = async (
  e,
  formData,
  setErrorLogin,
  setUserData,
  setIsLoggedIn
) => {
  e.preventDefault();
  const { email, password } = formData;

  try {
    const request = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const res = await request.json();

    if (request.ok) {
      localStorage.setItem("token", res.token);

      const decoded = JSON.parse(atob(res.token.split(".")[1]));

      const userRequest = await fetch(
        `http://localhost:5000/api/auth/user/${decoded.userId}`,
        {
          headers: {
            Authorization: `Bearer ${res.token}`,
          },
        }
      );
      const userRes = await userRequest.json();

      if (userRequest.ok) {
        setUserData(userRes.user);
        setIsLoggedIn(true);
        return true;
      } else {
        console.error("Error fetching user data", userRes);
        setErrorLogin(true);
      }
    } else {
      console.error("Login failed", res);
      setErrorLogin(true);
    }
  } catch (error) {
    console.error("An error occurred while logging in:", error);
    setErrorLogin(true);
  }

  return false; // Return false if login fails
};

export function handleChange(e, setFormState) {
  setFormState((prevState) => ({
    ...prevState,
    [e.target.id]: e.target.value,
  }));
}
