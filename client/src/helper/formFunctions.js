export function handleChange(e, setFormState) {
  setFormState((prevState) => ({
    ...prevState,
    [e.target.id]: e.target.value,
  }));
}

export function handleLogout(setIsLoggedIn) {
  setIsLoggedIn(false);
  localStorage.removeItem("token");
  return;
}

export const handleLogin = async (e, inputData) => {
  // e.preventDefault();
  // try {
  //   const response = await fetch(`http://localhost:5000/api/auth/login`, {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(inputData),
  //   });
  //   if (response.ok) {
  //     const data = await response.json();
  //     console.log(data);
  //     setTwoFactorModal(true);
  //   }
  // } catch (error) {}
};
