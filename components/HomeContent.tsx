export default function HomeContent({logged} : {logged : Boolean}) {


  return (
    <div className={logged ? "col-12" : "col-6" }>
      {!logged ? <h1 className="Logo">PACom</h1> : <></>}
      <h1>Welcome to Price comparison and aggregator service</h1>
        <h2 className="">
          {(logged) ? 'Select from the below category options to start comparing prices' : 'Login or signup to get started'}
        </h2>
    </div>
  );
}
