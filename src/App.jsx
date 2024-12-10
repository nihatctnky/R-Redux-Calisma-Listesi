import { BrowserRouter, Route, Routes } from "react-router-dom"
import Header from './components/header';
import Home from './pages/home';
import Create from './pages/create';
import api from "./utils/api";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setError, setJobs, setLoading } from "./redux/slices/jobSlice";


const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // reducer yüklenme başldıgınıhaber veriyo
    dispatch(setLoading());

    // api istegi at
    api
      .get("/jobs")
      // başarılı olursa reducer verilerin geldigini haber ver
      .then((res) => dispatch(setJobs(res.data)))
      // başarısız olursa hta geldigini haber ver
      .catch((err) => dispatch(setError(err)));
  }, [])

  return (
    <BrowserRouter>
      <Header />



      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App