const Dashboard: React.FC = () => {
    const [crypto, setCryptos]: [ICrypto[], (posts: ICrypto[]) => void] = React.useState(defaultProps);
    const [search, setSearch]: [string, (search: string) => void] = React.useState("");
  
    const handleChange = (e: { target: { value: string; }; }) => {
      setSearch(e.target.value);
    };
  
    return (
      <div className="App">
       <ul className="posts">
         <input type="text" onChange={handleChange} />
           {crypto.map((crypto) => {
               if (search == "" || crypto.name.toLowerCase().includes(search.toLowerCase())) {
                   return (
                       <li key={crypto.id}>
                           <h3>{crypto.id}</h3>
                           <p>{crypto.current_price}</p>
                           <p>{crypto.symbol}</p>
                           <img src={crypto.image} alt="image" />
                       </li>
                   );
               }
               return null;
           )}
       </ul>
       {error && <p className="error">{error}</p>}
     </div>
    )
  }