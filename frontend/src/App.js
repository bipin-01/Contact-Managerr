import "./App.css";
import { useState } from "react";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import MyContacts from "./screens/MyContacts/MyContacts";
import ProfileScreen from "./screens/ProfileScreen/ProfileScreen";
import SingleContact from "./screens/SingleContact/SingleContact";
import { BrowserRouter, Route } from "react-router-dom";
import LandingPage from "./screens/LandingPage/LandingPage";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";
import CreateContact from "./screens/CreateContact/CreateContact";

function App() {

  const [search, setSearch] = useState("");
  console.log(search)
  return (
    <BrowserRouter>
      <Header setSearch={setSearch} />
      <main>
        <Route path="/" component={LandingPage} exact />
      
        <Route path="/login" component={LoginScreen} />
        <Route path="/register" component={RegisterScreen} />
        <Route path="/contact/:id" component= { SingleContact } />
        <Route path="/createcontact" component={CreateContact} />
        <Route path="/profile" component={ ProfileScreen } />
        <Route path="/mycontacts" component={() => <MyContacts search = { search } />} />
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
