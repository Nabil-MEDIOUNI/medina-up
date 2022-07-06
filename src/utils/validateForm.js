const validateForm = (person, email, setError, setAlert) => {
  let isValid = true;
  const format = /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/;
  const pattern = new RegExp(
    /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i,
  );

  if (format.test(person.first_name)) {
    isValid = false;
    setError({ message: 'Graphql error: Insert a valid first name please!' });
    setAlert(true);
  }

  if (format.test(person.last_name)) {
    isValid = false;
    setError({ message: 'Graphql error: Insert a valid last name please!' });
    setAlert(true);
  }

  if (!pattern.test(email)) {
    isValid = false;
    setError({ message: 'Graphql error: Insert a valid email please!' });
    setAlert(true);
  }

  return isValid;
};

export default validateForm;
