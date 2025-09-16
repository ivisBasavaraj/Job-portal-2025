import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await fetch("http://localhost:5000/api/admin/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (data.success) {
                localStorage.setItem("adminToken", data.token);
                localStorage.setItem("adminUser", JSON.stringify(data.admin));
                navigate("/admin/dashboard");
            } else {
                setError(data.message || "Login failed");
            }
        } catch (error) {
            setError("Network error. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="page-wraper">
            <div className="twm-login-reg">
                <div className="twm-login-reg-inner">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6 col-sm-12 m-auto">
                                <div className="twm-login-reg-head">
                                    <div className="twm-login-reg-logo">
                                        <div className="twm-login-reg-title">
                                            <h4>Admin Login</h4>
                                            <p>Access Admin Panel</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="twm-tabs-style-2">
                                    <div className="tab-content" id="myTab2Content">
                                        <div className="tab-pane fade show active" id="login">
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <div className="twm-tabs-style-2">
                                                        <form onSubmit={handleSubmit}>
                                                            <div className="twm-tabs-style-2-content">
                                                                {error && (
                                                                    <div className="alert alert-danger" role="alert">
                                                                        {error}
                                                                    </div>
                                                                )}

                                                                <div className="form-group mb-3">
                                                                    <input
                                                                        name="email"
                                                                        type="email"
                                                                        required
                                                                        className="form-control"
                                                                        placeholder="Admin Email"
                                                                        value={formData.email}
                                                                        onChange={handleChange}
                                                                    />
                                                                </div>

                                                                <div className="form-group mb-3">
                                                                    <input
                                                                        name="password"
                                                                        type="password"
                                                                        required
                                                                        className="form-control"
                                                                        placeholder="Password"
                                                                        value={formData.password}
                                                                        onChange={handleChange}
                                                                    />
                                                                </div>

                                                                <div className="form-group">
                                                                    <button
                                                                        type="submit"
                                                                        className="site-button"
                                                                        disabled={loading}
                                                                    >
                                                                        {loading ? "Logging in..." : "Login"}
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}