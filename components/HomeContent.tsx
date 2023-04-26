export default function HomeContent({logged} : {logged : Boolean}) {

  
  return (
    <div className={logged ? "col-12" : "col-6" }>
      {!logged ? <h1 className="Logo">PACom</h1> : <></>}
      <p className="">
        Welcome to Price comparison and aggregator service.
        <br />
        <br />
        {(logged) ? 'Select from the below category options to start comparing prices' : 'Login or signup to get started'}
      </p>
    </div>
  );
}