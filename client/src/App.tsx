import { Route, Routes } from "react-router-dom";
import Header from "./components/header";
import Home from "./pages/home";
import Register from "./pages/register";
import Login from "./pages/login";
import Footer from "./components/footer";
import Search from "./pages/search";
import AddGig from "./pages/addGig";
import Detail from "./pages/detail";
import Mygigs from "./pages/myGigs";
import Protected from "./components/protected";
import Services from "./pages/Services";
import Contact from "./pages/contact";
import Payment from "./pages/Payment";
import About from "./pages/About";
import Annocesandcourses from "./pages/Annocesandcourses/index";


const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
  
        <Header />
    
      
     <div className="flex-1 w-screen mx-auto bg-[#030014]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/search" element={<Search />} />
          <Route path="/services" element={<Services />} />
          <Route path="/detail/:id" element={<Detail />} />

          <Route element={<Protected />}>
            <Route path="/add-gig" element={<AddGig />} />
            <Route path="/my-gigs" element={<Mygigs />} />
          </Route>
          <Route path="/contact" element={<Contact />}  />
        <Route path="/Payment" element={<Payment />}  />
          <Route path="/about" element={<About />}  />
          <Route path="/tasks" element={<Annocesandcourses />}  />
        </Routes>
        
      </div>
      <Footer />
    </div>
  );
};

export default App;
