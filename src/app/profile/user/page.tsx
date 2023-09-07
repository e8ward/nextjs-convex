"use client";

import { useMutation, useQuery } from "convex/react";
import { useState } from "react";
import { api } from "../../../../convex/_generated/api";

interface FormData {
  name: string;
  age: number | "";
  email: string;
}

export default function Page() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    age: "",
    email: "",
  });

  const mutateUser = useMutation(api.userMutate.createUser);
  const queryUser = useQuery(api.userQuery.allUsers);
  const deleteUser = useMutation(api.userMutate.deleteUser);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === "age" ? +value : value });
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, age, email } = formData;

    try {
      mutateUser({ name: name, age: age as number, email: email });
      setFormData({
        name: "",
        age: "",
        email: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=' h-screen'>
      <div className='container bg-white h-full mx-auto flex flex-col justify-center items-center'>
        <div className='bg-red-300'>
          {!queryUser
            ? "Loading..."
            : queryUser.map((user) => (
                <div key={user._id} className='flex flex-col'>
                  {user.name}, {user.age}, {user.email} <br />
                  <button
                    className='border border-black bg-black text-white'
                    onClick={() => deleteUser({ id: user._id })}
                  >
                    Delete {user.name}
                  </button>
                </div>
              ))}
        </div>
        <div className='h-[400px] w-[300px] bg-neutral-300 p-5'>
          <form onSubmit={handleSubmit}>
            <label>
              Name:
              <input
                type='text'
                name='name'
                value={formData.name}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              Age:
              <input
                type='number'
                name='age'
                value={formData.age}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              Email:
              <input
                type='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
              />
            </label>
            <br />
            <button type='submit'>Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}
