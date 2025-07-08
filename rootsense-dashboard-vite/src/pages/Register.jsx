import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('farmer');

  const register = async (e) => {
    e.preventDefault();
    const userCred = await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, 'users', userCred.user.uid), { email, role });
  };

  return (
    <form onSubmit={register} className="p-6">
      <h2 className="text-xl mb-4">Register</h2>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="block mb-2" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" className="block mb-2" />
      <select value={role} onChange={e => setRole(e.target.value)} className="block mb-4">
        <option value="farmer">Farmer</option>
        <option value="expert">Agronomist</option>
        <option value="admin">Admin</option>
      </select>
      <button className="bg-green-600 text-white px-4 py-2 rounded">Register</button>
    </form>
  );
}
