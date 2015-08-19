React.render(
  <nav id="navbar-player" className="navbar">
  <a id="navbar-brand" href="/">Compose</a>
   <ul>
     <li><form id="search-player">
       <label for="search-input-player" id="search-input-player-label"><img id="search-icon" src="/images/ic_search_white_48dp.png" alt="search image"></img></label>
       <input type="text" name="search-input-player" className="arrow_box" id="search-input-player" placeholder="Search for more music"/>
     </form></li>
      <li>SIGN UP</li>
     <li>LOGIN</li>
     <li>LOGOUT</li>
   </ul>
  </nav>,
  document.getElementById('header')  
);

