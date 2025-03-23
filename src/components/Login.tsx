import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MdMail, MdLock, MdPerson, MdVisibility, MdVisibilityOff, MdLocationOn } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import bgImage from './images/herosection.jpg';

const Login: React.FC = () => {
  const [view, setView] = useState<"login" | "signup">("login");

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen p-4">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-sm brightness-75"
        style={{ backgroundImage: `url(${bgImage})` }}
      ></div>
      <div className="absolute inset-0 bg-black opacity-30"></div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 flex flex-col items-center"
      >
        <h1
          className="text-5xl md:text-6xl font-bold text-purple-700 drop-shadow-lg mb-16"
          style={{ fontFamily: "'Hemi Head', sans-serif" }}
        >
          DonorDash
        </h1>

        {/* Switch Buttons */}
        <div className="flex mb-6 rounded-xl overflow-hidden w-64 shadow-lg">
          {["login", "signup"].map((type) => (
            <button
              key={type}
              className={`flex-1 text-center py-2 font-semibold transition ${
                view === type
                  ? "bg-purple-600 text-white"
                  : "bg-purple-100 text-purple-700"
              }`}
              onClick={() => setView(type as "login" | "signup")}
            >
              {type === "login" ? "Log In" : "Sign Up"}
            </button>
          ))}
        </div>

        {/* Form Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="w-full max-w-xl bg-white p-12 rounded-2xl shadow-2xl border border-purple-300"
        >
          {view === "login" ? <LoginContainer /> : <SignUpContainer />}
        </motion.div>
      </motion.div>
    </div>
  );
};

/* LOGIN CONTAINER */
const LoginContainer: React.FC = () => (
  <>
    <h2 className="text-center text-xl font-bold text-purple-700 mb-6">Log in with</h2>
    <SocialLogin />
    <Separator />
    <LoginForm />
  </>
);

/* SIGNUP CONTAINER */
const SignUpContainer: React.FC = () => (
  <>
    <h2 className="text-center text-xl font-bold text-purple-700 mb-6">Sign up with</h2>
    <SocialLogin />
    <Separator />
    <SignUpForm />
  </>
);

/* SOCIAL LOGIN BUTTONS */
const SocialLogin: React.FC = () => (
  <div className="flex gap-4 mb-6">
    <button className="flex items-center gap-2 w-full justify-center py-2 bg-purple-100 border border-purple-400 rounded-lg hover:bg-purple-200 transition">
      <FcGoogle size={20} />
      <span className="text-sm font-medium text-purple-700">Google</span>
    </button>
    <button className="flex items-center gap-2 w-full justify-center py-2 bg-purple-100 border border-purple-400 rounded-lg hover:bg-purple-200 transition">
      <FaApple size={20} className="text-black" />
      <span className="text-sm font-medium text-purple-700">Apple</span>
    </button>
  </div>
);

/* OR SEPARATOR */
const Separator: React.FC = () => (
  <div className="flex items-center my-4">
    <div className="flex-grow border-t border-gray-300"></div>
    <span className="mx-4 text-gray-500 font-medium">or</span>
    <div className="flex-grow border-t border-gray-300"></div>
  </div>
);

/* INPUT FIELD */
interface InputFieldProps {
  type: string;
  placeholder: string;
  icon: JSX.Element;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  type,
  placeholder,
  icon,
  value,
  onChange,
}) => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const isPasswordField = type === "password";

  return (
    <div className="relative mb-5">
      <input
        type={isPasswordField && isPasswordShown ? "text" : type}
        placeholder={placeholder}
        className="w-full px-10 py-3 border border-purple-400 rounded-lg focus:outline-none focus:border-purple-600 transition"
        required
        value={value}
        onChange={onChange}
      />
      <div className="absolute left-3 top-3.5 text-purple-600 text-xl">{icon}</div>
      {isPasswordField && (
        <div
          onClick={() => setIsPasswordShown(!isPasswordShown)}
          className="absolute right-3 top-3.5 text-purple-600 text-xl cursor-pointer"
        >
          {isPasswordShown ? <MdVisibility /> : <MdVisibilityOff />}
        </div>
      )}
    </div>
  );
};

/* LOGIN FORM */
const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token); // Store token if needed
        navigate("/"); // Redirect to home
      } else {
        setError(data.message || "Login failed.");
      }
    } catch (err) {
      setError("Failed to connect to the server.");
      console.error("Login error:", err);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleLogin}>
      <InputField
        type="email"
        placeholder="Email address"
        icon={<MdMail />}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <InputField
        type="password"
        placeholder="Password"
        icon={<MdLock />}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <p className="text-red-500 text-sm mb-3 text-center">{error}</p>}
      <div className="text-center mb-4">
        <a href="#" className="text-purple-600 text-sm hover:underline">
          Forgot password?
        </a>
      </div>
      <button
        type="submit"
        disabled={loading}
        className={`w-full py-3 ${
          loading ? "bg-purple-400 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700"
        } text-white font-semibold rounded-lg transition`}
      >
        {loading ? "Logging In..." : "Log In"}
      </button>
    </form>
  );
};

/* SIGNUP FORM */
const SignUpForm: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault();

    if (!username || !email || !password || !address) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password, address }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token); // Save token if returned
        navigate("/"); // Redirect to home
      } else {
        setError(data.message || "Sign up failed.");
      }
    } catch (err) {
      setError("Failed to connect to the server.");
      console.error("Sign up error:", err);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSignUp}>
      <InputField
        type="text"
        placeholder="Username"
        icon={<MdPerson />}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <InputField
        type="email"
        placeholder="Email address"
        icon={<MdMail />}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <InputField
        type="password"
        placeholder="Password"
        icon={<MdLock />}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <InputField
        type="text"
        placeholder="Address"
        icon={<MdLocationOn />}
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      {error && <p className="text-red-500 text-sm mb-3 text-center">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className={`w-full py-3 ${
          loading ? "bg-purple-400 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700"
        } text-white font-semibold rounded-lg transition`}
      >
        {loading ? "Signing Up..." : "Sign Up"}
      </button>
    </form>
  );
};

export default Login;
