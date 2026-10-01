import { useState } from "react";
import { db } from "./Dexie/indexedDBNot.js";
import { useLiveQuery } from "dexie-react-hooks";

const addUser = (user) => db.users.add(user);
const addIncomeCategory = (incomeCategory) => db.income_categories.add(incomeCategory);

function Home() {
  const [form, setForm] = useState({
    user_id: "",
    name: "",
    login_id: "",
    password: "",
  });
  const [incomeCat, setIncomecat] = useState({
    category_id: "",
    user_id: "",
    name: "",
    created_at: "",
  });
  const [error, setError] = useState("");

  const users = useLiveQuery(() => db.users.toArray(), []);
  const income_categories = useLiveQuery(
    () => db.income_categories.toArray(),
    [],
  );

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const onChange_incomeCat = (e) =>
    setIncomecat({ ...incomeCat, [e.target.name]: e.target.value });

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

  async function onIncomeCatSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      await addIncomeCategory({
        ...incomeCat,
        created_at: new Date().toISOString(),
      });
      setIncomecat({ category_id: "", user_id: "", name: "", created_at: "" });
    } catch (err) {
      setError(
        err.name === "ConstraintError" ? "Data already exist" : err.message,
      );
      // alert("Faile to save the income category")
    }
  }

  return (
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

      <form onSubmit={onIncomeCatSubmit}>
        <input
          name="category_id"
          value={incomeCat.category_id}
          onChange={onChange_incomeCat}
          placeholder="Category Id"
          required
        />
        {/* <input name="user_id" value={incomeCat.user_id} onChange={onChange_incomeCat} placeholder="User Id" required /> */}
        <select
          name="user_id"
          value={incomeCat.user_id}
          onChange={onChange_incomeCat}
          required
        >
          <option value="" disabled>
            Select User
          </option>
          {users?.map((u) => (
            <option key={u.user_id} value={u.user_id}>
              {u.user_id}
            </option>
          ))}
        </select>
        <input
          name="name"
          value={incomeCat.name}
          onChange={onChange_incomeCat}
          placeholder="Category Name"
          required
        />
        <button>Save</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul>
        {users?.map((u) => (
          <li key={u.user_id}>
            {u.user_id}: {u.name} ({u.login_id})
          </li>
        ))}
      </ul>
      <ul>
        {income_categories?.map((u) => (
          <li key={u.category_id}>
            {u.user_id}: {u.category_id} ({u.name})
          </li>
        ))}
      </ul>
    </main>
  );
}

export default HomeNotInUse;
