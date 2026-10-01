1. import dependencies 
    a. for state management- useState()
    b. db that we created using new Dexie
    c. useLiveQuery for state management of the data in our indexedDB (same like useEffect)
2. Create a variable to add the data 
    const addUser = (user) => db.users.add(user);
        We have made addUser variable that is calling a function with a parameter user
3. Now inside the component create a useState variable form that will have a object, const [form, setForm] = useState({
    user_id: "",
    name: "",
    login_id: "",
    password: "",
  });
4. Fetch the data from like const user = await useLiveQuery(()=> db.users.toArray(),[]);
5. Create a function to handleOnChange like const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
6. Create a onSubmit handller like 
    async function onSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      await addUser(form);
      setForm({ user_id: "", name: "", login_id: "", password: "" });
    } catch (err) {
      setError(
        err.name === "ConstraintError"
          ? "That user ID or login ID is already taken."
          : err.message,
      );
    }
  }

7.  return (
    <main>
      <form onSubmit={onSubmit}>
        <input
          name="user_id"
          value={form.user_id}
          onChange={onChange}
          placeholder="User ID"
          required
        />
        <input
          name="name"
          value={form.name}
          onChange={onChange}
          placeholder="Name"
          required
        />
        <input
          name="login_id"
          value={form.login_id}
          onChange={onChange}
          placeholder="Login ID"
          required
        />
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={onChange}
          placeholder="Password"
          required
        />
        <button>Save</button>
      </form>

      <ul>
        {users?.map((u) => (
          <li key={u.user_id}>
            {u.user_id}: {u.name} ({u.login_id})
          </li>
        ))}
      </ul>
    </main>
  );