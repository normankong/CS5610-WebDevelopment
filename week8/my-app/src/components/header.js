function Header({name, setIsShowForm, isShowForm}) {

  const text = isShowForm ? "Hide Form" : "Show Form";

  return (
    <header className="header">
      <h1>Welcome {name} !</h1>
      <button onClick={() => setIsShowForm(!isShowForm)}>{text}</button>
    </header>
  );
}

export default Header;
