import { Link } from "react-router-dom";
import { useState } from "react";


function NavBar() {
  const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () =>{

        setDarkMode(!darkMode);

        document.body.classList.toggle("dark-mode");

    };


  return (
    <nav style={styles.nav}>

      <Link to="/" style={styles.title}>
        Todo App
      </Link>

      <button onClick={toggleDarkMode}
      style={{fontSize:"15px", background:"transparent", marginLeft: "1100px"}}>
            🌙
        </button>

    </nav>
  );

}

const styles = {
  nav:{
    background:"#4c74af",
    padding:"20px",
    marginBottom:"20px"
  },
  title:{
    color:"white",
    fontSize:"35px",
    fontWeight:"bold",
    textDecoration:"none",
  }
};

export default NavBar;