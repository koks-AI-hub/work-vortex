import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeSlash, Envelope, Key, Person, Telephone, House } from "react-bootstrap-icons";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp, collection, query, where, getDocs } from "firebase/firestore";
import "bootstrap/dist/css/bootstrap.min.css";

const CompanyRegister = () => {
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const isValidEmail = (email) => {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  };

  const checkDocRefExists = async (docRef) => {
    const companiesQuery = query(collection(db, "Companies"), where("DocumentReference", "==", docRef));
    const companiesSnapshot = await getDocs(companiesQuery);
    return !companiesSnapshot.empty;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!companyName || !email || !phone || !address || !password || !confirmPassword) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }
    if (!isValidEmail(email)) {
      setError("Invalid email format.");
      setLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const docRefExists = await checkDocRefExists(phone);
      if (docRefExists) {
        setError("Document Reference already registered. Try login.");
        setLoading(false);
        return;
      }
      await createUserWithEmailAndPassword(auth, email, password);

      await setDoc(doc(db, "Companies", phone), {
        CompanyName: companyName,
        Email: email,
        Phone: phone,
        Address: address,
        CreatedAt: serverTimestamp(),
      });

      setLoading(false);
      navigate("/auth/company/login");
    } catch (err) {
      setError("Something went wrong. Try again later.");
      console.log(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light p-3">
      <div className="card p-4 shadow w-100" style={{ maxWidth: "450px" }}>
        <h3 className="text-center mb-3">Company Registration</h3>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label className="form-label">Company Name</label>
            <div className="input-group">
              <span className="input-group-text"><Person size={20} /></span>
              <input type="text" className="form-control" value={companyName} onChange={(e) => setCompanyName(e.target.value)} required />
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <div className="input-group">
              <span className="input-group-text"><Envelope size={20} /></span>
              <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">Phone Number</label>
            <div className="input-group">
              <span className="input-group-text"><Telephone size={20} /></span>
              <input type="text" className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} required />
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">Address</label>
            <div className="input-group">
              <span className="input-group-text"><House size={20} /></span>
              <input type="text" className="form-control" value={address} onChange={(e) => setAddress(e.target.value)} required />
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <div className="input-group">
              <span className="input-group-text"><Key size={20} /></span>
              <input type={showPassword ? "text" : "password"} className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
              <button type="button" className="btn btn-outline-secondary" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeSlash /> : <Eye />}
              </button>
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">Confirm Password</label>
            <div className="input-group">
              <span className="input-group-text"><Key size={20} /></span>
              <input type={showPassword ? "text" : "password"} className="form-control" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
              <button type="button" className="btn btn-outline-secondary" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeSlash /> : <Eye />}
              </button>
            </div>
          </div>
          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? (
              <div className="spinner-border spinner-border-sm text-light" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              "Register"
            )}
          </button>
        </form>
        <p className="text-center mt-3">Already have an account? <Link to="/auth/company/login">Login</Link></p>
      </div>
    </div>
  );
};

export default CompanyRegister;
